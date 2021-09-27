const mongoose = require('mongoose')
const Schema = mongoose.Schema

const date = new Date();

let Item = new Schema({
    item_title: {
        type: String
    },
    item_category: {
        type: String
    },
    item_done:{
        type: Boolean
    },  
    item_date:{
        type: String,
    }
})

module.exports = mongoose.model('Item', Item); 