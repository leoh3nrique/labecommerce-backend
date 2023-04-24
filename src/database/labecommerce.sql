-- Active: 1682097893209@@127.0.0.1@3306

CREATE TABLE
    users(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT(DATETIME())
    );


INSERT INTO users (id, name, email, password, created_at AS createdAt)
VALUES
("u001","Leonardo","hgtleohgt@gmail.com", "123leo"),
("u002","Daniele","daniele@gmail.com", "123dani"),
("u003","Marta","marta@gmail.com", "123marta"),
("u004","Reynaldo","reynaldo@gmail.com", "123reynaldo");


SELECT * FROM users;
CREATE TABLE
    products(
        id TEXT UNIQUE PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT
    );

INSERT INTO products (id,name,price,description,image_url)
VALUES
("p001","Laranja",0.50,"Laranja Argentina", "https://i2.wp.com/files.agro20.com.br/uploads/2019/11/Toranja-2.jpg?resize=1024%2C683&ssl=1"),
("p002","Maça",1.20,"Maca Argentina", "https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/cenourao/media/uploads/produtos/foto/2d7ad293470cfile.png"),
("p003","Abacate",0.50,"Abacate Brasileiro", "https://amoabacate.com.br/wp-content/uploads/2019/06/25125125125gead-800x952.jpg");


SELECT * FROM products
WHERE name = "AbACATE";

DROP TABLE purchases_products;

CREATE TABLE
    purchases(
        id TEXT NOT NULL UNIQUE PRIMARY KEY,
        buyer_id TEXT NOT NULL,
        total_price REAL NOT NULL,
        paid INTEGER NOT NULL DEFAULT(0),
        created_at TEXT NOT NULL DEFAULT(DATETIME()),
        Foreign Key (buyer_id) REFERENCES users(id)
    );

DROP TABLE purchases;

CREATE TABLE
    purchases_products(
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL DEFAULT(1),
        FOREIGN KEY (purchase_id) REFERENCES purchases(id),
        FOREIGN KEY (product_id) REFERENCES products (id)
    );

