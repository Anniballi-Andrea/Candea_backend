const express = require("express");

const productRouter = require("./routers/products");
const ordersRouter = require("./routers/orders");

const connection = require("./data/db");

const app = express();
const PORT = process.env.PORT;

// Static files
app.use(express.static("public"));
// Body Parser
app.use(express.json());

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`);
});

// Main Index Route
app.get("/", (req, res) => {
	res.send("Main Index Route");
});

app.use("/api/products", productRouter);
app.use("/api/orders", ordersRouter);
