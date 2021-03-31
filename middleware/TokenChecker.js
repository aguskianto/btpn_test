const appconfig = require('../config/appconfig.js');

module.exports = class TokenChecker{
    static async check(req, res, next){
        const appToken = appconfig.token;
        const rawToken = req.get('Authorization');

        let token = '';

        if (rawToken !== undefined && rawToken !== null) {
            let token = rawToken.split(' ')[1];

            if (rawToken !== undefined && rawToken !== null && appToken === token) {
                next()
            } else {
                res.json({message: "You are not authorized"});
            }
        } else {
            res.json({message: "You are not authorized"});
        }
    }
}