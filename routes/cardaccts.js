var express = require('express');
var router = express.Router();
var Token = require('../models/tokens.js');
var Customers = require('../models/customer.js');
var CardAccts = require('../models/cardacct.js');

/* GET users listing. */
router.get('/', function (req, res) {
    res.json({ "STATUS": "403 ACCESS DENIED" });
});

router.post('/:indx', function (req, res) {
    var result;
    for (var key in req.body)
        result = key;
    var creds = { screen_name: "", token: "" };
    //{ ';;;gopal;;;1234;;;': '' }
    var inpts = result.split(';;;');

    creds.screen_name = inpts[1];
    creds.token = inpts[2];   

    Token.find({ "token": creds.token }, function (err, token) {
        if (err) res.send(err);
        if (token && token.length > 0) {
            Customers.find({ "screen_name": creds.screen_name }, { cards: 1 }, function (err, customer) {
                if (err) res.send(err);
                if (customer && customer.length > 0) {
                    CardAccts.find({ "card_num": customer[0].toJSON().cards[req.params.indx].card_num }, function (err, cardacct) {
                        if (err) res.send(err);
                        res.json(cardacct[0]);
                    }).limit(1);
                }
            }).limit(1);
        }
        else
            res.send({ "STATUS": "403 ACCESS DENIED" });    
    }).limit(1);  
});

module.exports = router;