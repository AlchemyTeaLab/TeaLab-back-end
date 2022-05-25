-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS recipes CASCADE;
DROP TABLE IF EXISTS ingredients CASCADE;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  username TEXT NOT NULL
);

CREATE TABLE recipes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  ingredient_ids BIGINT [] REFERENCES ingredients (id),
  user_id BIGINT REFERENCES users (id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ingredients (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  common_name TEXT NOT NULL,
  scientific_name TEXT NOT NULL,
  image TEXT NOT NULL,
  type TEXT NOT NULL,
  health_benefits TEXT [] NOT NULL,
  description TEXT
)

INSERT INTO 
  ingredients (common_name, scientific_name, type, health_benefits, description)

VALUES
('Oolong Tea', 'Camellia sinensis', 'Base', '{"Reduce stress and anxiety", "Improve brain activity", "Support heart health"}', 'Oolong tea is a traditional Chinese tea made from the semi-oxidized leaves of the Camellia sinensis plant. It is picked later in the season than green tea. A cup of brewed oolong tea contains small amounts of calcium, magnesium, and potassium. It also contains about 38 mg of caffeine. Rich in amino acid, Oolong tea improves relaxation and cognitive performance.'),
