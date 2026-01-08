users:
- id BIGINT, PK
- first_name VARCHAR(100),NN
- last_name VARCHAR(100),NN
- email VARCHAR(100),NN
- phone_number VARCHAR(10), NN
- password VARCHAR(50),NN

addresses:
- id BIGINT, PK
- user_id BIGINT FK
- city VARCHAR(50),NN
- province VARCHAR(50),NN
- street VARCHAR(50),NN
- street_number SMALLINT
- zip_code CHAR(5), NN

products:
- id BIGINT, PK
- name VARCHAR(100), NN
- img VARCHAR(255), NN
- description text, NN
- initial_price FLOAT(8,2), NN (?)
- actual_price FLOAT(8,2), NN (?)
- discount TINYINT defoult 0
- color VARCHAR(100)
- dimensions VARCHAR(100), NN
- scent VARCHAR(100) 
- burn_time  VARCHAR(100)
- ingredients  VARCHAR(100) 
- available_quantity SMALLINT, default(0)

categories:
- id BIGINT, PK
- name VARCHAR(100), NN

category_product:
- category_id BIGINT FK
- product_id BIGINT FK



carts:
- id BIGINT, PK
- user_id FK

cart_product:
- cart_id FK
- product_id FK
- quantity TINYINT

orders:
- id BIGINT, PK
- user_id fk
- shipment_code NN UNIQUE

order_product:
- order_id fk
- product_id fk
- quantity TINYINT default (1)


wishlists:
- id BIGINT, PK
- user_id FK

product_Wishlist
- product_id FK
- wishlist_id FK


discount_codes:
- id BIGINT, PK
- code VARCHAR(20) NN
- value TINYINT NN
- valid_from DATETIME
- valid_to DATETIME



