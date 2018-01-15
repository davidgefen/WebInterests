//import external libraries
var express = require('express');
var auth = require('basic-auth');
var dbHandle = require('./DBHandle.js');
var dbInit = require('./dataHandler.js');
var http = require('http');

//run external libraries
var app = express();

//define global configurations
var users = [];
var collectionName = "Users";

function updateUsers(){
    function getDataCallback(err, result) {
        if(err){
            res.status(500);
        } else {
            users = result;
        }
    }
    dbHandle.getUsersAndPass(getDataCallback);//get users from database
}

/**
 * run server on available port or port 3000
 */
app.listen(process.env.VCAP_APP_PORT || 3000, function () {
    dbInit.createCollection(collectionName);//initiate database
    console.log('App is up and running');
    updateUsers();
});

/**
 * makes sure authentication was successful before use of the service is allowed
 */
app.use("/safe", function (req, res, next) {
    //get credentials the user entered
    var credentials = auth(req);

    if (!credentials) {
        //authentication was unsuccessful
        res.setHeader('WWW-Authenticate', 'Basic realm="Authorization is required in order to access"');
        return res.status(401).send('Unauthorized access!');
    } else {
        for (var i = 0; i < users.length; ++i) {
            if (users[i].userName == credentials.name && users[i].password == credentials.pass){
                //access was granted so go to required site
                res.cookie('userN', credentials.name);
                console.log("access granted");
                return next();
            }
            else if(i == users.length - 1){
                //authentication was unsuccessful
                res.setHeader('WWW-Authenticate', 'Basic realm="Authorization is required in order to access"');
                return res.status(401).send('Unauthorized access!');
            }
        }
    }
});

/**
 * returns index.html for get on root URL and creates new user for new login
 */
app.get('/safe', function (req, res) {
    function initialCallback(err, result) {
        if(err){
            res.status(500);
        } else {
            res.cookie('userId', result['insertedIds'][0].toString());
            res.status(200).sendfile('index.html');
        }
    }
    // dbHandle.createNewUser(initialCallback);
    res.status(200).sendfile('index.html');
});

/**
 * return main.css
 */
app.get('/main.css', function (req, res) {
    res.status(200).sendfile('main.css');
});

/**
 * return styles/bootstrap.min.css
 */
app.get('/styles/bootstrap.min.css', function (req, res) {
    res.status(200).sendfile('styles/bootstrap.min.css');
});

/**
 * return styles/jquery-ui.css
 */
app.get('/styles/jquery-ui.css', function (req, res) {
    res.status(200).sendfile('styles/jquery-ui.css');
});

/**
 * return styles/app.css
 */
app.get('/styles/app.css', function (req, res) {
    res.status(200).sendfile('styles/app.css');
});

/**
 * return scripts/angular.js
 */
app.get('/scripts/angular.js', function (req, res) {
    res.status(200).sendfile('scripts/angular.js');
});

/**
 * return scripts/jquery-2.1.4.min.js
 */
app.get('/scripts/jquery-2.1.4.min.js', function (req, res) {
    res.status(200).sendfile('scripts/jquery-2.1.4.min.js');
});

/**
 * return scripts/jquery-ui.js
 */
app.get('/scripts/jquery-ui.js', function (req, res) {
    res.status(200).sendfile('scripts/jquery-ui.js');
});

/**
 * return scripts/bootstrap.min.js
 */
app.get('/scripts/bootstrap.min.js', function (req, res) {
    res.status(200).sendfile('scripts/bootstrap.min.js');
});

/**
 * return scripts/fakeServer.js
 */
app.get('/scripts/fakeServer.js', function (req, res) {
    res.status(200).sendfile('scripts/fakeServer.js');
});

/**
 * return scripts/app.js
 */
app.get('/scripts/app.js', function (req, res) {
    res.status(200).sendfile('scripts/app.js');
});

/**
 * return images/background.jpg
 */
app.get('/images/background.jpg', function (req, res) {
    res.status(200).sendfile('images/background.jpg');
});

/**
 * return images/false.png
 */
app.get('/images/false.png', function (req, res) {
    res.status(200).sendfile('images/false.png');
});

/**
 * return images/Logo.png
 */
app.get('/images/Logo.png', function (req, res) {
    res.status(200).sendfile('images/Logo.png');
});

/**
 * return images/loading.gif
 */
app.get('/images/loading.gif', function (req, res) {
    res.status(200).sendfile('images/loading.gif');
});

/**
 * return jquery-2.2.3.min.js
 */
app.get('/jquery-2.2.3.min.js', function (req, res) {
    res.status(200).sendfile('jquery-2.2.3.min.js');
});

/**
 * return SignUp.js
 */
app.get('/SignUp.js', function (req, res) {
    res.status(200).sendfile('SignUp.js');
});

/**
 * return loginPage.js
 */
app.get('/loginPage.js', function (req, res) {
    res.status(200).sendfile('loginPage.js');
});

/**
 * returns SignUp.html for get on root URL and creates new user for new login
 */
app.get('/', function (req, res) {
    // function initialCallback(err, result) {
    //     if(err){
    //         res.status(500);
    //     } else {
    //         res.status(200).sendfile('login.html');
    //     }
    // }
    // // dbHandle.createNewUser(initialCallback);
    res.status(200).sendfile('login.html');
});

/**
 * return SignUp.html
 */
app.get('/SignUp', function (req, res) {
    res.status(200).sendfile('SignUp.html');
});

/**
 * return data on users from mongodb
 */
app.get('/safe/getUserData', function (req, res) {
    function getDataCallback(err, result) {
        if(err){
            res.status(500);
        } else {
            // if(result.toString() == "[]"){
            //     res.status(401);
            // }
            res.status(200).send(result);
        }
    }
    dbHandle.getUserData(req.query.username, getDataCallback);
});

/**
 * return usernames from mongodb
 */
app.get('/safe/getUsers', function (req, res) {
    function getDataCallback(err, result) {
        if(err){
            res.status(500);
        } else {
            res.status(200).send(result);
        }
    }
    dbHandle.getUsers(getDataCallback);
});

/**
 * create new user
 */
app.get('/newUser', function (req, res){
    function newUserCallback(err, result) {
        if(err){
            return res.status(500);
        } else {
            updateUsers();
            return res.status(200).send(result['insertedIds'][0].toString());
        }
    }
    function getDataCallback(err, result) {
        if(err){
            return res.status(500);
        } else {
            for (var i = 0; i < result.length; i++){
                if (result[i].userName == req.query.username) {
                    return res.status(422).send("user already exists");
                } else if(i == result.length - 1){
                    dbHandle.createNewUser(req.query.username, req.query.password, newUserCallback);
                }
            }
        }
    }
    dbHandle.getUsers(getDataCallback);
});


/**
 * add a new recommendation to a User
 */
app.get('/safe/addRecommendation', function (req, res) {
    function addRecommendationCallback(err) {
        if(err){
            res.status(500);
        } else {
            res.status(200).send("SUCCESS");
        }
    }
    dbHandle.addRecommendation(req.query.userId, req.query.recommendation, addRecommendationCallback);
});


/**
 * add a new web page to a User
 */
app.get('/safe/addWebPage', function (req, res) {
    function addRecommendationCallback(err) {
        if(err){
            res.status(500).send("FAIL");
        } else {
            console.log("ended input");
            res.status(200);
        }
    }
    function addWebPageCallback(err) {
        if(err){
            res.status(500).send("FAIL");
        } else {
            console.log("ended input");
            res.status(200);
        }
    }
    function removeRecommendationCallback(err) {
        if(err){
            res.status(500).send("FAIL");
        } else {
            console.log("ended input");
            res.status(200).send("SUCCESS");
        }
    }
    var options = {
        host: 'webcrawlerapp.mybluemix.net',
        path: '/servlet/WebCrawlerAccess?url=' + req.query.webPage
    };

    var callback = function(response) {
        var str = '';
        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });
        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            console.log(str);
            var arr = JSON.parse(str);
            for (var i = 0; i < arr[1].length; ++i){
                dbHandle.addRecommendation(req.query.userId, arr[1][i], addRecommendationCallback);
                if (i + 1 == arr[1].length){
                    dbHandle.addWebPage(req.query.userId, req.query.webPage, addWebPageCallback);
                    dbHandle.removeRecommendation(req.query.userId, req.query.webPage, removeRecommendationCallback);
                }
            }
        });
    };

    http.request(options, callback).end();
});
