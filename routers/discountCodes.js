const express = require("express");
const discountCodesController = require("../controllers/discountCodesController");
const router = express.Router();

// Code Validation Route
router.get("/:code", discountCodesController.validate);

module.exports = router;
