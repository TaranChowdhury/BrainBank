const mongoose = require('mongoose');

const Project = new mongoose.Schema({
    projectTitle: { type: String, required: true },
    projectFile: { 
        data: { type: Buffer, required: true },
        size: { type: Number, required: true }
    },
    users: [{
        userID: { type: mongoose.Schema.Types.ObjectId, ref: 'UserMatch', required: true }
    }]
});

module.exports = mongoose.model('Project', Project);
