const connection = require("../data/db");

const index = (req, res) => {
	const query = `SELECT * FROM products`;
	connection.query(query, (err, response) => {
		if (err) return res.status(500).json({ error: err, message: err.message });

		let list = response;

		if (req.query.name) {
			list = list.filter((item) =>
				item.name.toLowerCase().includes(req.query.name.toLowerCase()),
			);
		}

		if (req.query.category) {
		}

		res.json(list);
	});
};

const show = (req, res) => {
	const id = Number(req.params.id);
	const query = `SELECT * FROM products WHERE id = ?`;

	connection.query(query, [id], (err, response) => {
		if (err) return res.status(500).json({ error: err, message: err.message });

		if (response.length === 0)
			return res.status(404).json({ error: 404, message: "Product Not Found" });

		res.json(response[0]);
	});
};

module.exports = { index, show };
