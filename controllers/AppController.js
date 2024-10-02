/* eslint-disable import/no-named-as-default */
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

/**
 * Controller for application-wide operations.
 */
export default class AppController {
  /**
   * Get the status of Redis and DB connections.
   */
  static getStatus(req, res) {
    res.status(200).json({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    });
  }

  /**
   * Get the count of users and files in the database.
   */
  static getStats(req, res) {
    Promise.all([dbClient.nbUsers(), dbClient.nbFiles()])
      .then(([usersCount, filesCount]) => {
        res.status(200).json({ users: usersCount, files: filesCount });
      });
  }
}
