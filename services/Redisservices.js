const redis = require('redis');
const redisconfig = require("../config/redisconfig.js");

const uri = redisconfig.uri;
var redisClient = redis.createClient(uri);

redisClient.on('error', (err) => {
    console.log("Error " + err);
});

module.exports = redisClient;