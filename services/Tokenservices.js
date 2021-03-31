const crypto = require('crypto');

exports.generate = function generate() {
    return crypto.randomBytes(20).toString('hex');
};