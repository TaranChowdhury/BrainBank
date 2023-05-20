const express = require("express");
const app = express();
const UserMatch = require("./models/backup");
const Project = require("./models/project");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const storage = multer.memoryStorage()



app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://brainbank:brain@brain.mlcmo8z.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error(error));


const upload = multer({ storage: storage }); // Set the destination folder for file uploads


app.post("/api/register", async (req, res) => {
  console.log(req.body);

  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    const user = await UserMatch.create({
      User_Info: {
        first: req.body.first,
        last: req.body.last,
        email: req.body.email,
        password: newPassword,
      },
      Projects: [],
    });

    const token = jwt.sign({ email: user.User_Info.email }, "secret123");

    user.User_Info.verificationToken = token;
    await user.save();

    res.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await UserMatch.findOne({
    "User_Info.email": req.body.email,
  });

  if (!user) {
    return res.json({ status: "error", error: "Invalid login" });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.User_Info.password
  );

  if (isPasswordValid) {
    // Here we create a JWT token using the user's email and a secret key
    // We set the token to expire in 1 hour (3600 seconds)
    const token = jwt.sign({ email: user.User_Info.email }, "secret123", { expiresIn: '1h' });

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});
function authenticateJWT(req, res, next) {
  const authHeader = req.header('Authorization');
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];  // Splitting by space and using the token part
    
    jwt.verify(token, 'secret123', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};



app.get("/api/user/me", async (req, res) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Missing authentication token' });

    const decoded = jwt.verify(token, 'secret123');
    const userEmail = decoded.email;

    const user = await UserMatch.findOne({ "User_Info.email": userEmail });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ status: 'ok', user: user.User_Info });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get("/api/userIds", async (req, res) => {
  try {
    
    const users = await UserMatch.find({}, "User_Info.email"); 

    const emails = users.map((user) => user.User_Info.email);

    res.json(emails);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
});
app.get("/api/user/:userId/projects", async (req, res) => {
  const userId = req.params.userId;

  // assuming you are using mongoose
  const projects = await Project.find({ userId: userId }).populate({
    path: "users",
    populate: {
      path: "userID",
      select: "-_id -__v -User_Info.password -User_Info.verificationToken -Projects",
    },
  });

  res.json({ projects: projects });
});
app.get("/api/project/:projectId/team", async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const team = project.users.map((user) => user.userID);

    res.json({ team });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/api/projects", upload.array("files"), async (req, res) => {
  const userIds = JSON.parse(req.body.userId); // now expecting an array of userIds
  const projectTitle = req.body.projectTitle;
  const projectSummary = req.body.projectSummary;

  if (
    !userIds ||
    userIds.length == 0 ||
    !projectTitle ||
    !req.files ||
    req.files.length === 0 ||
    !projectSummary
  ) {
    return res.status(400).send("Missing user IDs, project title, or file");
  }

  try {
    const files = req.files.map((file) => ({
      data: file.buffer,
      name: file.originalname,
      type: file.originalname.split(".").pop(),
    }));

    const summaryArray = [
      {
        text: projectSummary,
        createdAt: new Date(),
      },
    ];

    // Preparing the users array for the Project schema
    let users = [];
    for (let i = 0; i < userIds.length; i++) {
      const user = await UserMatch.findOne({ "User_Info.email": userIds[i] });
      if (user) {
        users.push({ userID: user._id });
      }
    }

    // Create the project first
    const project = await Project.create({
      title: projectTitle,
      summary: summaryArray,
      file: files,
      users: users, // now an array of users
      createdAt: new Date(),
    });

    // Now, loop through the users again and add the project to their Projects array
    for (let i = 0; i < users.length; i++) {
      const user = await UserMatch.findOne({ _id: users[i].userID });
      if (user) {
        user.Projects.push({ projectID: project._id });
        await user.save();
      }
    }

    console.log(`Project created successfully with title "${projectTitle}"`);
    return res.json({ message: "Project created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
});



app.put("/api/user/me", async (req, res) => {
  try {
    const token = req.header('Authorization');
    if(!token) return res.status(401).json({ error: 'Missing authentication token' });

    const decoded = jwt.verify(token, 'secret123');
    const userEmail = decoded.email;

    const user = await UserMatch.findOne({ "User_Info.email": userEmail });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const allowedUpdates = ['first', 'last', 'email'];
    const updates = Object.keys(req.body);

    updates.forEach(update => {
      if (!allowedUpdates.includes(update)) return res.status(400).json({ error: `Invalid update: ${update}` });
    });

    updates.forEach(update => user.User_Info[update] = req.body[update]);
    await user.save();

    res.json({ status: 'ok', user: user.User_Info });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

app.get("/api/projects", async (req, res) => {
  if (!req.query.q) {
    return res.send({
      message: "you suck",
    });
  }
  console.log(escapeRegex(req.query.q));
  const searchQuery = new RegExp(escapeRegex(req.query.q), "gi");

  try {
    const projects = await Project.find({
      $or: [
        {
          title: searchQuery,
        },
        {
          "file.name": searchQuery,
        },
        {
          "file.type": searchQuery,
        },
      ],
    });

    res.send({
      projects,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
});
app.get("/api/projects/:projectId", async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.put("/api/projects/:projectId", upload.array("file"), async (req, res) => {
  try {
    const { projectId } = req.params;
    const { summary, members } = req.body;

    // Fetch the existing project
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Update the summary array and members
    if (summary) {
      project.summary.push({
        text: summary,
        createdAt: new Date(),
      });
    }

    if (Array.isArray(members)) {
      // assuming members are being sent as an array of userIds
      members.forEach((member) => {
        project.users.push({ userID: member });
      });
    }


    // If new files are uploaded, handle the file update
    if (req.files) {
      console.log("New file uploaded");
      if (!project.file) {
        project.file = [];
      }
      req.files.forEach((file) => {
        project.file.push({
          data: file.buffer,
          name: file.originalname,
          type: file.mimetype,
        });
      });
    }

    // If new members are added, handle the members update
    if (members) {
      // assuming members are being sent as an array of userIds
      for (let i = 0; i < members.length; i++) {
        const member = members[i];
        // Check if member is already part of the project
        if (!project.users.some(u => u.userID.toString() === member)) {
          // Add to project
          project.users.push({ userID: member });

          // Fetch the user and add project to their list
          const user = await UserMatch.findOne({ "User_Info.email": member });
          if (user) {
            user.Projects.push({ projectID: project._id });
            await user.save();
          }
        }
      }
    }

    await project.save();

    res.json({ message: "Project updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
});


app.get("/api/projects/:projectId/download/:filename", async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Find the file in the files array
    console.log("Requested filename: ", req.params.filename);
    project.file.forEach((file, index) => {
      if (file && file.filename) {
        console.log("File in array at index", index, ": ", file.filename);
      } else {
        console.log("No filename found for file at index", index, ": ", file);
      }
    });

    project.file.forEach((file) => {
      console.log("File in array: ", file.name);
    });
    // let decodedFilename = decodeURIComponent(req.params.filename);
    // console.log("Decoded filename: ", decodedFilename);
    // let file = project.file.find(f => f.filename.includes(decodedFilename));

    let files = project.file.filter((f) => f && f.filename);
    let file = project.file.find((f) => f.name == req.params.filename);

    console.log(Array.isArray(project.file));

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    // Ensure the file path is correct
    const filePath = `${__dirname}/${file.buffer}`;

    return res.download(filePath, file.name);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get('/api/users/:email', async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email);

    // Fetch user data by email
    const user = await UserMatch.findOne({ "User_Info.email": email });

    // If no user found, send 404 status
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch user's projects using the project IDs stored in the user document
    const projects = [];
    for (let proj of user.Projects) {
      const project = await Project.findById(proj.projectID);
    if (project !== null) {
      projects.push(project);
  }
}


    // Prepare user data for response
    const userData = {
      firstName: user.User_Info.first,
      lastName: user.User_Info.last,
      projects: projects.map((project) => ({ _id: project._id, title: project.title })),
    };

    // Send user data
    res.json(userData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});



app.listen(1337, () => {
  console.log("Server started on 1337");
});
