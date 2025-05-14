
const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
    title: {
        type: String,
        required : true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true 
    },
    published_year: {
        type: Number,
        required: true 
    },
    image: {
        type: String,
        required: true 
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const bestSellerModel = mongoose.model("bestsellerbooks", booksSchema);

module.exports = bestSellerModel

