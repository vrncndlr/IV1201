class DAO{
  constructor(){

  }
  login(username, password){
    const user = new Object();
    user.name = "Fredrik";
    user.surname = "Wilkinson";
    user.username = "JoelleWilkinson";
    user.id= "1";
    const userJson = JSON.stringify(user);

    return userJson;
  }
}
module.exports = DAO;