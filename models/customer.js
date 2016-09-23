var mongoose = require('mongoose');
var CustomersSchema = new mongoose.Schema(
    {
        screen_name: { type: String, required: true },       
        create_date: { type: Date, default: Date.now },        
        feeds: [mongoose.Schema.Types.Mixed]
    }, { strict: false });

module.exports = mongoose.model('Customers', CustomersSchema);

