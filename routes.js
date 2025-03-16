const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const signupController = require('./src/controllers/singnupController')
const fgPasswordController = require('./src/controllers/FgPasswordController')

// Rota da home
route.get('/Home', homeController.initialPage);

// Rotas de Login
route.get('/login/index', loginController.login);
route.post('/login/HomeVerify', loginController.HomeVerify);

//Rota de Criação de Cadastro
route.get('/signup', signupController.signup);
route.post('/signup/test', signupController.register);

//Rota de redifinição de senha
route.get('/forgot-password', fgPasswordController.forgotpassword);
route.post('/forgot-password/test', fgPasswordController.register);

// Export de módulos da rota:
module.exports = route;