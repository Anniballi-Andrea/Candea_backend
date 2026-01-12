const express = require("express");
const categoriesController = require("../controllers/categoriesController");
const router = express.Router();

// Index Route
router.get("/", categoriesController.index);

// Show Route
router.get("/:id", categoriesController.show);

module.exports = router;
