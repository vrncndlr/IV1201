const DAO = require('../integration/DAO');


class Controller{
  constructor(){
    this.dao = new DAO();
  }
  async login(username, password){
    return await this.dao.login(username, password);
  }
  async register(firstname, lastname, pid, email, username, password){
    return await this.dao.register(firstname, lastname, pid, email, username, password);
  }
}
module.exports = Controller;