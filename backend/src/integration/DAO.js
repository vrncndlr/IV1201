/*
Database integration

*/
const path = require('path');
require('dotenv').config({
  override: true,
  path: path.join(__dirname, 'dbenv.env')

});

class DAO {
  constructor() {
    const {Pool, Client} = require('pg');
    this.pool = new Pool({
      user: process.env.USER,
      host: process.env.HOST,
      database: process.env.NAME,
      password: process.env.PASSWD,
      port: process.env.PORT
    })
  }

  async login(username, userpassword) {
    const client = await this.pool.connect();
    try {
      //console.log("database access")
      const {rows} = await client.query("SELECT row_to_json(user_alias)" +
          "FROM (SELECT person_id, name, surname, pnr, email, role_id, username " +
          "FROM public.person where username = $1 AND password = $2) user_alias", [username, userpassword]);
      return rows[0];
    } catch (e) {
      console.error(e);
    } finally {
      client.end()
    }
    return {};
  };

  //Lägg till profil i databas
  async register(firstname, lastname, pid, email, username, password) {
    const client = await this.pool.connect();
    try {
      //const queryString = "INSERT INTO public.person (name, surname, pnr, email, username, password) VALUES ($1, $2, $3, $4, $5, $6); RETURNING *;"
      const { rows } = await client.query("INSERT INTO public.person (name, surname, pnr, email, username, password)" +
                                          "VALUES ($1, $2, $3, $4, $5, $6); " +
                                          "RETURNING *;", [firstname, lastname, pid, email, username, password]);
        return rows[0];
    } catch (error) {
      console.error('Error inserting user:', error);
      throw error; // Re-throw the error to handle it in the caller
    } finally {
      client.release(); // Release the client back to the pool
    }
  }
}

module.exports = DAO;

/**
 * TODO:
 * login fail null, success return jsaon ,namn, efternamn, id, usertype
 * hämta profil
 * sök kompetens
 * submit application
 * sök availblity
 * change status
 */
