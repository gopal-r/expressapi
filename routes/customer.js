var express = require('express');
var router = express.Router();
var Token = require('../models/tokens.js');
var Customers = require('../models/customer.js');


/* GET users listing. */
router.get('/', function (req, res) {
    res.send({ "STATUS": "404 NOT FOUND/IMPLEMENTED" });
});

router.post('/', function (req, res) {
    var result;
    for (var key in req.body)
        result = key;
    var creds = { screen_name: "", token: "" };
    //{ ';;;gopal;;;1234;;;': '' }
    var inpts = result.split(';;;');

    creds.screen_name = inpts[1];
    creds.token = inpts[2];

    Token.find({ "token": creds.token }, function (err, token) {
        if (token && token.length > 0) {
            if (err) res.send(err);
            Customers.find({ "screen_name": creds.screen_name }, function (err, cust) {
                if (err) res.send(err);
                res.json(cust[0]);
            }).limit(1);
        }
        else
            res.json({ "STATUS": "403 ACCESS DENIED" });
    }).limit(1);
});

module.exports = router;