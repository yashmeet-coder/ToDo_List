const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose")
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var newItems = [];
var statu = false;

mongoose.connect(("mongodb+srv://yoyashmeet:yashu_123@cluster0.gpngvfu.mongodb.net/todolistDB?retryWrites=true&w=majority"||"mongodb://localhost:27017/todolistDB"),{useNewUrlParser:true})

const todolistSchema = {
    task: String
};

const ToDo = mongoose.model("ToDoList",todolistSchema)

// ToDo.deleteMany({});

// const firstTask = new ToDo({
//     task: "Eat Food"
// })
// const SecondTask = new ToDo({
//     task: "Eat Pizza"
// })
// const thirdTask = new ToDo({
//     task: "Eat Burger"
// })

// const defaultItems = [firstTask,SecondTask,thirdTask] 

// ToDo.insertMany(defaultItems,function(err){
//     if(err)
//     console.log("Error");
//     else
//     console.log("Successfully added");
// })

app.get("/", function(req, res) {
    var options = { weekday: 'long', month: 'long', day: 'numeric' };
    var today = new Date();
    var day = today.toLocaleDateString("en-US", options);
    ToDo.find({},function(err,results){
        res.render("list", { kindOfDay: day, newItems: results });
    })
})

app.post("/delete",function(req,res){
    ToDo.findByIdAndRemove(req.body.deletedTask,function(err){
        if(!err)
        console.log("removed");
    })
    res.redirect("/")
})

app.post("/", function(req, res) {

    if(req.body.nextTask.length!=0){
    const newTask = new ToDo({
        task: req.body.nextTask
    })
    ToDo.create(newTask,function(err){
        if(!err)
        console.log("Added");
    })
    res.redirect("/");
}
res.redirect("/")})

app.listen(3000, () => {
    console.log("Server started on port 3000");
})