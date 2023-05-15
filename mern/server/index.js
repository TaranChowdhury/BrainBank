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

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/Alpha", {})
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error(error));

const upload = multer({ dest: "uploads/" }); // Set the destination folder for file uploads

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
    const token = jwt.sign({ email: user.User_Info.email }, "secret123");

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.get("/api/userIds", async (req, res) => {
  try {
    // Assuming you have a MongoDB collection named "users" with "email" field
    const users = await UserMatch.find({}, "User_Info.email"); // Replace "User" with your actual Mongoose model

    const emails = users.map((user) => user.User_Info.email);

    res.json (emails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
});
app.get('/api/user/:userId/projects', async (req, res) => {
  const userId = req.params.userId;

  // assuming you are using mongoose
  const projects = await Project.find({ userId: userId });

  res.json({ projects: projects });
});
app.get("/api/project/:projectId/team", async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).populate('users.userID');

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const team = project.users.map(user => user.userID);

    res.json({ team });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/projects", upload.array("files"), async (req, res) => {
  const userId = JSON.parse(req.body.userId);
  const projectTitle = req.body.projectTitle;
  const projectSummary = req.body.projectSummary;

  if (!userId || userId.length ==0 || !projectTitle || !req.files || req.files.length === 0 || !projectSummary) {
    return res.status(400).send("Missing user ID, project title, or file");
  }

  try {
    const user = await UserMatch.findOne({ "User_Info.email": userId });

    const files = req.files.map(file => ({
      path: file.path,
      name: file.originalname,
      type: file.originalname.split(".").pop(),
    }));

    // Here's the change: wrap `projectSummary` in an object inside an array
    const summaryArray = [{
      text: projectSummary,
      createdAt: new Date(),
    }];

    const project = await Project.create({
      title: projectTitle,
      summary: summaryArray,  // Now an array of objects
      file: files,  // Now an array of files
      users: [{ userID: user._id }],
      createdAt: new Date(),
    });

    user.Projects.push({ projectID: project._id });
    await user.save();

    console.log(`Project created successfully with title "${projectTitle}"`);
    return res.json({ message: "Project created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
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
app.put('/api/projects/:projectId', upload.array('file'), async (req, res) => {
  try {
    const { projectId } = req.params;
    const { summary, members } = req.body;

    // Fetch the existing project
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Update the summary array and members
    if (summary) {
      project.summary.push({
        text: summary,
        createdAt: new Date()
      });
    }

    if (members) {
      // assuming members are being sent as an array of userIds
      members.forEach(member => {
        project.users.push({ userID: member });
      });
    }

    // If new files are uploaded, handle the file update
    if (req.files) {
      console.log('New file uploaded')
      if(!project.file){
        project.file = [];
      }
      req.files.forEach((file) => {
        project.file.push({
          path: file.path,
          name: file.originalname,
          type: file.mimetype,
        });
      });
    }

    await project.save();
    
    console.log('New file')
    res.json({ message: 'Project updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error');
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
    
    project.file.forEach(file => {
      console.log("File in array: ", file.name);
    });
    // let decodedFilename = decodeURIComponent(req.params.filename);
    // console.log("Decoded filename: ", decodedFilename);
    // let file = project.file.find(f => f.filename.includes(decodedFilename));
    
    let files = project.file.filter(f => f && f.filename);
    let file = project.file.find(f => f.name == req.params.filename);



    console.log(Array.isArray(project.file));

;
    
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    // Ensure the file path is correct
    const filePath = `${__dirname}/${file.path}`;

    return res.download(filePath, file.name); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.listen(1337, () => {
  console.log("Server started on 1337");
});
