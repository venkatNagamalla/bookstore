
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
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
    price:{
        type: Number,
        required: true
    }
})


const cartModel = mongoose.model("cart", cartSchema)

module.exports = cartModel