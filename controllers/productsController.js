const connection = require("../data/db");

const index = (req, res) => {
	const query = `SELECT * FROM products`;
	const categoriesQuery = `SELECT categories.id, categories.name FROM categories JOIN category_product ON categories.id = category_product.category_id WHERE category_product.product_id = ?`;

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

	connection.query(query, [slug], (err, response) => {
		if (err) return res.status(500).json({ error: err, message: err.message });

		if (response.length === 0)
			return res.status(404).json({ error: 404, message: "Product Not Found" });

		res.json(response[0]);
	});
};

module.exports = { index, show };
