const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, "role is required"],
        enum: ['admin', 'donar', 'hospital', 'organization']
    },
    name: {
        type: String,
        required: function () {

            if (this.role == "donar" || this.role == "admin")
                return true;
            else return false;
        }

    },
    hospitalname: {
        type:String,
        required: function () {

            if (this.role == "hospital")
                return true;
            else return false;
        }

    },
    organizationname: {
        type: String,
        required: function () {

            if (this.role == "organization")
                return true;
            else return false;
        }

    },


    email: {
        type: String,
        unique: true,
        required: [true, "email is required"]

    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    address: {
        type: String,
        required: [true, "address is required"]
    },
    phone: {
        type: String,
        required: [true, "phone number is required"]
    },
    website: {
        type: String 
    },
},{timestamps:true})

module.exports=mongoose.model('users',userschema)