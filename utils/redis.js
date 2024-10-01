const { createClient } = require('redis');

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log(err));
    this.connectionPromise = this.connect();
  }

  async connect() {
    try {
      await this.client.connect();
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
    }
  }

  async isAlive() {
    await this.connectionPromise;
    return this.client.isReady;
  }

  async get(key) {
    await this.connectionPromise;
    const result = await this.client.get(key);
    return result;
  }

  async set(key, value, duration) {
    await this.connectionPromise;
    await this.client.set(key, value, { EX: duration });
  }

  async del(key) {
    await this.connectionPromise;
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
