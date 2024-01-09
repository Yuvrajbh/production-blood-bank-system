const mongoose=require("mongoose")
const colors=require("colors")

const connectdb=async()=>{
try {
    await mongoose.connect("mongodb://localhost:27017/Bloodbank")
    console.log("connected to database")
} catch (error) {
     console.log(error)
}
}
module.exports=connectdb