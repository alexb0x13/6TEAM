//setup is similar to how we use default tags in html
const express = require("express")
const Course = require("./models/course")
var cors = require("cors")

const app = express();
app.use(cors())

//Middleware that parses HTTP requests with JSON body
app.use(express.json());

const router = express.Router()

//get all the courses in a database
router.get("/courses", async(req, res) =>{
    try{
        const courses = await Course.find({ })
        res.send(courses)
        console.log(courses)
    } 
    catch (err) {
        console.log(err)
    }
})

    //grab a single course in the database
router.get("/courses/:id", async (req, res) => {
    try{
        const course = await Course.findById(req.params.id)
        res.json(course)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

router.post("/courses", async(req, res) => {
    try{
        const course = await new Course(req.body)
        await course.save()
        res.status(201).json(course)
        console.log(course)
    }
    catch(err){
        res.status(400).send(err)
    }
})

//update is to update an existing record/resource/databse entry ... it uses a "put" request
router.put("/courses/:id", async (req, res) => {
    //first we need to find and update the course the frontend wants us to update
    // to do this we need to request the id of the song from the request
    // then find it in the database and update it 

    try {
        const course = req.body
        await Course.updateOne({_id: req.params.id}, course)
        console.log(course)
        res.sendStatus(204)
    }
    catch(err){
        res.status(400).send(err)
    }
})

router.delete("/courses/:id", async (req, res)=> {
    //method in mongoose/mongo to delete a single instance of a song or object
    try{
        const course = await Course.findById(req.params.id)
        await Course.deleteOne({_id: course._id})
        res.sendStatus(204)
    }
    catch(err){
        res.status(400).send(err)
    }

})

//all requests that usually use an api start with /api...  so the url would be localhost:3000
app.use("/api", router)
app.listen(3000);