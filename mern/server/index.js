const express = require('express');
const app = express();
const UserMatch = require('./models/backup');
const Project = require('./models/project');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/Alpha', {}).then(() => console.log('MongoDB connected'))
    .catch(error => console.error(error));

const upload = multer({ dest: 'uploads/' }); // Set the destination folder for file uploads

app.post('/api/register', async (req, res) => {
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
            Projects: []
        });

        const token = jwt.sign(
            { email: user.User_Info.email },
            'secret123'
        );

        user.User_Info.verificationToken = token;
        await user.save();

        res.json({ status: 'ok' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/login', async (req, res) => {
    const user = await UserMatch.findOne({
        'User_Info.email': req.body.email,
    });

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid login' });
    }

    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.User_Info.password
    );

    if (isPasswordValid) {
        const token = jwt.sign(
            { email: user.User_Info.email },
            'secret123'
        );

        return res.json({ status: 'ok', user: token });
    } else {
        return res.json({ status: 'error', user: false });
    }
});

app.post('/api/projects', upload.single('file'), async (req, res) => {
    const userId = req.body.userId;
    const projectTitle = req.body.projectTitle;
    const projectFile = req.file;

    if (!userId || !projectTitle || !projectFile) {
        return res.status(400).send('Missing user ID, project title, or file');
    }

    try {
        // Save the uploaded file to a folder named after the project title
        const projectFolder = path.join('uploads', projectTitle);
        if (!fs.existsSync(projectFolder)) {
            fs.mkdirSync(projectFolder);
        }
        const filePath = path.join(projectFolder, projectFile.originalname);
        fs.writeFileSync(filePath, projectFile.buffer);

        // Create a new project document and add it to the user's project list
        const project = await Project.create({
            projectTitle: projectTitle,
            projectFile: filePath,
            users: [{ userID: userId }]
        });
        const user = await UserMatch.findOne({ 'User_Info.email': userId });
        user.Projects.push({ projectID: project._id });
        await user.save();

        console.log(`Project created successfully with title "${projectTitle}"`);
        return res.json({ message: 'Project created successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
    }
});

app.listen(1337, () => {
  console.log('Server started on 1337');
});
