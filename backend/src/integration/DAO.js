/*
Database integration
Integration module to handle all calls to database.


*/
const path = require('path');
require('dotenv').config({
  override: true,
  path: path.join(__dirname, 'dbenv.env')
});

//Constructor to create module and establish connection to database.
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

  /**
  * Checks username and password with the datebase, if matching it returns the user, if not returns empty json.
  * @param  username the username input
  * @param  userpassword the password of the userinput
  * @return selected user if password and username match.
  */
  async login(username, userpassword) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN')
      const { rows } = await client.query("SELECT row_to_json(user_alias)" +
        "FROM (SELECT person_id, name, surname, pnr, email, role_id, username " +
        "FROM public.person where username = $1 AND password = $2) user_alias", [username, userpassword])
      if (rows.length === 0) console.log("undefined user in dao")
      await client.query('COMMIT')
      return rows[0];
    } catch (e) {
      await client.query('ROLLBACK')
      console.error(e);
      throw new Error("database error")
    } finally {
      client.end()
    }
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
  // TODO:
  async getRowsFromTable(){
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query("SELECT name FROM public.competence");
      console.log("DAO: ", rows);
      return rows;
    } catch (error) {
      console.error('Error fetching rows from table:', error);
      throw new Error('Database error: ' + error.message);
    } finally {
      client.end();
    }
  };

/**
* Get user from database.
* @param  person_id the person id
* @return selected user
*/
  async getUser(person_id) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN')
      const { rows } = await client.query("SELECT row_to_json(user_alias)" +
        "FROM (SELECT person_id, name, surname, pnr, email, role_id, username " +
        "FROM public.person where person_id = $1) user_alias", [person_id])
      if (rows.length === 0) console.log("undefined user in dao")
      await client.query('COMMIT')
      return rows[0];
    } catch (e) {
      await client.query('ROLLBACK')
      console.error(e);
      throw new Error("database error")

    } finally {
      client.end()
    }
  };

  /**
* Get all users from database.
* @return all user
*/
  async getAllUsers() {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN')
      const { rows } = await client.query("SELECT row_to_json(user_alias)" +
        "FROM (SELECT person_id, name, surname, pnr, email, role_id, username " +
        "FROM public.person where role_id = 2) user_alias")
      await client.query('COMMIT')
      return rows;
    } catch (e) {
      await client.query('ROLLBACK')
      console.error(e);
      throw new Error("database error")

    } finally {
      client.end()
    }
  };

  /**
*  Check if email exists in database.
* @param useremail email to check.
* @return false if not exist, return person if exits.
*/
  async checkUserEmail(useremail) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN')
      const { rows } = await client.query("SELECT row_to_json(user_alias)" +
        "FROM (SELECT person_id, name, surname, pnr, email, role_id, username, password " +
        "FROM public.person where email = $1) user_alias", [useremail])
      await client.query('COMMIT')
      if (rows.length == 0) {
        return false;
      } else {
        return rows[0];
      }
    } catch (e) {
      await client.query('ROLLBACK')
      console.error(e);
      throw new Error("database error")
    } finally {
      client.end()
    }
  };

  /**
  *  Check username exists in database.
  * @param username username to check.
  * @return false if not exist, true if exists.
  */
  async checkUserName(username) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN')
      const { rows } = await client.query("SELECT row_to_json(user_alias)" +
        "FROM (SELECT username " +
        "FROM public.person where username = $1) user_alias", [username])
      await client.query('COMMIT')
      if (rows.length == 0) {
        return false;
      } else {
        return true;
      }
    } catch (e) {
      await client.query('ROLLBACK')
      console.error(e);
      throw new Error("database error")
    } finally {
      client.end()
    }
  };

  /**
  *  updates a username in database.
  * @param person_id the id of the user to update
  * @param useremail new email.
  * @return user
  */
  async updateUsername(person_id, username) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN')
      const { rows } = await client.query("UPDATE person " +
        "SET username = $1 " +
        "WHERE person_id = $2 " +
        "RETURNING *", [username, person_id])
      await client.query('COMMIT')
      return rows;
    } catch (e) {
      await client.query('ROLLBACK')
      console.error(e);
      throw new Error("database error")
    } finally {
      client.end()
    }
  };

  /**
  *  updates a password in database.
  * @param person_id the id of the user to update
  * @param password new password.
  * @return user
  */
  async updateUserpassword(person_id, password) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN')
      const { rows } = await client.query("UPDATE person " +
        "SET password = $1 " +
        "WHERE person_id = $2 " +
        "RETURNING *", [password, person_id])
      await client.query('COMMIT')
      return rows;
    } catch (e) {
      await client.query('ROLLBACK')
      console.error(e);
      throw new Error("database error")
    } finally {
      client.end()
    }
  };

  /**
  *  create a new user in database
  * @param name the name of the user
  * @param surname the surname of the user
  * @param pnr the personnummer of the user
  * @param email the email of the user
  * @param password the password of the user
  * @param username the username of the user
  * @return person
  */
  async createUser(name, surname, pnr, email, password, username) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN')
      const { rows } = await client.query("INSERT INTO person(name, surname, pnr, email, password, role_id, username) " +
        "VALUES ($1, $2, $3, $4, $5, 2, $6) " +
        "RETURNING * ;", [name, surname, pnr, email, password, username]
      )
      await client.query('COMMIT')
      return rows;
    } catch (e) {
      await client.query('ROLLBACK')
      console.error(e);
      throw new Error("database error")
    } finally {
      client.end()
    }
  };

  /**
* Get list of comeptence from database
* @return all competences
*/
  async getCompetences() {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN')
      const { rows } = await client.query("SELECT row_to_json(user_alias)" +
        "FROM (SELECT competence_id, name FROM public.competence) user_alias")
      await client.query('COMMIT')
      return rows;
    } catch (e) {
      await client.query('ROLLBACK')
      console.error(e);
      throw new Error("database error")

    } finally {
      client.end()
    }
  };

  /**
* Get user competences from the database.
* @return all competences.
*/
  async getAllCompetenceProfiles() {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN')
      const { rows } = await client.query("SELECT row_to_json(user_alias)" +
        "FROM (SELECT person_id, competence_id, years_of_experience " +
        "FROM public.competence_profile ORDER BY person_id) user_alias")
      await client.query('COMMIT')
      return rows;
    } catch (e) {
      await client.query('ROLLBACK')
      console.error(e);
      throw new Error("database error")

    } finally {
      client.end()
    }
  };

  /**
* Get a specific users cometences from the database.
* @param  person_id the person id
* @return the specified users comeptences as jason
*/
  async getUserCompetenceProfile(person_id) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN')
      const { rows } = await client.query("SELECT row_to_json(user_alias)" +
        "FROM (SELECT person_id, competence_id, years_of_experience " +
        "FROM public.competence_profile where person_id = $1) user_alias", [person_id])
      await client.query('COMMIT')
      return rows;
    } catch (e) {
      await client.query('ROLLBACK')
      console.error(e);
      throw new Error("database error")

    } finally {
      client.end()
    }
  };

  /**
*  Gets specific comptence profile from the database.
* @param  competenceid the id of a specific competence
* @return specific competence profile.
*/
  async getSpecificCompetenceProfile(competenceid) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN')
      const { rows } = await client.query("SELECT row_to_json(user_alias)" +
        "FROM (SELECT person_id, competence_id, years_of_experience " +
        "FROM public.competence_profile where competence_id = $1) user_alias", [competenceid])
      await client.query('COMMIT')
      return rows;
    } catch (e) {
      await client.query('ROLLBACK')
      console.error(e);
      throw new Error("database error")

    } finally {
      client.end()
    }
  };

  /**
*  Creates a new user competence in the database.
* @param person_id the id of the user
* @param competence_id the competence id
* @param years_of_experience the years of experiance the user have.
* @return competence profile.
*/
  async createCompetenceProfile(person_id, competence_id, years_of_experience) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN')
      const { rows } = await client.query("INSERT INTO competence_profile(person_id, competence_id, years_of_experience) " +
        "VALUES($1, $2, $3) " +
        "RETURNING * ", [person_id, competence_id, years_of_experience]
      )
      await client.query('COMMIT')
      return rows;
    } catch (e) {
      await client.query('ROLLBACK')
      console.error(e);
      throw new Error("database error")
    } finally {
      client.end()
    }
  };

  /**
*  deletes competence profile.
* @param competence_profile_id the id of the competence
* @return number of rows deleted
*/
  async deleteCompetenceProfile(competence_profile_id) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN')
      const { rows } = await client.query("DELETE FROM competence_profile " +
        "WHERE competence_profile_id  = $1", [competence_profile_id])
      await client.query('COMMIT')
      return rows;
    } catch (e) {
      await client.query('ROLLBACK')
      console.error(e);
      throw new Error("database error")
    } finally {
      client.end()
    }
  };

  /**
  *  updates competence profile.
  * @param competence_profile_id the id of the competence
  * @param years_of_experience the updated value
  * @return updated competence profile.
  */
  async updateCompetenceProfile(competence_profile_id, years_of_experience) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN')
      const { rows } = await client.query("UPDATE competence_profile " +
        "SET years_of_experience = $1 " +
        "WHERE competence_profile_id = $2 " +
        "RETURNING * ", [years_of_experience, competence_profile_id]
      )
      await client.query('COMMIT')
      return rows;
    } catch (e) {
      await client.query('ROLLBACK')
      console.error(e);
      throw new Error("database error")
    } finally {
      client.end()
    }
  };

  /**
*  Gets all availability slots from the database
* @return all availability slots.
*/
  async getAllAvailability() {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN')
      const { rows } = await client.query("SELECT row_to_json(user_alias)" +
        "FROM (SELECT availability_id, person_id, from_date, to_date " +
        "FROM public.availability ORDER BY person_id) user_alias")
      // console.log(rows)
      await client.query('COMMIT')
      return rows;
    } catch (e) {
      await client.query('ROLLBACK')
      console.error(e);
      throw new Error("database error")

    } finally {
      client.end()
    }
  };

  /**
*  Gets a users availability slots from the database
* @param person_id the id of the user
* @return all availability slots connected to user.
*/
  async getUserAvailability(person_id) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN')
      const { rows } = await client.query("SELECT row_to_json(user_alias)" +
        "FROM (SELECT availability_id, person_id, from_date, to_date " +
        "FROM public.availability where person_id = $1) user_alias", [person_id])
      await client.query('COMMIT')
      return rows;
    } catch (e) {
      await client.query('ROLLBACK')
      console.error(e);
      throw new Error("database error")

    } finally {
      client.end()
    }
  };

  /**
*  Create availability slot.
* @param person_id the id of the user
* @param from_date the start date of the availability
* @param to_date the end date of the availability
* @return updated availability slot.
*/
  async createAvailability(person_id, from_date, to_date) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN')
      const { rows } = await client.query("INSERT INTO availability(person_id, from_date, to_date) " +
        "VALUES($1, $2, $3) " +
        "RETURNING * ", [person_id, from_date, to_date]
      )
      await client.query('COMMIT')
      return rows;
    } catch (e) {
      await client.query('ROLLBACK')
      console.error(e);
      throw new Error("database error")
    } finally {
      client.end()
    }
  };

  /**
  *  Delete availability slot.
  * @param availability_id the id of the availability slot.
  * @return numberr of rows deleted
  */
  async deleteAvailability(availability_id) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN')
      const { rows } = await client.query("DELETE FROM availability " +
        "WHERE availability_id  = $1", [availability_id])
      await client.query('COMMIT')
      return rows;
    } catch (e) {
      await client.query('ROLLBACK')
      console.error(e);
      throw new Error("database error")
    } finally {
      client.end()
    }
  };

  /**
*  Create new status
* @param person_id the id of the user.
* @return status
*/
  async createStatus(person_id) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN')
      const { rows } = await client.query("INSERT INTO status(person_id, status) " +
        "VALUES($1, 'Pending')" +
        "RETURNING * ", [person_id]
      )
      await client.query('COMMIT')
      return rows;
    } catch (e) {
      await client.query('ROLLBACK')
      console.error(e);
      throw new Error("database error")
    } finally {
      client.end()
    }
  };

  /**
*  gets status of user
* @param person_id the id of the user.
* @return user status
*/
  async getStatus(person_id) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN')
      const { rows } = await client.query("SELECT row_to_json(user_alias)" +
      "FROM (SELECT status_id, person_id, status " +
      "FROM public.status where person_id = $1) user_alias", [person_id])
      await client.query('COMMIT')
      return rows;
    } catch (e) {
      await client.query('ROLLBACK')
      console.error(e);
      throw new Error("database error")
    } finally {
      client.end()
    }
  };
  /**
*  change status of user
* @param person_id the id of the user.
* @param status the new status text.
* @return user status
*/
  async changeStatus(person_id, status) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN')
      const { rows } = await client.query("UPDATE status " +
        "SET status = $1 " +
        "WHERE person_id = $2 " +
        "RETURNING *"
        , [status, person_id])
      await client.query('COMMIT')
      return rows;
    } catch (e) {
      await client.query('ROLLBACK')
      console.error(e);
      throw new Error("database error")
    } finally {
      client.end()
    }
  };

/**
* get all statuses
* @return all user status
*/
  async getAllStatus() {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN')
      const { rows } = await client.query("SELECT row_to_json(user_alias)" +
      "FROM (SELECT status_id, person_id, status " +
      "FROM public.status) user_alias")
      await client.query('COMMIT')
      return rows;
    } catch (e) {
      await client.query('ROLLBACK')
      console.error(e);
      throw new Error("database error")
    } finally {
      client.end()
    }
  };

}

module.exports = DAO;

