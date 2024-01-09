const inventorymodel = require("../models/inverntorymodel");
const usermodel = require("../models/usermodel");
const mongoose = require("mongoose");
// CREATE NEW INVENTORY
const createinventorycontroller = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        const { donarEmail } = req.body;

        const user = await usermodel.findOne({ email: donarEmail });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }
        // if (inventorytype === "in" && user.role !== "donar") {
        //     return res.status(400).send({
        //         success: false,
        //         message: "Not a donor",
        //     });
        // }

        // if (inventorytype === "out" && user.role !== "hospital") {
        //     return res.status(400).send({
        //         success: false,
        //         message: "Not a hospital",
        //     });
        // }
        if (req.body.inventorytype == "out") {
            const requestedBloodGroup = req.body.bloodgroup;
            const requestedQuantityOfBlood = req.body.quantity;
            const organization = new mongoose.Types.ObjectId(req.body.userId);
            //calculate Blood Quanitity
            const totalInOfRequestedBlood = await inventorymodel.aggregate([
                {
                    $match: {
                        organization,
                        inventorytype: "in",
                        bloodgroup: requestedBloodGroup,
                    },
                },
                {
                    $group: {
                        _id: "$bloodgroup",
                        total: { $sum: "$quantity" },
                    },
                },
            ]);
            // console.log("Total In", totalInOfRequestedBlood);
            const totalIn = totalInOfRequestedBlood[0]?.total || 0;
            //calculate OUT Blood Quanitity

            const totalOutOfRequestedBloodGroup = await inventorymodel.aggregate([
                {
                    $match: {
                        organization,
                        inventorytype: "out",
                        bloodgroup: requestedBloodGroup,
                    },
                },
                {
                    $group: {
                        _id: "$bloodgroup",
                        total: { $sum: "$quantity" },
                    },
                },
            ]);
            const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

            //in & Out Calc
            const availableQuanityOfBloodGroup = totalIn - totalOut;
            //quantity validation
            if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
                return res.status(500).send({
                    success: false,
                    message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
                });
            }
            req.body.hospital = user?._id;
        } else {
            req.body.donar = user?._id;
        }

        const inventory = new inventorymodel(req.body);
        await inventory.save();

        res.status(200).send({
            success: true,
            message: "Inventory created successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};



const getinventorycontroller = async (req, res) => {
    try {
        const inventory = await inventorymodel.find({ organization: req.body.userId })
        return res.status(200).send({
            success: true,
            message: "success in getting inventory",
            inventory
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "error in getting inventoiry",
            error
        })
    }
}

const getDonarsController = async (req, res) => {
    try {
        const organization = req.body.userId;
        //find donars
        const donorId = await inventorymodel.distinct("donar", {
            organization,
        });
        console.log(donorId);
        const donars = await usermodel.find({ _id: { $in: donorId } });

        return res.status(200).send({
            success: true,
            message: "Donar Record Fetched Successfully",
            donars,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Donar records",
            error,
        });
    }
};


const getHospitalController = async (req, res) => {
    try {
        const organization = req.body.userId;
        //GET HOSPITAL ID
        const hospitalId = await inventorymodel.distinct("hospital", {
            organization,
        });
        //FIND HOSPITAL
        const hospitals = await usermodel.find({
            _id: { $in: hospitalId },
        });
        return res.status(200).send({
            success: true,
            message: "Hospitals Data Fetched Successfully",
            hospitals,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In get Hospital API",
            error,
        });
    }
};


const getOrgnaisationController = async (req, res) => {
    try {
        const donar = req.body.userId;
        const orgId = await inventorymodel.distinct("organization", { donar });
        //find org
        const organisations = await usermodel.find({
            _id: { $in: orgId },
        });
        return res.status(200).send({
            success: true,
            message: "Org Data Fetched Successfully",
            organisations,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In ORG API",
            error,
        });
    }
};


const getOrgnaisationForHospitalController = async (req, res) => {
    try {
      const hospital = req.body.userId;
      const orgId = await inventorymodel.distinct("organisation", { hospital });
      //find org
      const organisations = await usermodel.find({
        _id: { $in: orgId },
      });
      return res.status(200).send({
        success: true,
        message: "Hospital Org Data Fetched Successfully",
        organisations,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error In Hospital ORG API",
        error,
      });
    }
  };
  const getInventoryHospitalController = async (req, res) => {
    try {
      const inventory = await inventorymodel
        .find(req.body.filters)
        .populate("donar")
        .populate("hospital")
        .populate("organization")
        .sort({ createdAt: -1 });
      return res.status(200).send({
        success: true,
        messaage: "get hospital comsumer records successfully",
        inventory,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error In Get consumer Inventory",
        error,
      });
    }
  };
  
  
module.exports = {getInventoryHospitalController,getOrgnaisationForHospitalController, createinventorycontroller, getinventorycontroller, getDonarsController, getHospitalController ,getOrgnaisationController };
