products:
- id BIGINT, PK
- name VARCHAR(100), NN
- img VARCHAR(255), NN
- description text, NN
- slug VARCHAR(100), NN
- initial_price DECIMAL(8,2), NN
- actual_price DECIMAL(8,2)
- color VARCHAR(100)
- dimensions VARCHAR(100), NN
- scent VARCHAR(100) 
- burn_time  VARCHAR(100)
- ingredients  VARCHAR(100) 
- available_quantity SMALLINT, default(0)
- created_at DATETIME default(now)
- updated_at DATETIME default(now)

categories:
- id BIGINT, PK
- name VARCHAR(100), NN

category_product:
- category_id BIGINT FK
- product_id BIGINT FK

orders:
- id BIGINT, PK
- discount_code_id FK
- shipment_code NN UNIQUE
- first_name VARCHAR(100), NN
- last_name VARCHAR(100), NN
- total_amount DECIMAL(8,2), NN
- email VARCHAR(100), NN
- phone_number VARCHAR(10), NN
- city VARCHAR(50),NN
- province VARCHAR(50),NN
- street VARCHAR(50),NN
- street_number SMALLINT
- zip_code CHAR(5), NN
- free_shipping TINYINT(1)
- created_at DATETIME default(now)
- updated_at DATETIME default(now)

order_product:
- order_id fk
- product_id fk
- quantity TINYINT default (1)

discount_codes:
- id BIGINT, PK
- code VARCHAR(20) NN
- value TINYINT NN
- valid_from DATETIME
- valid_to DATETIME



