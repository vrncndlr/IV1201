const DAO = require('../integration/DAO');


class Controller{
  constructor(){
    this.dao = new DAO();
  }

  async login(username, password){
    console.log("controller")
    console.log(username + " " + password)
    return await this.dao.login(username, password);
  }
}
module.exports = Controller;