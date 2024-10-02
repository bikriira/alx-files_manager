/* eslint-disable import/no-named-as-default */
import { v4 as uuidv4 } from 'uuid';
import redisClient from '../utils/redis';

export default class AuthController {

  // Generates a new token and stores it in Redis
  static async getConnect(req, res) {
    const { user } = req;
    const token = uuidv4();
    
    // Store user ID with token for 24 hours
    await redisClient.set(`auth_${token}`, user._id.toString(), 24 * 60 * 60);
    
    res.status(200).json({ token });
  }

  // Disconnects a user by deleting the token from Redis
  static async getDisconnect(req, res) {
    const token = req.headers['x-token'];
    
    // Remove token from Redis
    await redisClient.del(`auth_${token}`);
    
    res.status(204).send();
  }
}
