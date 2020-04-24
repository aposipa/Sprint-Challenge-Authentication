const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const db = require('../database/dbConfig.js');

const { jwtSecret } = require('./secret.js');
const Users = require('./auth-model.js');

router.post('/register', (req, res) => {
  // implement registration
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;
  
  Users.add(user)
  .then(savedUser => {
    res.status(201).json(savedUser);
  })
  .catch(err => {
    res.status(500).json({ message: "Could not POST new register" });
  });
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password }= req.body;

  Users.findBy({ username })
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ message: `Welcome ${user.username}`, token});
    } else {
      res.status(401).json({ message: "Not valid credentials" });
    }
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: '1h',
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
