// eslint-disable-next-line no-unused-vars
import mongodb from 'mongodb';
import envLoader from './env_loader';

/**
 * A class representing a MongoDB client.
 */
class DBClient {
  /**
   * Initializes a new instance of DBClient and connects to the database.
   */
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;
    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect();
  }

  /**
   * Checks if the connection to the MongoDB server is active.
   * @returns {boolean}
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * Counts the number of users in the database.
   * @returns {Promise<Number>}
   */
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  /**
   * Counts the number of files in the database.
   * @returns {Promise<Number>}
   */
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }

  /**
   * Retrieves a reference to the `users` collection.
   * @returns {Promise<Collection>}
   */
  async usersCollection() {
    return this.client.db().collection('users');
  }

  /**
   * Retrieves a reference to the `files` collection.
   * @returns {Promise<Collection>}
   */
  async filesCollection() {
    return this.client.db().collection('files');
  }
}

export const dbClient = new DBClient();
export default dbClient;
