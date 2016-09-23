# Express Api

This app runs a 4 tier micro service on the MEAN stack.

Once the repo is cloned, use the following command from the directory 
(assuming the nodeJS is installed,
npm install is done for all dependencies,
mongoDB is initialized):
-------------
node app.js


Here is the script to initialize and populate the mongo DB
-------------
use aexp;
db.tokens.insert({ "token" : "4091165d61b"});

db.customers.insert({ "first_name" : "Gopal", "last_name" : "Rangaswamy", "screen_name" : "gopal", "phones" : [ { "num" : "703-599-2480", "type" : "Mobile", "primary" : "yes" }, { "num" : "954-384-3308" } ], "addresses" : [ { "addrs1" : "7020 NW 66 ST", "city" : "Parkland", "zip" : "33067", "state" : "FL", "type" : "home" }, { "addrs1" : "777 Amex Av", "city" : "Plantation", "zip" : "33001", "state" : "FL" } ], "cards" : [ { "card_num" : "37001", "link" : "http://www.xyz.com/37001" }, { "card_num" : "37005", "link" : "http://www.xyz.com/37005" } ] });

db.logins.insert({ "screen_name" : "gopal", "PIN_hash" : "1234" });

db.cardaccts.insert({ "card_num" : "37001", "balance_due" : 743.88, "due_date" : "10/19/2016", "last_payment" : "300.22" });

db.cardaccts.insert({  "card_num" : "37005", "balance_due" : 0, "last_payment" : "1009.00" });


