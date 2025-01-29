CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);
-- ---------- OLD QUERY
-- CREATE TABLE schedules (
--     id SERIAL PRIMARY KEY,
--     day_of_week INTEGER NOT NULL,
--     start_time TIME NOT NULL,
--     end_time TIME NOT NULL,
--     UNIQUE(day_of_week, user_id)
-- );
-- ----------- NEW QUERY
CREATE TABLE schedules (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    day_of_week INTEGER NOT NULL CHECK (
        day_of_week BETWEEN 0 AND 6
    ),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
-- INSERT INTO users (email, password_hash)
-- VALUES (
--         'user1@some.com',
--         '$2b$10$encrypted_password_hash'
--     ),
--     (
--         'user2@some.com',
--         '$2b$10$encrypted_password_hash'
--     );
-- INSERT INTO schedules (day_of_week, start_time, end_time)
-- VALUES (0, '00:00', '24:00'),
--     (1, '00:00', '24:00'),
--     (2, '00:00', '24:00'),
--     (3, '00:00', '24:00'),
--     (4, '00:00', '24:00'),
--     (5, '00:00', '24:00'),
--     (6, '00:00', '24:00');