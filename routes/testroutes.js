const express=require("express")
const { testcontroller } = require("../controllers/testcontroller")

const router=express.Router()

router.get("/test",testcontroller)

module.exports=router