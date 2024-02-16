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
      await client.query('BEGIN')
      const { rows } = await client.query("SELECT row_to_json(user_alias)" +
        "FROM (SELECT person_id, name, surname, pnr, email, role_id, username " +
        "FROM public.person where username = $1 AND password = $2) user_alias", [username, userpassword])
      //const {rows} = await client.query("SELECT * FROM PUBLIC.PERSON");
      console.log(rows)
      if(rows.length === 0) console.log("undefined user in dao")
      await client.query('COMMIT')
      return rows[0];
    } catch (e) {
      await client.query('ROLLBACK')
      console.error(e);
      throw new Error("database error") 
    } finally {
      client.end()
    }
    return {};
  };

  /**
   * Inserts data sent from the frontend into the PostreSQL database
   * @param firstname
   * @param lastname
   * @param pid
   * @param email
   * @param username
   * @param password
   * @returns {Promise<*>} The inserted object with user data
   */
  async register(firstname, lastname, pid, email, username, password) {
    console.log("DAO: ", firstname, lastname, pid, email, username, password);
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query("INSERT INTO public.person (name, surname, pnr, email, password, role_id, username)" +
                                          "VALUES ($1, $2, $3, $4, $5, 2, $6) " +
                                          "RETURNING *;", [firstname, lastname, pid, email, password, username]);
        console.log("return object (DBCaller.js): ", rows[0]);
        return rows[0];
    } catch (error) {
      console.error('Error inserting user:', error);
      throw error;
    } finally {
      client.end();
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
