var mongoose = require('mongoose');
var TokensSchema = new mongoose.Schema(
    {
        token: { type: String, required: true },
        create_date: { type: Date, default: Date.now }
    }
);

module.exports = mongoose.model('Tokens', TokensSchema);

