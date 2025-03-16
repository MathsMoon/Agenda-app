exports.signup = (req, res) => {
    res.render('signup');
};

exports.register = (req, res) => {
    res.send(req.body);
}