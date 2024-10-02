/* eslint-disable no-unused-vars */

import { Request, Response, NextFunction } from 'express';
import { getUserFromXToken, getUserFromAuthorization } from '../utils/auth';

/**
 * This middleware implements basic authentication for a route.
 * @param {Request} req The request object from Express.
 * @param {Response} res The response object from Express.
 * @param {NextFunction} next The next middleware function in the stack.
 */
export const basicAuthenticate = async (req, res, next) => {
  const user = await getUserFromAuthorization(req);

  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  req.user = user;
  next();
};

/**
 * This middleware implements authentication via x-token for a route.
 * @param {Request} req The request object from Express.
 * @param {Response} res The response object from Express.
 * @param {NextFunction} next The next middleware function in the stack.
 */
export const xTokenAuthenticate = async (req, res, next) => {
  const user = await getUserFromXToken(req);

  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  req.user = user;
  next();
};
