const connection = require("../data/db");

const index = (req, res) => {
	res.send("Index");
};

const show = (req, res) => {
	const id = Number(req.params.id);
	res.send("Show");
};

module.exports = { index, show };
