const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    
  }
}

module.exports = Login;