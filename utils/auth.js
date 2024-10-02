/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */

import sha1 from 'sha1';
import { Request } from 'express';
import mongoDBCore from 'mongodb/lib/core';
import dbClient from './db';
import redisClient from './redis';

/**
 * Retrieves the user based on the Authorization header from the provided request object.
 * @param {Request} req The Express request object.
 * @returns {Promise<{_id: ObjectId, email: string, password: string}>}
 */
export const fetchUserFromAuthorization = async (req) => {
  const authHeader = req.headers.authorization || null;

  if (!authHeader) {
    return null;
  }
  const authParts = authHeader.split(' ');

  if (authParts.length !== 2 || authParts[0] !== 'Basic') {
    return null;
  }
  const decodedToken = Buffer.from(authParts[1], 'base64').toString();
  const separatorIndex = decodedToken.indexOf(':');
  const email = decodedToken.substring(0, separatorIndex);
  const password = decodedToken.substring(separatorIndex + 1);
  const user = await (await dbClient.usersCollection()).findOne({ email });

  if (!user || sha1(password) !== user.password) {
    return null;
  }
  return user;
};

/**
 * Retrieves the user based on the X-Token header from the provided request object.
 * @param {Request} req The Express request object.
 * @returns {Promise<{_id: ObjectId, email: string, password: string}>}
 */
export const fetchUserFromXToken = async (req) => {
  const token = req.headers['x-token'];

  if (!token) {
    return null;
  }
  const userId = await redisClient.get(`auth_${token}`);
  if (!userId) {
    return null;
  }
  const user = await (await dbClient.usersCollection())
    .findOne({ _id: new mongoDBCore.BSON.ObjectId(userId) });
  return user || null;
};

export default {
  fetchUserFromAuthorization: async (req) => fetchUserFromAuthorization(req),
  fetchUserFromXToken: async (req) => fetchUserFromXToken(req),
};
