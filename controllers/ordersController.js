const connection = require("../data/db");

const show = (req, res) => {
	const id = Number(req.params.id);
	res.send("Show");
};

const store = (req, res) => {
	res.send("Store");
};

module.exports = { show, store };
