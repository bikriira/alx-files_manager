/* eslint-disable import/no-named-as-default */
import sha1 from 'sha1';
import Queue from 'bull/lib/queue';
import dbClient from '../utils/db';

const userQueue = new Queue('email sending');

export default class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }

    const userExists = await (await dbClient.usersCollection()).findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Already exist' });
    }

    const { insertedId: userId } = await (await dbClient.usersCollection())
      .insertOne({ email, password: sha1(password) });

    userQueue.add({ userId });
    res.status(201).json({ email, id: userId.toString() });
  }

  static async getMe(req, res) {
    const { user } = req;
    res.status(200).json({ email: user.email, id: user._id.toString() });
  }
}
