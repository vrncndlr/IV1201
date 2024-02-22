'use strict';
const jwt = require('jsonwebtoken');
/**
 * Class that handles authentication and authorization of users.
 */
class Authorization{
  /**
   * Getter that returns the name the JWT token is set as a cookie under
   * @returns name of authorization cookie
   */
  static getAuthCookieName() {
    return 'authCookie';
  }
  /**
   * Verifies the JWT token supplied under the cookie name.
   * @param {HTTPRequest} request The incoming http request
   * @param {HTTPResponse} response The outgoing http response
   * @returns false if no cookie with the correct name is present in request, true otherwise
   */
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

  /**
   * Sets a JSON web token, JWT, as cookie for authorization.
   * @param {Object} user : {username: <username>, password:<password>}
   * @param {HTTPResponse} response the cookie is set in this response
   */
  static setAuthCookie(user, response){
    const notAccessibleFromJs = {httpOnly: true};
    const sessionCookie = {expiresIn: '1h'};

    const JWTToken = jwt.sign(
      {id:user.id, user:user.username},
      "1234",
      sessionCookie,
    );
    const cookieOptions = {...notAccessibleFromJs};
    response.cookie(this.getAuthCookieName(), JWTToken, cookieOptions);
  }
}

module.exports = Authorization;