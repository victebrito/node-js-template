const mongoose = require("mongoose");
const functionsPlugin = require('models/plugins/schemaFunctions');
mongoose.plugin(functionsPlugin);

exports.connect = (connectionString, options) => {
    options = options || {
        keepAlive: true,
        useNewUrlParser: true,
        sslValidate: true
    };

    return new Promise((res, rej) => {
        console.log('   Connecting do DB...')
        mongoose.connect(connectionString, options, (err) => {
            if (err) return rej(err);
            console.log('✅ DB Connected successfully');
            return res();
        });
    });  
}