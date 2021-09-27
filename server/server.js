const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = express.Router();
const PORT = 4000;
let Item = require("./todo.model");

app.use(cors());
app.use(bodyParser.json());
mongoose.connect("mongodb+srv://andy:Asianboy581@cluster0.kayqx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
});

routes.route("/").get(function(req,res){
    Item.find(function(err,todos){
        if(err){
            console.log(err);
        }
        else{
            res.json(todos);
            console.log("get poggers")
        }
    });
});

routes.route('/:id').get(function(req,res){
    let id = req.params.id;
    Item.findById(id, function(err,item){
        if(err){
            console.log(err);
        }
        else{
            res.json(item)
        }
    });
});

routes.route('/delete/:id').delete(function(req,res){
    let id = req.params.id;
    Item.deleteOne({ _id: id }, err => {
        if (err){
            console.log(err);
            res.status(400).json("delete not poggers");
        }
        else{
            res.status(200).json("delete poggers");
        }
    });
});

routes.route('/add').post(function(req,res){
    let item = new Item(req.body);
    item.save((err,data) => {
        if(err){
            console.log("error on adding");
        }
        else{
            console.log("item added successfully");
            res.status(200).json({ item: "item added" });
        }
    });
});

routes.route('/edit/:id/:title/:category/:date/:done').put(function(req,res){
    Item.findByIdAndUpdate(req.params.id,
        { $set: {   item_title: req.params.title,
                    item_category: req.params.category,
                    item_date: req.params.date,
                    item_done: req.params.done
                }}, (err,item) => {
                    if(err){
                        console.log(err);
                        console.log("edit not poggers");
                    }
                    else{
                        console.log("edit is poggers");
                        res.status(200).json(item);
                    }
                });
});

routes.route('/complete/:id/:state').put(function(req,res){
    if(req.params.state == "true")
    {
        Item.findByIdAndUpdate(req.params.id, {$set: {item_done: true}}, (err,item) =>{
            if(err){
                console.log(err);
                console.log("Error on changing complete");
            }
            else{
              console.log("complete poggers");
              res.status(200).json(item);
            }
        });
    }
    else
    {
        Item.findByIdAndUpdate(req.params.id, {$set: {item_done: false}}, (err,item) =>{
            if(err){
                console.log(err);
                console.log("Error on changing complete");
            }
            else{
              console.log("uncomplete poggers");
              res.status(200).json(item);
            }
        });
    }
    
})

app.use('/todos', routes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});