const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const bestSellerModel = require("./models/bestseller")
const booksModel = require("./models/books")
const cartModel = require("./models/cart")

const MongodbUrl = process.env.MONGO_URL
mongoose.connect(MongodbUrl,{useNewUrlParser: true, useUnifiedTopology: true});

app.use(cors())
app.use(express.json())

// best-seller books
app.get("/best-sellers", async (req,res) => {
     try{
        const books = await bestSellerModel.find({})
        res.send(books)
     }
     catch(err) {
         res.status(500).json({ message: err.message });
     }
})

app.get("/best-sellers/:bookId", async(req,res)=>{
    const {bookId}  = (req.params)
    try{
        const book = await bestSellerModel.findOne({_id: bookId});
        res.send(book)
    }    
    catch(err) {
        res.status(500).json({message: err.message});
    }
})

app.post("/best-sellers/addbook", async(req,res) => {
    const {title,author,genre,published_year,isbn,image,desc,price} = req.body;

    try{
        await bestSellerModel.create({
            title,
            author,
            genre,
            published_year,
            isbn,
            image,
            desc,
            price
        })
        res.json({message: "Book Added Successfully"});
    }
    catch(err){
        res.status(500).json({message:err.message})
    }

})

app.delete("/best-sellers/:bookId", async(req,res)=>{
    const {bookId} = req.params;
    
    try{
       await bestSellerModel.findOneAndDelete({_id:bookId})
       res.json({message: "Book Deleted Successfully"});
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
  
})

// books
app.get("/books", async(req,res) => {
    try{
        const books = await booksModel.find({})
        res.send(books)
    }
    catch(err){
        res.status(500).json({message: err.message});
        }
})

app.get("/books/:bookId", async(req,res) => {
    const {bookId} = req.params;
    try{
        const book = await booksModel.findOne({_id: bookId})
        res.send(book)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

app.post("/books/addbook", async(req,res)=>{
        const {title,author,genre,published_year,isbn,image,desc,price} = req.body;

        try{
            await booksModel.create({
                title,
                author,
                genre,
                published_year,
                isbn,
                image,
                desc,
                price
            })
            res.json({message: "Book Added Successfully"})
        }
        catch(err){
            res.status(500).json({message: err.message})
        }

})

app.delete("/books/:bookId", async(req,res) => {
    const {bookId} = req.params 

    try{
        await booksModel.findOneAndDelete({_id: bookId})
        res.json({message: "Book Deleted Successfully"});
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

// cart
app.get("/cart", async(req,res) => {
    try{
        const books = await cartModel.find({})
        res.send(books)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

app.post("/cart/addbook", async(req,res) => {
    const {title,author,genre,published_year,isbn,image,desc,price} = req.body;

    try{
        await cartModel.create({
            title,
            author,
            genre,
            published_year,
            isbn,
            image,
            desc,
            price
        })
        res.json({message: "Book Added To Cart"})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }

})

app.delete("/cart/:bookId", async(req,res)=>{
    const {bookId} = req.params;

    try{
        await cartModel.findOneAndDelete({_id: bookId});
        res.json({message:"Book Deleted Successfully"})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server Starting at ${PORT}`);
})
