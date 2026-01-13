const connection = require("../data/db");

const validate = (req, res) => {
	const code = req.params.code;
	const query = `SELECT * FROM discount_codes`;

	connection.query(query, (err, response) => {
		if (err) return res.status(500).json({ error: err, message: err.message });

		res.send("ciao");
	});
};

module.exports = { validate };
