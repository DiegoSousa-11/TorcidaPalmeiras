

function register(req, res) {
    var name = req.body.name;
    var surname = req.body.surname;
    var email = req.body.email;
    var password = req.body.password;

    if(!name || !surname || !email || !password) {
        res.status(400).send('Preencha todos os dados');
    } else {
        
    }
}