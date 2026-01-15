const connection = require("../data/db");

const index = (req, res) => {
	let query = `SELECT * FROM products`;
	const categoriesQuery = `SELECT categories.id, categories.name FROM categories JOIN category_product ON categories.id = category_product.category_id WHERE category_product.product_id = ?`;

	const sortBy = req.query.sortBy || "name";
	const order = req.query.order || "asc";

	switch (sortBy) {
		case "price":
			query += ` ORDER BY products.actual_price`;
			break;
		case "recent":
			query += ` ORDER BY products.created_at`;
			break;
		default:
			query += ` ORDER BY products.name`;
			break;
	}

	if (order === "desc") {
		query += ` DESC`;
	} else {
		query += ` ASC`;
	}

	connection.query(query, async (err, response) => {
		if (err) return res.status(500).json({ error: err, message: err.message });

		let list = response;

		if (req.query.name) {
			list = response.filter((item) =>
				item.name.toLowerCase().includes(req.query.name.toLowerCase()),
			);
		}

		const fullList = await Promise.all(
			list.map(async (item) => {
				const [categories] = await connection
					.promise()
					.query(categoriesQuery, [item.id]);
				return { ...item, categories };
			}),
		);

		let filtered = fullList;
		if (req.query.category) {
			const catQuery = req.query.category.toLowerCase();
			filtered = fullList.filter((product) =>
				product.categories.some(
					(category) =>
						String(category.id) === req.query.category ||
						category.name.toLowerCase() === catQuery,
				),
			);
		}

		return res.json(filtered);
	});
};

const show = (req, res) => {
	const slug = req.params.slug;
	const query = `SELECT * FROM products WHERE slug = ?`;
	const categoriesQuery = `SELECT categories.id, categories.name FROM categories JOIN category_product ON categories.id = category_product.category_id WHERE category_product.product_id = ?`;

	connection.query(query, [slug], async (err, response) => {
		if (err) return res.status(500).json({ error: err, message: err.message });

		if (response.length === 0)
			return res.status(404).json({ error: 404, message: "Product Not Found" });

		connection.query(categoriesQuery, [response[0].id], (err, categories) => {
			if (err)
				return res.status(500).json({ error: err, message: err.message });

			res.json({ ...response[0], categories });
		});
	});
};

const showByNumberSold = (req, res) => {
	const query = `SELECT SUM(order_product.quantity) as total_sold, products.id, products.name, products.img, products.description, products.slug, products.initial_price, products.actual_price, products.color, products.dimensions, products.scent, products.burn_time, products.ingredients, products.available_quantity, products.created_at, products.updated_at FROM products JOIN order_product ON products.id = order_product.product_id GROUP BY products.id ORDER BY total_sold DESC`;

	const categoriesQuery = `SELECT categories.id, categories.name FROM categories JOIN category_product ON categories.id = category_product.category_id WHERE category_product.product_id = ?`;

	connection.query(query, async (err, response) => {
		if (err) return res.status(500).json({ error: err, message: err.message });

		const fullList = await Promise.all(
			response.map(async (item) => {
				const [categories] = await connection
					.promise()
					.query(categoriesQuery, [item.id]);
				return { ...item, categories };
			}),
		);

		res.json(fullList);
	});
};

module.exports = { index, show, showByNumberSold };
