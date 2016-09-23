var express = require('express');
var router = express.Router();

var Token = require('../models/tokens.js');
var Logins = require('../models/logins.js');


/* GET users listing. */
router.get('/', function (req, res) {
    res.send({ "STATUS": "404 NOT FOUND/IMPLEMENTED" });
});

router.post('/', function (req, res) {
    var result;
    for (var key in req.body) 
         result = key; 
    var creds = { screen_name: "", PIN_hash: "" };
    //{ ';;;gopal;;;1234;;;': '' }
    var inpts = result.split(';;;');     

    creds.screen_name = inpts[1];
    creds.PIN_hash = inpts[2];
    //
    Logins.find(creds, function (err, logins) {
        if (err) res.send(err);
        //insert token
        if (logins && logins.length>0) {
            var tkn = (Math.random() * 100000).toString().split('.')[0] + '65d61b';
            Token.create({ "token": tkn }, function (err) {
                if (err) res.send(err);
                res.json({ "token": tkn });
            });            
        }
        else
            res.json({ "STATUS": "403 ACCESS DENIED" });
    }).limit(1);  
});

module.exports = router;