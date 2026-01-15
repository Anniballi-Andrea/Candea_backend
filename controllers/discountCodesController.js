const connection = require("../data/db");

/**
 * **codeValidation**
 * Receives a discount code object.
 * It checks if it is still a valid code.
 * @param {Object} code
 * @returns {Boolean}
 */
const codeValidation = (code) => {
	const now = Date.now();
	const valid_from = code.valid_from?.getTime();
	const valid_to = code.valid_to?.getTime();

	return !((valid_from && now < valid_from) || (valid_to && now > valid_to));
};

const validate = (req, res) => {
	const code = req.params.code;
	const query = `SELECT * FROM discount_codes WHERE code = ?`;

	connection.query(query, [code], (err, response) => {
		if (err) return res.status(500).json({ error: err, message: err.message });

		if (response.length === 0 || !codeValidation(response[0]))
			return res
				.status(404)
				.json({ error: 404, message: "Discount Not Found" });

		res.json(response[0]);
	});
};

module.exports = { validate, codeValidation };
