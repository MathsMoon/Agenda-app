const mongoose = require('mongoose');

const SignUpSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Surname: { type: String, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
});

const LoginModel = mongoose.model('Login', SignUpSchema);
