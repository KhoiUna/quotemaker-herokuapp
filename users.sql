CREATE TABLE users (
    user_id SERIAL PRIMARY KEY NOT NULL,
    username CHAR(255) NOT NULL,
    email CHAR(255) NOT NULL,
    avatar CHAR(255),
    password character varying(255) NOT NULL
);