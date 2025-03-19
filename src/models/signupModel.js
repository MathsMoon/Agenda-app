const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const SignUpSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Surname: { type: String, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
});

const SignUpModel = mongoose.model('Signup', SignUpSchema);

class SignUp {

  constructor(body) {
    this.body = body;
    this.user = null;
    this.errors = [];
  }

  // Criando o usuário e inserindo no banco de dados:
  async creatingNewUser() {
    this.validatingData();
    if(this.errors.length > 0) return; //Retornando caso algum campo tenha sido invalidado
    try {
      //Verificando se o usuário existe:
      await this.userExist();
      if(this.errors.length > 0) return; //Check para ver se o usuário já existe.

      //Criptografando a senha:
      const salt = bcrypt.genSaltSync(10);
      this.body.Password = bcrypt.hashSync(this.body.Password, salt);

      //Inserindo o usuário na base de dados:
      this.user = await SignUpModel.create(this.body);
    } catch (e) {
      return e;
    }
  }

  //Validando as informações colocadas no Formulário:
  validatingData() {
    this.cleanUp();

    //Validando email usando import do valdiator do node:
    if(!validator.isEmail(this.body.Email)) this.errors.push('Email inválido!');
    
    //Validando o nome e Sobrenome:
    if(this.body.Name.length < 3 || this.body.Name.length > 15) this.errors.push('Nome inválido!');
    if(this.body.Surname.length < 3 || this.body.Surname.length > 15) this.errors.push('Sobrenome inválido!');
    
    //validando a senha com padrão de regra comum:
    if(this.body.Password.length < 3 || this.body.Password.length > 12) this.errors.push('Senha inválida!');    
  }

  // Verificação na base de dados para saber se o email já não está registrado!
  async userExist() {
    const user = await SignUpModel.findOne({ Email: this.body.Email });
    if(user) this.errors.push('Email já registrado!'); 
  }

  //Limpando e formatando o body para o padrão do banco:
  cleanUp() {
    for(const key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    //Padroninzando o POST do body para um padrão do banco de dados:
    this.body = {
      Name: this.body.firstName,
      Surname: this.body.lastName,
      Email: this.body.email,
      Password: this.body.password,
    }
  }
}

module.exports = SignUp;