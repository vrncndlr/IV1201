const DAO = require('../integration/DAO');
const Email = require('../integration/Email');

/**
 * Class that is called by api layer to make database calls.
 */
class Controller{
  constructor(){
    this.dao = new DAO();
  }

  /**
   * Calls the database layer for user data update and returns the result.
   * @param {Object} userdata contains username, password, confirmPassword, email and resetCode fields.
   * @returns 
   */
  async updateUserDataByEmailCode(userdata){
    return await this.dao.updateUserDataByEmailCode(userdata);
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
   * @returns true if registration successful and false if not {Promise<boolean>}*/
  async register(firstname, lastname, pid, email, password, username){
    try {
      await this.dao.register(firstname, lastname, pid, email, password, username);
      return true;
    } catch (error) {
      console.error('Error registering user:', error);
      return false;
    }
  }
  /**
   * Checks if a user with the supplied email exists in database and is missing username.
   * If so, sends out a restoration code by email and stores it in the database.
   * @param {String} email User email address
   * @returns true if restoration code was succesfully sent, otherwise false.
   */
  async restoreAccountByEmail(email){
    const exists = await this.dao.checkUserEmail(email);

    if(exists == undefined)
      return false;
    if(exists != undefined && exists.username){
      return false;
    }
    if(exists != undefined && exists.person_id){
      const mailer = new Email();
      const [messageSent, accountRestoreCode] = await mailer.sendAccountRestoreMail(exists.email)
      console.log(messageSent + " " + accountRestoreCode)
      await this.dao.storeAccountRestoreCode(exists.person_id, accountRestoreCode);
      return messageSent;
    }
    else
      return false;
    }
    
  async update(person_id, name, surname, pnr, email){
     await this.dao.updateUserInfo(person_id, name, surname, pnr, email);
  }
  async fetch(){
    return await this.dao.getCompetences();
  }

}
module.exports = Controller;