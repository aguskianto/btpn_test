const Tokenservices = require("../services/Tokenservices.js");

appconfig = {
    port: process.env.PORT || 8080,
    timeout: parseInt(process.env.TIMEOUT) || 4000,
    connecttimeout: parseInt(process.env.CONNECTTIMEOUT) || 500,
    token: Tokenservices.generate()
}

module.exports = appconfig;