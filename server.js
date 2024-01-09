const express=require("express")
const dotenv=require("dotenv")
const colors=require("colors")
const morgan=require("morgan")
const cors=require("cors")
const connectdb = require("./config/db")
dotenv.config()
const path=require("path")

//rest object
const app=express()

const PORT=process.env.PORT



// app.get("/",(req,res)=>{
//     res.status(200) //ok request
//     res.send("dscew")
// })
connectdb()
//middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use("/api/v1",require("./routes/testroutes"))
app.use("/api/v1/auth",require("./routes/authroutes"))
app.use("/api/v1/inventory",require("./routes/inventoryroutes"))
app.use("/api/v1/analytics", require("./routes/analytics"));

app.use(express.static(path.join(__dirname,'./client/build')))

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})
app.listen(PORT,()=>{
console.log(`Listeining on the port ${process.env.PORT} in ${process.env.DEV_MODE}`)
})