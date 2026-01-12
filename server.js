const express = require("express");
const cors = require("cors");

const productRouter = require("./routers/products");
const ordersRouter = require("./routers/orders");
const categoriesRouter = require("./routers/categories");

const serverError = require("./middlewares/serverError");
const notFound = require("./middlewares/notFound");

const connection = require("./data/db");

const app = express();
const PORT = process.env.PORT;

// Static files
app.use(express.static("public"));
// Body Parser
app.use(express.json());
// CORS middleware
app.use(
	cors({
		origin: "http://localhost:5173",
	}),
);

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`);
});

// Main Index Route
app.get("/", (req, res) => {
	res.send("Main Index Route");
});

app.use("/api/products", productRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/categories", categoriesRouter);

app.use(serverError);
app.use(notFound);
