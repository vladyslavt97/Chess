DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first VARCHAR(255) NOT NULL,
    last VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- CREATE TABLE games (
--     id SERIAL PRIMARY KEY,
--     sender_id INTEGER NOT NULL REFERENCES users(id),
--     recipient_id INTEGER REFERENCES users(id),
--     message TEXT NOT NULL CHECK (message <> ''),
--     created_at TIMESTAMP DEFAULT current_timestamp
-- );
