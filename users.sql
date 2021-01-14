CREATE TABLE users (
    user_id SERIAL PRIMARY KEY NOT NULL,
    username CHAR(255) NOT NULL UNIQUE,
    email CHAR(255) NOT NULL UNIQUE,
    avatar CHAR(255),
    log_in_with CHAR(255) NOT NULL,
    google_id character varying(255) UNIQUE,
    password character varying(255)
);