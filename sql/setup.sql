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
('Black Tea', 'Camellia sinensis', 'Base', '{"Reduce inflammation in the body", "Decrease the risk of heart disease", "Lower  "Bad" LDL Cholesterol", "Improve focus"}', 'Black tea is derived from the leaves of the Camellia sinensis plant that are crushed, curled, rolled, or torn and then left to oxidize before they''re dried and sold. Black tea is dark and strong in flavor and contains more caffeine than other teas. It contains a group of polyphenols that have antioxidant properties. Black tea is the most common type of tea that comes in many varieties.'),
('Green Tea', 'Camellia sinensis', 'Base', '{"Positive effects on weight loss", "Reduce the risk of diabetes", "Heart disease and cancer"}', 'Green tea is prepared from the fresh or withered, lightly heated or steamed leaves of the Camellia sinensis plant. This preparation stops the oxidation process and accounts for green tea''s light and fresh flavor profile. Loaded with antioxidants, Green tea is touted to be one of the healthiest beverages on the planet.'),
('White Tea', 'Camellia sinensis', 'Base', '{"Support dental health", "Protect against oxidative stress", "Reduce inflammation in the body", "Support brain health"}', 'White tea is created from new buds and young leaves of the Camellia sinensis plant. Right after harvesting, these buds and leaves are steamed or fried to stop the oxidation process. Then the leaves are dried. Because it is minimally processed, it leads to a light, delicate and fruity flavor. White tea is lower in caffeine than other teas.'),
('Pu-erh Tea', 'Camellia sinensis', 'Base', '{"Boost immune system", "Support mental alertness", "Support Healthy Skin", "Support Heart Health"}', 'Pu-erh tea is a fermented tea where it mostly originated from Yunnan province of China and are sold in the form of a brick, cake or dried leaves. The leaves are hand-tossed in giant woks to stop oxidation in its tracks before they are aged in a very humid environment. Pu-erh is dark, rich and less astringent than other teas.'),
('Lemon', 'Citrus limon', 'Flavor', '{"Prevent kidney stones", "Improve digestive health", "Reduce cancer risk", "Protect against anemia"}', 'The lemon is a species of small evergreen trees in the flowering plant family Rutaceae. Lemons are high in vitamin C, fiber, and various beneficial plant compounds.'),
('Ginger', 'Zingiber officinale', 'Flavor', '{"Reduce nausea", "Alleviate motion sickness", "Ease headaches and migraines", "Improve blood circulation"}', 'The spicy root of the ginger plant is a healthful spices. It adds flavor to a huge variety of dishes and drinks, and people have been using it for therapeutic purposes for thousands of years.'),
('Lavender', 'Lavandula spica', 'Flavor', '{"Induce clam", "Improve sleep", "Soothe menstrual cramping", "Boost immune health", "Aids respiratory health"}', 'Lavender is a flowering plant in the mint family that''s easily identified by its sweet floral scent. In ancient times, lavender was used as a holy herb. Today, it is commonly used for its fragrance as well for medicinal and therapeutic benefits.'),
('Honey', '', 'Flavor', '{"Heal wounds and burns", "soothe sore throat and cough", "Reduce inflammation", "Boost immune system"}', 'Honey is a sweet fluid made by honeybees using the nectar of flowering plants.  It contains mostly sugar, as well as a mix of amino acids, vitamins, minerals, iron, zinc and antioxidants. In addition to its use as a natural sweetener, honey is used as an anti-inflammatory, antioxidant and antibacterial agent.'),
('Cinnamon', 'Cinnamomum', 'Flavor', '{"Support weight loss", "Improve heart health", "Alleviate menstrual cramps", "Reduce blood sugar level"}', 'Cinnamon is made from the inner bark of the cinnamon tree, which curls into rolls while drying, forming the recognizable cinnamon sticks. These sticks are either steeped in boiling water, or ground into a powder that can be used to make the tea. Cinnamon is one of the spices richest in antioxidants.'),


