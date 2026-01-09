const connection = require("../data/db");

const show = (req, res) => {
	const id = Number(req.params.id);
	const query = `SELECT * FROM orders WHERE id = ?`;

	connection.query(query, [id], (err, response) => {
		if (err) return res.status(500).json({ error: err, message: err.message });

		if (response.length === 0)
			return res.status(404).json({ error: 404, message: "Order Not Found" });

		res.json(response[0]);
	});
};

const store = (req, res) => {
	const { data } = req.body;

	if (!data) {
		return res
			.status(400)
			.json({ error: true, message: "Something is wrong with the input" });
	}

	res.send(`Stored: ${data}`);
};

module.exports = { show, store };
