const index = (req, res) => {
	res.send("Index");
};

const show = (req, res) => {
	res.send("Show");
};

module.exports = { index, show };
