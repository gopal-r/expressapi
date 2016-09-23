var mongoose = require('mongoose');
var LoginsSchema = new mongoose.Schema(
    {
        screen_name: { type: String, required: true },
        PIN_hash: { type: String, required: true },
        create_date: { type: Date, default: Date.now }
    }
);

module.exports = mongoose.model('Logins', LoginsSchema);


