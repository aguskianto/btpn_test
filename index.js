require('dotenv').config();

const express = require("express");
const chalk = require('chalk');
const morgan = require('morgan');
const cors = require("cors");
const bodyParser = require("body-parser");

var app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(bodyParser.json({limit: "8mb"}));
app.use(bodyParser.urlencoded({extended: true }));

/* Initialize redis service */
const mongoose =  require("mongoose");
const mongoconfig = require("./config/mongoconfig.js");
const URL = mongoconfig.uri;
const options = {
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true 
};

mongoose.connect(URL, options)
.catch(err => console.log(`Error in DB connection ${err}`));

/* Initialize redis service */
const redisClient = require("./services/Redisservices.js");

app.use(cors({
    credentials: true
}));

/* app configuration */
const appconfig = require('./config/appconfig.js');
const port = appconfig.port;

const UserRoutes = require("./routes/user.routes");

app.get("/", async function(req, res) {
    res.json({message: "Hello from docker"});
});

app.get("/token", function(req, res) {
    const token = appconfig.token;

    return res.json(token);
});

app.use("/users", UserRoutes);

const server = app.listen(port, () => {
    console.log(`listening on port ${chalk.red(port)}`);
});

server.timeout = 4000;

/* shutdown gracefully */
process.on('SIGTERM', () => {
    debug('SIGTERM signal received.');
    debug('Closing http server.');
    server.close(() => {
        mongoose.disconnect();
        redisClient.quit();
        debug('Http server closed.');
    });
});