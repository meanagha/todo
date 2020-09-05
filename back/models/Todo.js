const mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({

    name: {
        type: String,
    },

});
module.exports = mongoose.model('Todo', TodoSchema);

