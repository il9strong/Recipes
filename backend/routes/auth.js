const express = require("express");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { login, password } = req.body;
  console.log(`Login attempt for login: ${login}`);

  console.log("Received login data:", { login, password });

  if (!login || !password) {
    console.log("Missing login or password");
    return res.status(400).json({ success: false, message: "Missing login or password", status: 400 });
  }

  const userWithLogin = await User.findOne({ where: { login } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  console.log("User with login:", userWithLogin);

  if (!userWithLogin) {
    console.log("Login does not match!");
    return res.status(400).json({ success: false, message: "Login does not match!", status: 400 });
  }

  const isMatch = await bcrypt.compare(password, userWithLogin.password);
  if (!isMatch) {
    console.log("Password does not match!");
    return res.status(400).json({ success: false, message: "Password does not match!", status: 400 });
  }

  const jwtToken = jwt.sign(
    { id: userWithLogin.id, login: userWithLogin.login },
    '123', { expiresIn: '1h' }
  );

  res.json({ success: true, message: "Welcome Back!", token: jwtToken, status: 200 });
});

router.post("/register", async (req, res) => {
  const { name, login, password, email } = req.body;
  console.log(`Registering user with login: ${login}`);

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, login, password: hashedPassword, email });

    await newUser.save();
    res.json({ success: true, message: 'User registered', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ success: false, message: 'Error registering user', error: error.message });
  }
});

module.exports = router;
