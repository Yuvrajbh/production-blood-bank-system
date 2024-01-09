const mongoose = require("mongoose");

const inventoryschema = new mongoose.Schema({
    inventorytype: {
        type: String,
        enum: ['in', 'out'],
        required: [true, "Inventory type required"]
    },
    bloodgroup: {
        type: String,
        enum: ['A+', 'B-', 'O', "A-", "AB-", "O-",'B+','O+','AB+'],
        required: [true, "Blood group required"]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity required"]
    },
    donarEmail:{
        type:String,
        required:[true, "Donor email is required"]
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, "Organization required"]
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: function () {
            return this.inventorytype === 'out';
        }
    },
    donar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: function () {
            return this.inventorytype === 'in';
        }
    },
}, { timestamps: true });

module.exports = mongoose.model("inventory", inventoryschema);
