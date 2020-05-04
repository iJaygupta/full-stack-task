var express = require("express");
const LocationController = require("../controllers/LocationController");

var router = express.Router();

router.get("/list", LocationController.listLocations);
router.post("/add", LocationController.addLocation);
router.put("/update", LocationController.updateLocation);
router.delete("/delete", LocationController.deleteLocation);



module.exports = router;