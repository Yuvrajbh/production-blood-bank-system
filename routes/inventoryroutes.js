const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const { createinventorycontroller, getinventorycontroller, getDonarsController, getHospitalController, getOrgnaisationController, getOrgnaisationForHospitalController, getInventoryHospitalController } = require("../controllers/inventorycontroller");

const router = express.Router();

// ADD INVENTORY || POST
router.post("/create-inventory", authmiddleware, createinventorycontroller);

// GET BLOOD INVENTORY || GET
router.get("/get-inventory", authmiddleware, getinventorycontroller);

router.post("/get-inventory-hospital", authmiddleware, getInventoryHospitalController);


router.get("/get-donars", authmiddleware, getDonarsController);


router.get("/get-hospitals", authmiddleware, getHospitalController);

router.get("/get-orgnaisation", authmiddleware, getOrgnaisationController);

router.get("/get-orgnaisation-for-hospital", authmiddleware, getOrgnaisationForHospitalController);

module.exports = router;
