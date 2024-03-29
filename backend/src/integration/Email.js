const path = require('path');
const nodemailer = require("nodemailer");

require('dotenv').config({
  override: true,
  path: path.join(__dirname, 'dbenv.env')

});

/**
 * Class that sends email messages from address found in dbenv.env. 
 * Currently only @kth.se addresses are supported.
 */
class Mail{
  constructor(){
    this.accountName = process.env.EMAIL;
    this.pw = process.env.EMAIL_PW;
    this.sender = this.accountName + "@kth.se"
  };

  /**
   * Generates and sends a number to the supplied email address.
   * @param {String} email User address to be sent a account restoration code.
   * @returns [true, secretCode] if the email was sent, [false, null] otherwise.
   */
  async sendAccountRestoreMail(email){
    console.log("sending email to : " + email)
    try{
      const transporter = nodemailer.createTransport({
        host: "smtp.kth.se",
        port: 587,
        secure: false,
        auth: {
          user: this.accountName,
          pass: this.pw,
        },
        tls:{
          ciphers:'SSLv3',
          rejectUnauthorized : false,
        },
      });

      const accountRestoringCode = await this.getAccountRestoringCode();
      const info = await transporter.sendMail({
        from: this.sender, // sender address
        to: email, // list of receivers
        subject: "Account recovery", // Subject line
        text: accountRestoringCode, // plain text body
        html: "<b>" + accountRestoringCode + "</b>", // html body
      });
      console.log("Message sent: %s", info);
      return [true, accountRestoringCode];
    }catch(e){
      console.log(e)
      return [false, null];
    }
  }

  async getAccountRestoringCode(){
    return Math.floor(Math.random() * 10000).toString();
    //return "1234";
  }

}

module.exports = Mail;