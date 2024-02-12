const DAO = require('../integration/DAO');

/**
 * Class that is called by api layer to make database calls.
 */
class Controller{
  constructor(){
    this.dao = new DAO();
  }
  /**
   * Calls the database layer for login and returns the result. 
   * @async
   * @param {String} username username
   * @param {String} password password
   * @returns JSON object {
    row_to_json: {
      person_id: 1,
      name: 'Joelle',
      surname: 'Wilkinson',
      pnr: null,
      email: null,
      role_id: 1,
      username: 'JoelleWilkinson'
    }
  }
   */
  async login(username, password){
    return await this.dao.login(username, password);
  }
}
module.exports = Controller;