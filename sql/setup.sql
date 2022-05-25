-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS recipes CASCADE;
DROP TABLE IF EXISTS ingredients CASCADE;
DROP TABLE IF EXISTS ingredients_recipes CASCADE;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  username TEXT NOT NULL
);

CREATE TABLE ingredients (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  common_name TEXT NOT NULL,
  scientific_name TEXT NOT NULL,
  image TEXT,
  type TEXT NOT NULL,
  health_benefits TEXT [] NOT NULL,
  description TEXT
);


CREATE TABLE recipes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  user_id BIGINT REFERENCES users (id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- junction table for these ingredients_recipes
CREATE TABLE ingredients_recipes (
  ingredient_id BIGINT REFERENCES ingredients (id),
  recipe_id BIGINT REFERENCES recipes (id)
);

INSERT INTO
  users(email, password_hash, username)
VALUES
  ('test@email.com', 'secretPassword', 'test_username');

INSERT INTO 
  ingredients(common_name, scientific_name, type, health_benefits, description)
VALUES
('Oolong Tea', 'Camellia sinensis', 'Base', '{"Reduce stress and anxiety", "Improve brain activity", "Support heart health"}', 'Oolong tea is a traditional Chinese tea made from the semi-oxidized leaves of the Camellia sinensis plant. It is picked later in the season than green tea. A cup of brewed oolong tea contains small amounts of calcium, magnesium, and potassium. It also contains about 38 mg of caffeine. Rich in amino acid, Oolong tea improves relaxation and cognitive performance.'),
('Black Tea', 'Camellia sinensis', 'Base', '{"Reduce inflammation in the body", "Decrease the risk of heart disease", "Lower Bad LDL Cholesterol", "Improve focus"}', 'Black tea is derived from the leaves of the Camellia sinensis plant that are crushed, curled, rolled, or torn and then left to oxidize before they''re dried and sold. Black tea is dark and strong in flavor and contains more caffeine than other teas. It contains a group of polyphenols that have antioxidant properties. Black tea is the most common type of tea that comes in many varieties.'),
('Green Tea', 'Camellia sinensis', 'Base', '{"Positive effects on weight loss", "Reduce the risk of diabetes", "Heart disease and cancer"}', 'Green tea is prepared from the fresh or withered, lightly heated or steamed leaves of the Camellia sinensis plant. This preparation stops the oxidation process and accounts for green tea''s light and fresh flavor profile. Loaded with antioxidants, Green tea is touted to be one of the healthiest beverages on the planet.'),
('White Tea', 'Camellia sinensis', 'Base', '{"Support dental health", "Protect against oxidative stress", "Reduce inflammation in the body", "Support brain health"}', 'White tea is created from new buds and young leaves of the Camellia sinensis plant. Right after harvesting, these buds and leaves are steamed or fried to stop the oxidation process. Then the leaves are dried. Because it is minimally processed, it leads to a light, delicate and fruity flavor. White tea is lower in caffeine than other teas.'),
('Pu-erh Tea', 'Camellia sinensis', 'Base', '{"Boost immune system", "Support mental alertness", "Support Healthy Skin", "Support Heart Health"}', 'Pu-erh tea is a fermented tea where it mostly originated from Yunnan province of China and are sold in the form of a brick, cake or dried leaves. The leaves are hand-tossed in giant woks to stop oxidation in its tracks before they are aged in a very humid environment. Pu-erh is dark, rich and less astringent than other teas.'),
('Lemon', 'Citrus limon', 'Flavor', '{"Prevent kidney stones", "Improve digestive health", "Reduce cancer risk", "Protect against anemia"}', 'The lemon is a species of small evergreen trees in the flowering plant family Rutaceae. Lemons are high in vitamin C, fiber, and various beneficial plant compounds.'),
('Ginger', 'Zingiber officinale', 'Flavor', '{"Reduce nausea", "Alleviate motion sickness", "Ease headaches and migraines", "Improve blood circulation"}', 'The spicy root of the ginger plant is a healthful spices. It adds flavor to a huge variety of dishes and drinks, and people have been using it for therapeutic purposes for thousands of years.'),
('Lavender', 'Lavandula spica', 'Flavor', '{"Induce clam", "Improve sleep", "Soothe menstrual cramping", "Boost immune health", "Aids respiratory health"}', 'Lavender is a flowering plant in the mint family that''s easily identified by its sweet floral scent. In ancient times, lavender was used as a holy herb. Today, it is commonly used for its fragrance as well for medicinal and therapeutic benefits.'),
('Honey', '', 'Flavor', '{"Heal wounds and burns", "soothe sore throat and cough", "Reduce inflammation", "Boost immune system"}', 'Honey is a sweet fluid made by honeybees using the nectar of flowering plants.  It contains mostly sugar, as well as a mix of amino acids, vitamins, minerals, iron, zinc and antioxidants. In addition to its use as a natural sweetener, honey is used as an anti-inflammatory, antioxidant and antibacterial agent.'),
('Cinnamon', 'Cinnamomum', 'Flavor', '{"Support weight loss", "Improve heart health", "Alleviate menstrual cramps", "Reduce blood sugar level"}', 'Cinnamon is made from the inner bark of the cinnamon tree, which curls into rolls while drying, forming the recognizable cinnamon sticks. These sticks are either steeped in boiling water, or ground into a powder that can be used to make the tea. Cinnamon is one of the spices richest in antioxidants.'),
('Chamomile', 'Asteraceae', 'Flavor', '{"Support calm", "Support healthier sleep habits", "Improve digestive health"}', 'Chamomile is a pretty, elegant, and fragrant herb that belongs in the Asteraceae plant family. It is used for therapeutic purposes, especially popular among people who are looking to unwind before bed.'),
('Hisbiscus', 'Hibiscus rosa-sinensis', 'Flavor', '{"Support healthy cholesterol management", "Support liver health"}', 'Hibiscus tea is derived from the hibiscus plant. The red brew is simultaneously sweet and tart. It''s commonly enjoyed as an iced tea and is high in antioxidants.'),
('Peppermint', 'Mentha balsamea wild', 'Flavor', '{"Relieve cold/flu symptoms", "Relieve upset stomach", "Relief menstrual pain and headaches"}', 'Derived from the leaves of the mint plant, peppermint is loaded with menthol and menthone. The smells and tastes are great and has a sharp, spicy flavor. It is among the oldest herbs used for both culinary and medicinal products.'),
('Rooibos', 'Aspalathus linearis', 'Flavor', '{"Support heart health", "Reduce stress and anxiety", "Support strong teeth and bones"}', 'The fermented leaves of the Aspalathus linearis shrub, Rooibos is well-known for its rich, red hue and sweet, earthy, slightly floral flavor. Loaded with antioxidant, the plant grows natively in South Africa.'),
('Jasmine', 'Jasminum officinale', 'Flavor', '{"Help with weight loss", "Support heart health", "Promote good oral health", "Speed up wound healing"}', 'Jasmine is widely cultivated for the characteristic fragrance of its flowers. It has a fragrant floral aroma with a sweet, subtle taste. Loaded with powerful plant-based compounds known as polyphenols, Jasmine is used in both culinary and medicinal products.'),
('Soy Protein', '', 'Boost', '{"Build muscle tissue", "Support weight loss", "Boost energy"}', 'Soy protein is a protein that is isolated from soybean. It is made from soybean meal that has been dehulled and defatted.'),
('Whiskey', '', 'Boost', '{"Promote mental health", "Help with body relaxation"}', 'Whiskey is a type of distilled alcoholic beverage made from fermented grain mash. It is typically aged in wooden casks, which are often old sherry casks or may also be made of charred white oak.'),
('Vitamins', '', 'Boost', '{"Boost cardiovascular health", "Cover nutritional bases", "Support healthy metabolism", "Reduce anxiety and stress"}', 'Vitamins are organic compounds that people need in small quantities. Different vitamins play different roles in the body, and a person requires a different amount of each vitamin to stay healthy.'),
('Antioxidant', '', 'Boost', '{"Support heart health", "Reduce the risk of cancer"}', 'Antioxidants are mostly found in plant foods. They are natural molecules that help neutralize harmful free radicals in our bodies.'),
('Probiotic', '', 'Boost', '{"Prevent or treat diarrhea", "Improve irritable bowel movement", "Boost immune system", "Reduce allergies and inflammation"}', 'Probiotics are foods or supplements that contain live microorganisms intended to maintain or improve the "good" bacteria in the body.');

INSERT INTO
  recipes(name, user_id, notes)
VALUES
  ('Jasmine Green Tea', '1', 'My go-to stress-reliever'),
  ('Iced Lemon Tea', '1', 'Summer Favorite');

INSERT INTO
  ingredients_recipes(ingredient_id, recipe_id)
VALUES
  (3, 1),
  (15, 1),
  (20, 1),
  (2, 2),
  (6, 2),
  (12, 2);
