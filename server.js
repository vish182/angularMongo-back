const express = require("express")
const app = express()
const connectDB = require("./config/db")
const userRoutes = require("./routes/api/user")
const cors = require('cors');
const bodyParser = require('body-parser');


// middleware
app.use(express.json())
app.use(bodyParser.json());
app.use(cors());


app.get("/" , (req , res)=>{
    res.send("Hello world")

})

// database connection
connectDB()


// API
app.use("/users" ,  userRoutes) 

const PORT = 8000 || process.env.PORT
app.listen(PORT ,  ()=>{
    console.log(`Server has started on ${PORT}`)
})