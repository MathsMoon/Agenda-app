const SignUp = require("../models/signupModel");

exports.signup = (req, res) => {
    res.render('signup');
};

exports.register = async (req, res) => {
    try {
        const signUp = new SignUp(req.body);
        await signUp.creatingNewUser();
        
        if(signUp.errors.length > 0) {
            req.flash('errors:', signUp.errors);
            req.session.save(function() {
                return res.redirect('/signup');
            })
            return;
        }

        req.flash('Success ', 'Seu usuário foi criado com sucesso.');
        req.session.save(function() {
            return res.redirect('/home');
        });
    } catch (e) {
        console.log(e);
        res.render(this.signup.body);
    }
}