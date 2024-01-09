const testcontroller=(req,res)=>{
    res.status(200).send({
        success:true,
        message:"test route"
    })
}

module.exports={testcontroller}