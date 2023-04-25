const express = require('express')
const app = express()
const User = require('./models/backup')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const crypto = require('crypto');

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/Testing', { // Add options to the connect method
 
})
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.error(error));


app.post('/api/register', async (req, res) => {
  console.log(req.body);

  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      User_Info: {
        first: req.body.first,
        last: req.body.last,
        email: req.body.email,
        password: newPassword,
      },
      Matches: {
        url:['test'], 
        matching_score:['test'],
        matched_skills: ['test'],
        date:['test'],
        locations:['test'],
        company:['test'],
        title:['test']
      }
    });

    const token = jwt.sign( // Generate a verification token
      { email: user.User_Info.email },
      'secret123'
    );

    // Save the token to the user's document in the database
    user.User_Info.verificationToken = token;
    await user.save();

    res.json({ status: 'ok' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/api/login', async (req, res) => {
  const user = await User.findOne({
    'User_Info.email': req.body.email, // Use dot notation to query nested properties
  });

  if (!user) {
    return res.json({ status: 'error', error: 'Invalid login' }); // Return a response instead of an object
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.User_Info.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        email: user.User_Info.email,
      },
      'secret123'
    );

    return res.json({ status: 'ok', user: token });
  } else {
    return res.json({ status: 'error', user: false });
  }
});


app.listen(1337, () => {
  console.log('Server started on 1337');
});
