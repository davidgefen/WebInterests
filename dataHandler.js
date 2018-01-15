var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectId = require('mongodb').ObjectId;

/**
 * get IP for database
 * @returns {*}
 * @constructor
 */
var DBIP = function () {
    // var mongoUrl;
    // if(process && process.env && process.env.VCAP_SERVICES) {
    //     var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
    //     for (var svcName in vcapServices) {
    //         if (svcName.match(/^mongo.*/)) {
    //             mongoUrl = vcapServices[svcName][0].credentials.uri;
    //             mongoUrl = mongoUrl || vcapServices[svcName][0].credentials.url;
    //             break;
    //         }
    //     }
    // } else {
    //     mongoUrl = "mongodb://localhost:27017/";
    // }
    // return mongoUrl;
    var mongo = process.env.VCAP_SERVICES;
    var port = process.env.PORT || 3030;
    var conn_str = "";
    if (mongo) {
        var env = JSON.parse(mongo);
        if (env['mongodb']) {
            mongo = env['mongodb'][0]['credentials'];
            if (mongo.url) {
                return mongo.url;
            } else {
                console.log("No mongo found");
            }
        } else {
            return 'mongodb://localhost:27017';
        }
    } else {
        return 'mongodb://localhost:27017';
    }
};

var collectionName = 'Users';
var url = DBIP();
var data = {};

function createCollection(collectionName) {
    //connect away
    MongoClient.connect(DBIP(), function (err, db) {
        if (err) throw err;
        console.log("Connected to Database");
        //create collection
        db.createCollection(collectionName, function (err, collection) {
            if (err) throw err;

            console.log("Created " + collectionName + " collection");
            console.log(collection);
        });
    });
}

function databaseStore(data){
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //HURRAY!! We are connected. smile emoticon
            console.log('Connection established to', url);
            // Get the documents collection
            var collection = db.collection(collectionName);
            collection.insert(data, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted documents into the collection.');
                }
                //Close connection
                db.close();
            });
        }
    });
}

function getData(){
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //HURRAY!! We are connected. smile emoticon
            console.log('Connection established to', url);
            // Get the documents collection
            var collection = db.collection(collectionName);
            var items = collection.find();
            items.each(function(err, item){
                if(item !== null) {
                    console.log(item);
                }
            });
        }
    });
}

function removeCollection(){
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //HURRAY!! We are connected. smile emoticon
            console.log('Connection established to', url);
            // Get the documents collection
            var collection = db.collection(collectionName).remove();
        }
    });
}
var exports = module.exports = {};
exports.createCollection = function(){
    createCollection('Users');
};

// getData();