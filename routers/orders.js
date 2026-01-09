const express = require("express");
const ordersController = require("../controllers/ordersController");
const router = express.Router();

// Show Route
router.get("/:id", ordersController.show);

// Store Route
router.post("/", ordersController.store);

module.exports = router;
