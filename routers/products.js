const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();

// Index Route
router.get("/", productsController.index);

// Show products by number sold Route
router.get("/bySold", productsController.showByNumberSold);

// Show Route
router.get("/:slug", productsController.show);

module.exports = router;
