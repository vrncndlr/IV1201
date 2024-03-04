const DAO = require('../integration/DAO');
const Email = require('../integration/Email');
const Crypt = require('../model/Crypt');

/**
 * Class that is called by api layer to make database calls.
 */
class Controller {

    constructor() {
        this.dao = new DAO();
        this.crypt = new Crypt();
    }
    /**
     * Calls the database layer for user data update and returns the result.
     * @param {Object} userdata contains username, password, confirmPassword, email and resetCode fields.
     * @returns
     */
    async updateUserDataByEmailCode(userdata) {
        const connection = await this.dao.getConnection();
        try {
            await connection.query('BEGIN')
            const result = await this.dao.updateUserDataByEmailCode(connection, userdata)
            await connection.query('COMMIT')
            return result;
        } catch (e) {
            await connection.query('ROLLBACK')
            console.error(e);
            throw new Error("database error")
        } finally {
            connection.release()
        }
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
    async login(username, password) {
        const connection = await this.dao.getConnection();
        try {
            await connection.query('BEGIN')
            const hashedpassword = await this.dao.getLoginUserData(connection, username);
            if (hashedpassword[0] == undefined) {
                await connection.query('COMMIT')
                return undefined;
            }
            const bool = await this.crypt.checkPassword(password, hashedpassword[0].password);
            if (bool) {
                const result = await this.dao.getUser(connection, hashedpassword[0].person_id);
                await connection.query('COMMIT')
                return result;
            }
            await connection.query('COMMIT')
            return undefined;
        } catch (e) {
            await connection.query('ROLLBACK')
            console.error(e);
            throw new Error("database error")
        } finally {
            connection.release()
        }
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
     * @returns true if registration successful and false if not {Promise<boolean>}*/
    async register(firstname, lastname, pid, email, password, username) {
        const connection = await this.dao.getConnection();
        try {
            await connection.query('BEGIN')
            const hash = await this.crypt.generateCryptPassword(password);
            await this.dao.register(connection, firstname, lastname, pid, email, username, hash);
            await connection.query('COMMIT')
            return result;
        } catch (e) {
            await connection.query('ROLLBACK')
            console.error('Error registering user:', error);
            return false;
        } finally {
            connection.release()
        }
    }
    /**
     * Checks if a user with the supplied email exists in database and is missing username.
     * If so, sends out a restoration code by email and stores it in the database.
     * @param {String} email User email address
     * @returns true if restoration code was succesfully sent, otherwise false.
     */
    async restoreAccountByEmail(email) {
        const connection = await this.dao.getConnection();
        try {
            await connection.query('BEGIN')
            const exists = await this.dao.checkUserEmail(connection, email);
            if (exists == undefined) {
                await connection.query('COMMIT')
                return false;
            }

            if (exists != undefined && exists.username) {
                await connection.query('COMMIT')
                return false;
            }
            if (exists != undefined && exists.person_id) {
                const mailer = new Email();
                const [messageSent, accountRestoreCode] = await mailer.sendAccountRestoreMail(exists.email)
                console.log(messageSent + " " + accountRestoreCode)
                await this.dao.storeAccountRestoreCode(connection, exists.person_id, accountRestoreCode);
                await connection.query('COMMIT')
                return messageSent;
            }
            else {
                await connection.query('COMMIT')
                return false;
            }
        } catch (e) {
            await connection.query('ROLLBACK')
            console.error(e);
            throw new Error("database error")
        } finally {
            connection.release()
        }
    }

    /**
     * Updates the users personal information
     * @param person_id
     * @param name
     * @param surname
     * @param pnr
     * @param email
     * @returns {Promise<void>}
     */
    async update(person_id, name, surname, pnr, email) {
        const connection = await this.dao.getConnection();
        try {
            await connection.query('BEGIN')
            const result = await this.dao.updateUserInfo(connection, person_id, name, surname, pnr, email)
            await connection.query('COMMIT')
            return result;
        } catch (e) {
            await connection.query('ROLLBACK')
            console.error(e);
            throw new Error("database error")
        } finally {
            connection.release()
        }
    }

    /**
     * Fetches all rows from the table competence in the database
     * @returns {Promise<*>}
     */
    async fetch() {
        const connection = await this.dao.getConnection();
        try {
            await connection.query('BEGIN')
            const result = await this.dao.getAllFromCompetences(connection);
            await connection.query('COMMIT')
            return result;
        } catch (e) {
            await connection.query('ROLLBACK')
            console.error(e);
            throw new Error("database error")
        } finally {
            connection.release()
        }
    }

    /**
     * Gets all status from databaseHandler and forwards to API
     * @returns {Promise<*|undefined>}
     */
    async setCompetence(person_id, competence_id, monthsOfExperience) {
        const connection = await this.dao.getConnection();
        const yearsOfExperience = monthsOfExperience / 12;
        try {
            await connection.query('BEGIN')
            const result = await this.dao.createCompetenceProfile(connection, person_id, competence_id, yearsOfExperience);
            await connection.query('COMMIT')
            return result;
        } catch (e) {
            await connection.query('ROLLBACK')
            console.error(e);
            throw new Error("database error")
        } finally {
            connection.release()
        }
    }

    /**
     * Calls the database layer with availability api function
     * @returns {Promise<*|undefined>}
     */
    async setAvailability(person_id, from_date, to_date) {
        const connection = await this.dao.getConnection();
        try {
            await connection.query('BEGIN')
            const result = await this.dao.createAvailability(connection, person_id, from_date, to_date);
            await connection.query('COMMIT')
            return result;
        } catch (e) {
            await connection.query('ROLLBACK')
            console.error(e);
            throw new Error("database error")
        } finally {
            connection.release()
        }
    }

    /**
     * Gets status of all applicants
     * @returns all status
     */
    async fetchApplicants() {
        const connection = await this.dao.getConnection();
        try {
            await connection.query('BEGIN')
            const result = await this.dao.getAllStatus(connection)
            await connection.query('COMMIT')
            return result;
        } catch (e) {
            await connection.query('ROLLBACK')
            console.error(e);
            throw new Error("database error")
        } finally {
            connection.release()
        }
    }

    /**
     * Gets the competences of one person
     * @param person_id the id of the person
     * @returns the availability of the user in json
     */
    async getUserCompetences(person_id) {
        const connection = await this.dao.getConnection();
        try {
            await connection.query('BEGIN')
            const result = await this.dao.getUserCompetenceProfile(connection, person_id)
            await connection.query('COMMIT')
            return result;
        } catch (e) {
            await connection.query('ROLLBACK')
            console.error(e);
            throw new Error("database error")
        } finally {
            connection.release()
        }
    }
    /**
     * Gets the availabilities of one person
     * @param person_id the id of the person
     * @returns the availability of the user in json
     */
    async getUserAvailabilities(person_id) {
        const connection = await this.dao.getConnection();
        try {
            await connection.query('BEGIN')
            const result = await this.dao.getUserAvailability(connection, person_id)
            await connection.query('COMMIT')
            return result;
        } catch (e) {
            await connection.query('ROLLBACK')
            console.error(e);
            throw new Error("database error")
        } finally {
            connection.release()
        }
    }


}
module.exports = Controller;