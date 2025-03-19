const Login = require("../models/LoginModel");

exports.login = (req, res) => {
    res.render('login');
};

exports.HomeVerify = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.validatingUser();

        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('back');
            });
            return;
        }

        req.flash('Success ', 'Seu usuário foi criado com sucesso.');
        req.session.save(function() {
            return res.redirect('/home');
        });
    } catch (e) {
        console.log(e);
        res.render('404');
    }
};