/*
Database integration

*/
const path = require('path');
require('dotenv').config({
  override: true,
  path: path.join(__dirname, '.env')

});

class DAO {
  constructor() {
    const { Pool, Client } = require('pg');
    this.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWD,
      port: process.env.DB_PORT
    })
  }

  async login(username, userpassword) {
    const client = await this.pool.connect();
    try {
      console.log("database access")
      const { rows } = await client.query("SELECT row_to_json(user_alias)" +
        "FROM (SELECT person_id, name, surname, pnr, email, role_id, username " +
        "FROM public.person where username = $1 AND password = $2) user_alias", [username, userpassword])
      //const {rows} = await client.query("SELECT * FROM PUBLIC.PERSON");
      console.log(rows)
      return rows[0];
    } catch (e) {
      console.error(e);
    } finally {
      client.end()
    }
    return {};
  };
}

module.exports = DAO;
/*const dblog = new DAO()
  dblog.login('JoelleWilkinson', 'hdfd').then(

    result => console.log(result)

    )*/

//login fail null, success return jsaon ,namn, efternamn, id, usertype

//skapa profil

//hämta profil

//sök kompetens

//submit application

//sök availblity

//change status