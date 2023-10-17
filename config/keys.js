const config = require('../config');

var myKey = config.PASS;

module.exports = {
    MongoURI : 'mongodb+srv://Srijan:'+myKey+'@freecluster.iznb4iq.mongodb.net/?retryWrites=true&w=majority'
}