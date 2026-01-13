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
	const {
		first_name,
		last_name,
		total_amount,
		email,
		phone_number,
		city,
		province,
		street,
		street_number,
		zip_code,
		free_shipping,
		shipment_code,
		discount_code_id,
		products,
	} = req.body;

	if (
		!first_name ||
		!last_name ||
		!total_amount ||
		!email ||
		!phone_number ||
		!city ||
		!province ||
		!street ||
		!zip_code ||
		!shipment_code ||
		!products
	) {
		return res
			.status(400)
			.json({ error: true, message: "Something is wrong with the input" });
	}

	const orderQuery = `INSERT INTO orders (first_name, last_name, total_amount, email, phone_number, city, province, street, street_number, zip_code, free_shipping, shipment_code, discount_code_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

	const productQuery = `INSERT INTO order_product (order_id, product_id, quantity) VALUES (?, ?, ?);`;

	const updateQuantityQuery = `UPDATE products SET available_quantity = available_quantity - ? WHERE id = ? AND available_quantity - ? > 0`;

	connection.query(
		orderQuery,
		[
			first_name,
			last_name,
			total_amount,
			email,
			phone_number,
			city,
			province,
			street,
			street_number,
			zip_code,
			free_shipping,
			shipment_code,
			discount_code_id,
		],
		(err, orderResponse) => {
			if (err)
				return res.status(500).json({ error: err, message: err.message });

			products.forEach((product) => {
				connection.query(
					productQuery,
					[orderResponse.insertId, product.id, product.quantity],
					(err, productResponse) => {
						if (err)
							return res.status(500).json({ error: err, message: err.message });
					},
				);

				connection.query(
					updateQuantityQuery,
					[product.quantity, product.id, product.quantity],
					(err, updateQuantityQuery) => {
						if (err)
							return res.status(500).json({ error: err, message: err.message });

						if (updateQuantityQuery.affectedRows === 0)
							return res.sendStatus(500);
					},
				);
			});

			res.sendStatus(201);
		},
	);
};

module.exports = { show, store };
