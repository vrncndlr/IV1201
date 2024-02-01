class DAO{
  constructor(){

  }
  loginUser(username, password){
    const user = new Object();
    user.name = "Joelle";
    user.surname = "Wilkinson";
    user.username = "JoelleWilkinson";
    const userJson = JSON.stringify(user);

    return userJson;
  }
}
module.exports = DAO;