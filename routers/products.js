const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();

// Index Route
router.get("/", productsController.index);

// Show Route
router.get("/:slug", productsController.show);

module.exports = router;
