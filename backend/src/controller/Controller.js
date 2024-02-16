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

  /**
   * Calls the database layer with register api function and returns a boolean
   * Takes the values of the user registration as separate values
   * @param firstname
   * @param lastname
   * @param pid
   * @param email
   * @param password
   * @param username
   * @returns true if registration successful and false if not {Promise<boolean>}
   */
  async register(firstname, lastname, pid, email, password, username){
    try {
      await this.dao.register(firstname, lastname, pid, email, password, username);
      return true;
    } catch (error) {
      console.error('Error registering user:', error);
      return false;
    }
  }

}
module.exports = Controller;