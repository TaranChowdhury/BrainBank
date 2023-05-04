const mongoose = require('mongoose');

const UserMatch = new mongoose.Schema({
    User_Info: {
        first: { type: String, required: true },
        last: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isVerified: { type: Boolean, default: false }, // Add a new field to track if the user's email is verified or not
        verificationToken: { type: String } // Add a new field to store the verification token
    },
    Projects: [{
        projectID: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }
    }]
}, { collection: 'User_Info' });

module.exports = mongoose.model('UserMatch', UserMatch);




