'use strict';
const jwt = require('jsonwebtoken');

class Authorization{
  static getAuthCookieName() {
    return 'authCookie';
  }
  static verifyIfAuthorized(request, response){
    const authCookie = request.cookies.authCookie;
    if(!authCookie){
      console.log("no auth cookie found")
      return false;
    }
    let decoded = jwt.verify(authcookie, process.env.JWT_SECRET);
    if(decoded)
      console.log("cookie verified")
    else
      console.log("cookie not verified")
    return true;
  }
  static setAuthCookie(user, response){
    const notAccessibleFromJs = {httpOnly: true};
    const sessionCookie = {expiresIn: '1h'};

    const JWTToken = jwt.sign(
      {id:user.id, user:user.username},
      process.env.JWT_SECRET,
      sessionCookie,
    );
    const cookieOptions = {...notAccessibleFromJs};
    response.cookie(this.getAuthCookieName(), JWTToken, cookieOptions);
    console.log(response.cookie)
  }
}

module.exports = Authorization;