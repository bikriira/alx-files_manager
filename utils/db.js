import mongodb from 'mongodb';
// eslint-disable-next-line no-unused-vars
import Collection from 'mongodb/lib/collection';
import envLoader from './env_loader';

/**
 * MongoDB client for files_manager database.
 */
class DBClient {
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;
    
    // Initialize MongoDB client with unified topology
    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect();
  }

  // Check if connection is active
  isAlive() {
    return this.client.isConnected();
  }

  // Get number of users
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  // Get number of files
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }

  // Get users collection
  async usersCollection() {
    return this.client.db().collection('users');
  }

  // Get files collection
  async filesCollection() {
    return this.client.db().collection('files');
  }
}

export const dbClient = new DBClient();
export default dbClient;
