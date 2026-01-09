const express = require("express");
const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`);
});

// Main Index Route
app.get("/", (req, res) => {
	res.send("Main Index Route");
});
