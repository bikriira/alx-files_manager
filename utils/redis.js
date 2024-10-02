import { promisify } from 'util';
import { createClient } from 'redis';

/**
 * A class representing a Redis client.
 */
class RedisClient {
  /**
   * Initializes a new instance of RedisClient.
   */
  constructor() {
    this.client = createClient();
    this.connectionActive = true;

    this.client.on('error', (err) => {
      console.error('Failed to connect to Redis client:', err.message || err.toString());
      this.connectionActive = false;
    });

    this.client.on('connect', () => {
      this.connectionActive = true;
    });
  }

  /**
   * Checks whether the connection to the Redis server is active.
   * @returns {boolean}
   */
  isConnected() {
    return this.connectionActive;
  }

  /**
   * Fetches the value associated with a specified key.
   * @param {String} key The key for the item to retrieve.
   * @returns {String | Object}
   */
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  /**
   * Saves a key-value pair with an expiration duration.
   * @param {String} key The key for the item to save.
   * @param {String | Number | Boolean} value The value to store.
   * @param {Number} duration The expiration time in seconds.
   * @returns {Promise<void>}
   */
  async set(key, value, duration) {
    await promisify(this.client.SETEX)
      .bind(this.client)(key, duration, value);
  }

  /**
   * Deletes the value associated with a specified key.
   * @param {String} key The key for the item to delete.
   * @returns {Promise<void>}
   */
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;
