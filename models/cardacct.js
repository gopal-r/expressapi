var mongoose = require('mongoose');
var CardAcctsSchema = new mongoose.Schema(
    {
        card_num: { type: String, required: true },
        create_date: { type: Date, default: Date.now },
        cards: { type: Array, required: true },
        feeds: [mongoose.Schema.Types.Mixed]
    }, { strict: false });


module.exports = mongoose.model('CardAccts', CardAcctsSchema);

