CREATE TABLE users (
    user_id SERIAL PRIMARY KEY NOT NULL,
    username CHAR(255) NOT NULL,
    password character varying(255) NOT NULL
);