CREATE TABLE quotes (
 quote_id SERIAL PRIMARY KEY NOT NULL,
 quote TEXT,
 color character(255),
 background character(255),
 user_id INT NOT NULL,
 FOREIGN KEY(user_id) REFERENCES users(user_id)
);