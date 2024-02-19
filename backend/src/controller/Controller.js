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
  async restoreAccountByEmail(email){
    const exists = await this.dao.checkUserEmail(email);

    //add check so that you cant restore account if you have username and pw??

    console.log("contr: " + exists.person_id)
    console.log("contr: " + exists.email)
    if(exists == undefined) throw new Error("email not found in database");
    if(exists != undefined && exists.person_id){
      const mailer = new Email();
      const [messageSent, accountRestoreCode] = await mailer.sendAccountRestoreMail(exists.email)
      console.log(messageSent + " " + accountRestoreCode)
      await this.dao.storeAccountRestoreCode(exists.person_id, accountRestoreCode);
      return messageSent;
    }
    else
      return false;}

}
module.exports = Controller;