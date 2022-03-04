process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
//const db = require("utils/db");
const config = require("config/index");
const listEndpoints = require('express-list-endpoints');
const jwt = require('utils/jwt');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require("routes/index");
app.use('/api', routes);

const PORT = config.port || 3000;
app.listen(PORT, function () {
    console.log(`✅ App listening on port ${PORT}!`);
    console.log('✅ API token: \nBearer ' + jwt.encodeAPI({ name: 'admin' }) + '\n');

    console.log('✅ Routes:')
    console.log(listEndpoints(app));

    /*
    db.connect(config.mongodb.connectionString).then(() => {
        
    });
    */
});
