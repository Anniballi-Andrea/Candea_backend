const connection = require("../data/db");

const validate = (req, res) => {
	const code = req.params.code;
	const query = `SELECT * FROM discount_codes WHERE code = ?`;
	const now = Date.now();

	connection.query(query, [code], (err, response) => {
		if (err) return res.status(500).json({ error: err, message: err.message });

		const valid_from = response[0].valid_from.getTime();
		const valid_to = response[0].valid_to
			? response[0].valid_to.getTime()
			: null;

		if (
			response.length === 0 ||
			now < valid_from ||
			(valid_to && now > valid_to)
		)
			return res
				.status(404)
				.json({ error: 404, message: "Discount Not Found" });

		res.json(response[0].value);
	});
};

module.exports = { validate };
