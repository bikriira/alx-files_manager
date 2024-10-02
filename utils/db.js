import { MongoClient } from 'mongodb';

/**
 * DBClient class to manage connections to MongoDB.
 * It allows checking connection status and querying user and file counts.
 */
class DBClient {
  constructor() {
    // Set up MongoDB connection parameters
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // Create the MongoDB connection URL
    const url = `mongodb://${host}:${port}`;
    
    // Initialize the MongoDB client and connect to the database
    this.client = new MongoClient(url);
    this.client.connect()
      .then(() => console.log('Connected to MongoDB'))
      .catch((err) => console.error('MongoDB connection error:', err));
    
    // Set the database to use
    this.db = this.client.db(database);
  }

  /**
   * Checks if the connection to MongoDB is alive.
   * @returns {boolean} True if connected, false otherwise.
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * Gets the number of documents in the 'users' collection.
   * @returns {Promise<number>} A promise that resolves to the count of users.
   */
  async nbUsers() {
    return await this.db.collection('users').countDocuments();
  }

  /**
   * Gets the number of documents in the 'files' collection.
   * @returns {Promise<number>} A promise that resolves to the count of files.
   */
  async nbFiles() {
    return await this.db.collection('files').countDocuments();
  }
}

// Export an instance of DBClient for use in other modules
const dbClient = new DBClient();
export default dbClient;

