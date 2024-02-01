const DAO = require('../integration/DAO');

class Controller{
  constructor(){
    this.dao = new DAO();
  }

  login(username, password){
    return this.dao.login(username, password);
  }
}
module.exports = Controller;