const mongoose = require('mongoose');
const validator = require('validator');
const SignUpSchema = require('../controllers/singnupController')

//Classe de Validação de usuários:
class Login {
  constructor(body) {
    this.body = body;
    this.user = null;    
    this.errors = [];
  }

  //Checando se o usuário está inserido no banco de dados:
  async validatingUser() {
    this.validatingData();
    if(this.errors.length > 0) return; //Retornando caso algum campo tenha sido invalidado
    
    //Continuar aqui:
    try {
      await this.userExist();

    } catch (e) {
      return e;
    }
  }

  //Validando as informações colocadas no Login:
  async validatingData() {
    this.cleanUp();

    //Validando email usando import do valdiator do node:
    if(!validator.isEmail(this.body.email)) this.errors.push('Email inválido!');
  
    //validando a senha com padrão de regra comum:
    if(this.body.password.length < 3 || this.body.password.length > 12) this.errors.push('Senha inválida!');
  }

  //Verificando se o usuário existe no sistema:
  async userExist() {
    const user = await SignUpModel.findOne({ Email: this.body.Email });
    if(user && bcrypt.compareSync(this.body.Password, user.Password)) {

    }
  }

  //Função que organiza todos os dados a serem do tipo string, permitindo apenas o avanço das informações de Login.
  cleanUp() {
    for(const key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    return this.body = {
      email: this.body.Email,
      password: this.body.Password
    }
  }
}

module.exports = Login;