
CREATE TABLE IF NOT EXISTS users(
	id SERIAL PRIMARY KEY,  
	name varchar UNIQUE NOT NULL,
    age int
);

