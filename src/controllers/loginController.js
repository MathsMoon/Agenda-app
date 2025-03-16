const Login = require("../models/LoginModel");

exports.login = (req, res) => {
    res.render('login');
};

exports.HomeVerify = (req, res) => {
    const login = new Login(req.body);
    
};