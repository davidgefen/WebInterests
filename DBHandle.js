/**
 * Created by davidgefen on 31/05/2016.
 */

// /**
//  * get IP for database
//  * @returns {*}
//  * @constructor
//  */
// var DBIP = function () {
//     var mongoUrl;
//     if(process && process.env && process.env.VCAP_SERVICES) {
//         var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
//         for (var svcName in vcapServices) {
//             if (svcName.match(/^mongo.*/)) {
//                 mongoUrl = vcapServices[svcName][0].credentials.uri;
//                 mongoUrl = mongoUrl || vcapServices[svcName][0].credentials.url;
//                 break;
//                 console.log("The URL I found is" + mongoUrl.toString());
//                 return mongoUrl;
//             }
//         }
//     } else {
//         mongoUrl = "mongodb://localhost:27017";
//         console.log("The URL I found is" + mongoUrl.toString());
//         return mongoUrl;
//     }
// };


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

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectId = require('mongodb').ObjectId;

var collectionName = "Users";
var url = DBIP();// + collectionName;

var exports = module.exports = {};

/**
 * return data on existing user
 * @param username username of required data
 * @param callback to handle error or returned data
 */
exports.getUserData = function (username, callback) {
    var arr = [];
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            callback(err);
        } else {
            //HURRAY!! We are connected. smile emoticon
            console.log('Connection established to', url);
            // Get the documents collection
            var stream = db.collection(collectionName).find({'userName': username}).stream();
            stream.on("data", function(item) {arr.push(item)});
            stream.on("end", function(){callback(null, arr);});
        }
    });
};

exports.getUsers = function (callback) {
    var arr = [];
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            callback(err);
        } else {
            //HURRAY!! We are connected. smile emoticon
            console.log('Connection established to', url);
            // Get the documents collection
            var stream = db.collection(collectionName).find({},{'userName': 1}).stream();
            stream.on("data", function(item) {arr.push(item)});
            stream.on("end", function(){callback(null, arr);});
        }
    });
};

exports.getUsersAndPass = function (callback) {
    var arr = [];
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            callback(err);
        } else {
            //HURRAY!! We are connected. smile emoticon
            console.log('Connection established to', url);
            // Get the documents collection
            var stream = db.collection(collectionName).find({},{'userName': 1, 'password': 1}).stream();
            stream.on("data", function(item) {arr.push(item)});
            stream.on("end", function(){callback(null, arr);});
        }
    });
};

/**
 * create new user in the DB
 * @param username - required username
 * @param password - required password
 * @param callback handle error or return result
 */
exports.createNewUser = function (username, password, callback) {
    var newData = {'userName': username.toString(), 'password': password.toString(), 'webPages': [], 'recommendations': []};

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            callback(err);
        } else {
            //HURRAY!! We are connected. smile emoticon
            console.log('Connection established to', url);
            // Get the documents collection
            var collection = db.collection(collectionName);
            collection.insert(newData, function (err, result) {
                if (err) {
                    console.log(err);
                    callback(err);
                } else {
                    console.log('Inserted documents into the collection.');
                    callback(null, result);
                }
            });
        }
    });
};


exports.addRecommendation = function(userId, recommendation, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            callback(err);
        } else {
            //HURRAY!! We are connected. smile emoticon
            console.log('Connection established to', url);
            //get index of current user in array
            var collection = db.collection(collectionName);
            collection.update({_id: new ObjectId(userId)}, {"$addToSet": {"recommendations": recommendation.toString()}}, function (err, result) {
                if (err) {
                    console.log(err);
                    callback(err);
                } else {
                    console.log('Added recommendation to user.');
                    callback();
                }
            });
        }
    });
};

exports.addWebPage = function(userId, webPage, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            callback(err);
        } else {
            //HURRAY!! We are connected. smile emoticon
            console.log('Connection established to', url);
            //get index of current user in array
            var collection = db.collection(collectionName);
            collection.update({_id: new ObjectId(userId)}, {"$addToSet": {'webPages': webPage.toString()}}, function (err, result) {
                if (err) {
                    console.log(err);
                    callback(err);
                } else {
                    console.log('Added web page to user.');
                    callback();
                }
            });
        }
    });
};


exports.removeRecommendation = function(userId, recommendation, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            callback(err);
        } else {
            //HURRAY!! We are connected. smile emoticon
            console.log('Connection established to', url);
            //get index of current user in array
            var collection = db.collection(collectionName);
            collection.update({_id: new ObjectId(userId)}, {$pull : {'recommendations': recommendation.toString()}}, function (err, result) {
                if (err) {
                    console.log(err);
                    callback(err);
                } else {
                    console.log('removed recommendation.');
                    callback();
                }
            });
        }
    });
};