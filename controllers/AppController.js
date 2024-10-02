const redisClient = require('../utils/redisClient');
const dbClient = require('../utils/dbClient');

exports.getStatus = async (req, res) => {
    const status = {
        redis: await redisClient.ping(),
        db: dbClient.isConnected()
    };
    res.status(200).json(status);
};

exports.getStats = async (req, res) => {
    const users = await dbClient.collection('users').countDocuments();
    const files = await dbClient.collection('files').countDocuments();
    res.status(200).json({ users, files });
};
