const express = require("express");
const cors = require("cors");

const productRouter = require("./routers/products");
const ordersRouter = require("./routers/orders");
const categoriesRouter = require("./routers/categories");
const discountRouter = require("./routers/discountCodes");

const serverError = require("./middlewares/serverError");
const notFound = require("./middlewares/notFound");

const connection = require("./data/db");

const app = express();
const BACKEND_PORT = process.env.BACKEND_PORT;
const FRONTEND_HOST = process.env.FRONTEND_HOST;
const FRONTEND_PORT = process.env.FRONTEND_PORT;

// Static files
app.use(express.static("public"));
// Body Parser
app.use(express.json());
// CORS middleware
app.use(
	cors({
		origin: `http://${FRONTEND_HOST}:${FRONTEND_PORT}`,
	}),
);

app.listen(BACKEND_PORT, () => {
	console.log(`Listening on http://localhost:${BACKEND_PORT}`);
});

// Main Index Route
app.get("/", (req, res) => {
	res.send("Main Index Route");
});

// Routes
app.use("/api/products", productRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/discount", discountRouter);

// Middleware
app.use(serverError);
app.use(notFound);
