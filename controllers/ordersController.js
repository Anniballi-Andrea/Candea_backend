const connection = require("../data/db");
const transport = require("../data/mailer");
const { codeValidation } = require("./discountCodesController");

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

/**
 * **nameValidation**
 * It checks if the first and last name use only latin characters,
 * using a regular expression.
 * @param {String} first_name
 * @param {String} last_name
 * @returns {Boolean}
 */
const nameValidation = (first_name, last_name) =>
	/[a-zA-Z]+/.test(first_name) && /[a-zA-Z]+/.test(last_name);

/**
 * **emailValidation**
 * It checks if the string is a valid email address,
 * using a regular expression.
 * @param {String} email
 * @returns {Boolean}
 */
const emailValidation = (email) =>
	/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm.test(email);

/**
 * **PhoneNumberValidation**
 * It checks if the string is a valid phone number,
 * using a regular expression.
 * @param {String} phone
 * @returns {Boolean}
 */
const phoneNumberValidation = (phone) =>
	/(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/g.test(
		phone,
	);

/**
 * **generateTotalAmount**
 * Takes an array of products (with properties id and quantity),
 * makes a query to obtain the actual price of the products and
 * returns the total amount.
 * @param {Array} products
 * @returns {Float}
 */
const generateTotalAmount = async (products) => {
	const query = `SELECT actual_price FROM products WHERE id = ?`;

	const list = await Promise.all(
		products.map(
			(item) =>
				new Promise((resolve, reject) => {
					connection.query(query, [item.id], (err, response) => {
						if (err) return reject(err);

						const price = response?.[0] ? Number(response[0].actual_price) : 0;

						resolve(price * Number(item.quantity));
					});
				}),
		),
	);

	return list.reduce((sum, current) => sum + current, 0);
};

/**
 * **applyDiscountCode**
 * Takes an amount and a discount code id,
 * makes a query to obtain the discount value and
 * returns the final amount after applying the discount.
 * @param {Float} amount
 * @param {Integer} discount_code_id
 * @returns
 */
const applyDiscountCode = (amount, discount_code_id) => {
	if (!discount_code_id) return Promise.resolve(amount);

	const query = `SELECT discount_codes.value FROM discount_codes WHERE id = ?`;

	return new Promise((resolve, reject) => {
		connection.query(query, [discount_code_id], (err, response) => {
			if (err) return reject(err);

			const value = response?.[0]?.value ? Number(response[0].value) : 0;
			const result = amount - (amount * value) / 100;
			resolve(result);
		});
	});
};

/**
 * **applyFreeShipping**
 * Takes an amount and checks if it is eligible for free shipping.
 * If it is, it returns the amount unchanged.
 * If it is not, it adds a shipping fee to the amount.
 * @param {Float} amount
 * @returns {Array}
 */
const applyFreeShipping = (amount) => {
	const min_free_shipping = 90.0;
	const shipping_fee = 5.0;

	let free_shipping = 0;

	if (amount > min_free_shipping) {
		free_shipping = 1;
	} else {
		free_shipping = 0;
		amount += shipping_fee;
	}
	return [free_shipping, amount];
};

/**
 * **generateShipmentCode**
 * Generates a mock shipment code
 * @returns {String}
 */
const generateShipmentCode = () => {
	let result = "";
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	const charactersLength = characters.length;

	for (let i = 0; i < 10; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
};

const sendEmails = async (email) => {
	try {
		await transport.sendMail({
			from: '"Candea" <noreply@candea.com>',
			to: email,
			subject: "Ordine confermato - Candea",
			html: `
        <h2>Ordine confermato</h2>
        <p>Il tuo ordine è stato confermato!</p>
      `,
		});

		// wait because of the mailtrap rate limit
		await new Promise((resolve) => {
			setTimeout(resolve, 10000);
		});

		await transport.sendMail({
			from: '"Candea" <noreply@candea.com>',
			to: "email@candea.com",
			subject: "Ordine confermato - Candea",
			html: `
        <h2>Ordine confermato</h2>
        <p>Il tuo ordine è stato confermato!</p>
      `,
		});
	} catch (error) {
		console.error("Error sending emails: ", error);
	}
};

const store = async (req, res) => {
	const {
		first_name,
		last_name,
		email,
		phone_number,
		city,
		province,
		street,
		street_number,
		zip_code,
		discount_code_id,
		products,
	} = req.body;

	if (
		!first_name ||
		!last_name ||
		!email ||
		!phone_number ||
		!city ||
		!province ||
		!street ||
		!zip_code ||
		!products ||
		products.length === 0
	) {
		return res
			.status(400)
			.json({ error: true, message: "Something is wrong with the input" });
	}

	if (discount_code_id && !codeValidation(discount_code_id)) {
		return res
			.status(400)
			.json({ error: true, message: "Wrong discount code" });
	}

	if (!nameValidation(first_name, last_name)) {
		return res.status(400).json({ error: true, message: "Bad name input" });
	}

	if (!emailValidation(email)) {
		return res.status(400).json({ error: true, message: "Bad email input" });
	}

	if (!phoneNumberValidation(phone_number)) {
		return res
			.status(400)
			.json({ error: true, message: "Bad phone number input" });
	}

	let amount = await generateTotalAmount(products);

	amount = await applyDiscountCode(amount, discount_code_id);

	const [free_shipping, total_amount] = applyFreeShipping(amount);

	const shipment_code = generateShipmentCode();

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
		async (err, orderResponse) => {
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

						// this doesn't actually work, TODO fix
						// this happens after the last res.send()
						// gives error in the terminal if the quantity available is not enough
						// if (updateQuantityQuery.affectedRows === 0)
						// 	return res.sendStatus(500);
					},
				);
			});

			sendEmails(email);

			return res.sendStatus(201);
		},
	);
};

module.exports = { show, store };
