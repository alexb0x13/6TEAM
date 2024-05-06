//setup is similar to how we use default tags in html
const express = require("express")
const Course = require("./models/course")
var cors = require("cors")
//const bodyParser = require('body-parser')
const jwt = require('jwt-simple')
const User = require("./models/user")

const app = express();

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

app.use(cors())

//Middleware that parses HTTP requests with JSON body
app.use(express.json());

app.use(express.static("public"));

const router = express.Router()
const secret = "supersecret"

//creating a new user
router.post("/user", async (req, res) =>{
    if (!req.body.username || !req.body.password){
        res.status(400).json({error: "Missing username or password"})
    }

    const newUser = await new User ({
        username: req.body.username,
        password: req.body.password,
        status: req.body.status
    })

    try{
        await newUser.save()
        console.log(newUser)
        res.sendStatus(201) //created
    }
    catch(err){
        res.status(400).send(err)
    }
})

//authenticate or login
//post request - reason why is because when you login you are creating what we call a new 'session'

router.post("/auth", async (req, res) => {
    if(!req.body.username || !req.body.password){
        res.status(400).json({error: "missing username or password"})
        return
    }
    //try to find the username in the database, then see if it matches with a username and password
    //await finding a user
   let user = await User.findOne({username : req.body.username})

        //connection or server error
    if(!user){
            res.status(401).json({error:"Bad username"})
        }
        //check if user's password matches the request's password
        else{
            if(user.password != req.body.password){
                res.status(401).json({error: "Bad password"})
            }
            //succesfull login
            else{
                //**create a token that is encoded with the jwt library, and send back the username...**
                //we also will end back as part of the token that you are current authorized
                //we could do this with a bloolean or a number value i.e if auth = 0 you are not authorized, if auth
                // equals 1 you are authorized
                 
                username2 =  user.username
                const token = jwt.encode({username: user.username}, secret)
                const auth = 1

                //respond with the token 
                res.json({
                    username2,
                    token:token,
                    auth:auth
                })
            }
        }
    })

    //check status of user with a valid token, see if it matches the front end token
    router.get("/status", async(req, res) =>{
        if(!req.headers["x-auth"]){
            return res.status(401).json({error: "Missing x-auth"})
        }

        //if x-auth contains the token 
        const token = req.headers["x-auth"]
        try{
            const decoded = jwt.decode(token, secret)

            //send backk all username and status fields to the user or front end
            let users = User.find({}, "username status")
            res.json(users)
        }
        catch(ex){
            res.status(401).json({error: "invalid JWT token"})
        }
    })


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
//app.listen(3000);