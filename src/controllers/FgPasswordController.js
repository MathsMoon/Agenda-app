exports.forgotpassword = (req, res) => {
    res.render('forgot-password');
};

exports.register = (req, res) => {
    res.send(req.body);
}