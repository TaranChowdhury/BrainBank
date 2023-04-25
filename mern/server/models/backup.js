const mongoose = require('mongoose')
const UserMatch = new mongoose.Schema({
    User_Info: {
        first: { type: String, required: true },
        last: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isVerified: { type: Boolean, default: false }, // Add a new field to track if the user's email is verified or not
        verificationToken: { type: String } // Add a new field to store the verification token
    },
    Matches: {
        url: {type: Array}, 
        matching_score: {type: Array},
        matched_skills: {type: Array},
        date: {type: Array},
        locations: {type: Array},
        company: {type: Array},
        title: {type: Array}
    }
    },
    { collection: 'User_Info' }
)

const model = mongoose.model('UserSchema', UserMatch, 'User_Info')

module.exports = model
