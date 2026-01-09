const connection = require("../data/db");

const show = (req, res) => {
	res.send("Show");
};

const store = (req, res) => {
	res.send("Store");
};

module.exports = { show, store };
