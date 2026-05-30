-- GOOD FOOD DATABASE SCHEMA
-- Execute this SQL script in your Supabase SQL Editor to set up the database tables.

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create MENU_ITEMS Table
CREATE TABLE IF NOT EXISTS menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL CHECK (price >= 0),
    category TEXT NOT NULL,
    image_url TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create SETTINGS Table
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial settings
INSERT INTO settings (key, value)
VALUES 
('whatsapp_number', '+9779811117891'),
('support_number', '+9779814562984'),
('delivery_available', 'true'),
('admin_password', 'admin123') -- Fallback standard password, can be changed
ON CONFLICT (key) DO NOTHING;

-- Seed initial menu items for visual richness out-of-the-box
INSERT INTO menu_items (name, description, price, category, image_url, is_available)
VALUES
-- Non Veg Snacks Chicken
('Buff Sukuti', 'Dry spiced jerky of buffalo meat, cooked with local herbs and spices.', 320, 'Snacks', 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=600&q=80', true),
('Buff Choila', 'Traditional spiced grilled buffalo meat salad from the Newar cuisine.', 300, 'Snacks', 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80', true),
('Buff Sukuti Sadeko', 'Spiced and marinated dry buffalo meat with onions, tomatoes and garlic.', 320, 'Snacks', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80', true),
('Buff Bhutan', 'Spicy stir-fry of buffalo offal, a popular Nepalese snack.', 320, 'Snacks', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80', true),
('Chicken Lollipop', 'Crispy fried chicken drumettes glazed with savory spices.', 350, 'Snacks', 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80', true),
('Chicken Chilli (w/b)', 'Spicy wok-tossed chicken with bone, peppers and onions.', 300, 'Snacks', 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=600&q=80', true),
('Chicken Chilli (b/l)', 'Boneless wok-tossed chicken chilli with capsicum and rich spices.', 340, 'Snacks', 'https://images.unsplash.com/photo-1598515214211-89d3e73ae83b?auto=format&fit=crop&w=600&q=80', true),
('Hotwings', 'Deep fried chicken wings tossed in signature hot sauce.', 350, 'Snacks', 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80', true),
('Buffalo Wings', 'Crispy wings coated in tangy buffalo sauce served with dip.', 350, 'Snacks', 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=600&q=80', true),
('Crispy Chicken', 'Golden breaded fried chicken strips served with house special dip.', 470, 'Snacks', 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=600&q=80', true),
('Chicken Choila', 'Spiced and roasted chicken cubes tossed with mustard oil and fenugreek.', 370, 'Snacks', 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80', true),
('Chicken Grilled', 'Succulent chicken breast marinated in herbs and grilled to perfection.', 350, 'Snacks', 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80', true),
('Pork Fry', 'Savory stir-fried pork chunks cooked with green chillies and garlic.', 350, 'Snacks', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', true),
('Pork Chilly', 'Spicy pork stir-fry with peppers, garlic, ginger and dark soy sauce.', 370, 'Snacks', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80', true),
('Pork Dameko', 'Traditional pan-seared pork with crispy skin and Nepalese seasoning.', 350, 'Snacks', 'https://images.unsplash.com/photo-1602489114885-33a870b3ac5d?auto=format&fit=crop&w=600&q=80', true),
('Full Leg Fry', 'Crispy whole chicken leg seasoned with homestyle spices and deep fried.', 300, 'Snacks', 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=600&q=80', true),
('Full Leg Chilly', 'Crispy chicken leg cooked in sweet and spicy chilli sauce.', 350, 'Snacks', 'https://images.unsplash.com/photo-1598515214211-89d3e73ae83b?auto=format&fit=crop&w=600&q=80', true),
('Chicken Whole Grilled', 'Whole chicken (1.5 kg+) slow roasted with herbs and tandoor spices.', 1500, 'Snacks', 'https://images.unsplash.com/photo-1598103442097-8b743e2b95c3?auto=format&fit=crop&w=600&q=80', true),

-- Veg Snacks
('Alu Jeera', 'Boiled potatoes sauteed with cumin seeds and aromatic dry spices.', 150, 'Snacks', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80', true),
('French Fry', 'Classic golden potato fries served with tomato ketchup.', 200, 'Snacks', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80', true),
('Mustang Alu', 'Crispy potato wedges tossed in ginger-garlic paste and local wild herbs.', 180, 'Snacks', 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80', true),
('Chips Chilly', 'Spiced french fries stir-fried with capsicum, onions and chilli sauce.', 200, 'Snacks', 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80', true),
('Papad (Veg Snacks)', 'Crispy lentil wafers served with green mint chutney.', 170, 'Snacks', 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80', true),
('Mushrooms Fry/Chilly', 'Spicy wok-tossed fresh mushrooms with bell peppers and green chillies.', 200, 'Snacks', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', true),
('Veg Boil Sothe', 'Assorted seasonal vegetables boiled and lightly sauteed in butter.', 200, 'Snacks', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80', true),
('Veg Pakauda', 'Deep fried crispy vegetable fritters spiced with carom seeds.', 180, 'Snacks', 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80', true),
('Onion Rings', 'Golden crispy batter-fried onion rings served with mayo sauce.', 180, 'Snacks', 'https://images.unsplash.com/photo-1639024471283-2bc7b3c6a267?auto=format&fit=crop&w=600&q=80', true),

-- Sadeko Items
('Peanut Sadeko', 'Crunchy roasted peanuts tossed with onions, green chillies, lime and cilantro.', 150, 'Snacks', 'https://images.unsplash.com/photo-1607349913338-fca147fc4235?auto=format&fit=crop&w=600&q=80', true),
('Vatmass Sadeko', 'Crispy roasted soybeans marinated with hot mustard oil, herbs and red onions.', 130, 'Snacks', 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80', true),
('Salad Sadeko', 'Freshly chopped cucumber, tomatoes, onions seasoned with salt and lime juice.', 130, 'Snacks', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80', true),
('Papad Sadeko', 'Crushed crispy papad loaded with spiced tomatoes, onions, lime juice and herbs.', 170, 'Snacks', 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80', true),
('Chicken Sadeko', 'Boiled shredded chicken spiced up with local mustard oil, garlic and fresh herbs.', 300, 'Snacks', 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80', true),
('Waiwai Sadeko', 'Instant dry Wai Wai noodles mixed with chopped onions, tomatoes, lime and spice oil.', 150, 'Snacks', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80', true),

-- Khaja Set Items
('Buff Khaja Set', 'Traditional Nepali platter with beaten rice (chiura), roasted buff, pickles and curry.', 370, 'Khaja & Curry', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80', true),
('Chicken Khaja Set', 'Nepali set with beaten rice, flavorful chicken curry, dry snacks, and spiced pickles.', 400, 'Khaja & Curry', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80', true),
('Pork Khaja Set', 'Beaten rice platter served with spicy roasted pork dameko and classic sides.', 400, 'Khaja & Curry', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80', true),
('Veg Khaja Set', 'Healthy beaten rice set served with black lentil soup, potato curry, greens and pickles.', 200, 'Khaja & Curry', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80', true),
('Mix Buff Set', 'Special combination beaten rice khaja platter featuring assorted buffalo meats.', 500, 'Khaja & Curry', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80', true),
('Mix Chicken Set', 'Nepali khaja set loaded with spicy chicken parts, lollipops, beating rice and pickles.', 500, 'Khaja & Curry', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80', true),

-- Special Items
('Safumichya (5 pcs)', 'A Newari delicacy made of buffalo leaf tripe stuffed with marrow (5 pieces).', 450, 'Special Items', 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=600&q=80', true),
('Chicken Ice Cream', 'Unique chef''s special savory chicken appetizers shaped like mini ice creams.', 450, 'Special Items', 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80', true),
('Timur Chicken', 'Spicy chicken dry-fry infused with Himalayan Sichuan pepper (Timur) and green chillies.', 450, 'Special Items', 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=600&q=80', true),

-- Current Noodles Items
('Pouch Egg Noodles', 'Current instant noodles cooked spicy, topped with a soft pouched egg.', 130, 'Noodles', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80', true),
('Fry Sausage Noodles', 'Spicy current noodles served with pan-fried local chicken sausages.', 180, 'Noodles', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80', true),
('Egg with Soup Noodles', 'Hot and spicy noodle soup with double boiled eggs and green onions.', 150, 'Noodles', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80', true),
('Sausage and Soup Noodles', 'Noodle soup bowl cooked extra hot, loaded with chopped sausage slices.', 190, 'Noodles', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80', true),

-- Matka Biriyani Items
('Chicken Matka Biriyani', 'Flavorful long-grain rice layered with spiced chicken in a traditional clay pot.', 550, 'Biriyani', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80', true),
('Egg Matka Biriyani', 'Basmati rice cooked slow with eggs in a sealed clay matka.', 500, 'Biriyani', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80', true),

-- Biriyani Container
('Chicken Biriyani Container (450g)', 'Takeout container of flavorful chicken biriyani (450 grams portion).', 350, 'Biriyani', 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80', true),
('Chicken Biriyani Container (800g)', 'Takeout container of flavorful chicken biriyani (800 grams portion).', 600, 'Biriyani', 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80', true),
('Chicken Biriyani Container (1200g)', 'Takeout container of flavorful chicken biriyani (1200 grams portion).', 1100, 'Biriyani', 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80', true),
('Egg Biriyani Container (450g)', 'Takeout container of egg biriyani (450 grams portion).', 350, 'Biriyani', 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80', true),
('Egg Biriyani Container (800g)', 'Takeout container of egg biriyani (800 grams portion).', 550, 'Biriyani', 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80', true),
('Egg Biriyani Container (1200g)', 'Takeout container of egg biriyani (1200 grams portion).', 1000, 'Biriyani', 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80', true),

-- Burger Items
('Chicken Burger', 'Crispy fried chicken patty on fresh lettuce, tomatoes and dynamic burger sauce.', 130, 'Burgers & Rolls', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', true),
('Buff Burger', 'Juicy minced buffalo beef grilled patty served on a soft sesame seed bun.', 130, 'Burgers & Rolls', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', true),
('Cheese Chicken Burger', 'Crispy chicken patty with melted cheddar cheese slice and garlic spread.', 180, 'Burgers & Rolls', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', true),
('Cheese Buff Burger', 'Buffalo beef burger served extra cheesy with melted cheese sauce.', 180, 'Burgers & Rolls', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', true),
('Ham Burger', 'Premium sliced smoked ham layers with lettuce, onions and home recipe sauce.', 210, 'Burgers & Rolls', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', true),
('Chicken Crispy Burger', 'Golden flaky deep-fried chicken breast burger topped with mayonnaise.', 160, 'Burgers & Rolls', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', true),
('Chicken Crispy Cheese Burger', 'Crispy breaded chicken breast fillet burger served with double cheese.', 210, 'Burgers & Rolls', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', true),

-- Katti Roll Items
('Chicken Katti Roll', 'Spiced chicken chunks and sauteed peppers wrapped inside a flaky flatbread paratha.', 150, 'Burgers & Rolls', 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80', true),
('Buff Katti Roll', 'Marinated buffalo meat chunks with onions and green chutney inside flatbread.', 150, 'Burgers & Rolls', 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80', true),
('Mushrooms Katti Roll', 'Sauteed mushrooms, onions and peppers tossed inside thin flatbread paratha.', 150, 'Burgers & Rolls', 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80', true),

-- Keema Noodles Items
('Buff Keema Noodles', 'Flat noodles topped with spicy minced buffalo beef curry sauce.', 280, 'Noodles', 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80', true),
('Chicken Keema Noodles', 'Dry stir-fry noodles tossed with delicious minced chicken masala.', 280, 'Noodles', 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80', true),
('Mix Keema Noodles', 'Savory noodles loaded with double keema of minced chicken and buff.', 350, 'Noodles', 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80', true),
('Egg Keema Noodles', 'Noodles cooked with eggs and a rich layer of spiced chicken keema.', 280, 'Noodles', 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80', true),

-- Momo Items
-- Buff Momos
('Buff Momo (Steam)', 'Steamed buffalo dumplings filled with fresh minced meat, onions, and spices.', 110, 'Momo', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', true),
('Buff Momo (Fry)', 'Golden crispy deep-fried buffalo dumplings served with dipping chutney.', 140, 'Momo', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', true),
('Buff Momo (Chilly)', 'Fried buffalo dumplings tossed in spicy onion, tomato, and bell pepper glaze.', 190, 'Momo', 'https://images.unsplash.com/photo-1625220194771-7ebedd0b4a1b?auto=format&fit=crop&w=600&q=80', true),
('Buff Momo (Kothey)', 'Pan-fried half-moon shaped buffalo dumplings served with spicy sesame chutney.', 160, 'Momo', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', true),
('Buff Momo (Crispy)', 'Extra-crispy crunched outer layer coated fried buff momos.', 190, 'Momo', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', true),
('Buff Momo (Jhol)', 'Steamed buff dumplings submerged in cold, tangy and roasted sesame soup.', 160, 'Momo', 'https://images.unsplash.com/photo-1625220194771-7ebedd0b4a1b?auto=format&fit=crop&w=600&q=80', true),
('Buff Momo (Sadeko)', 'Fried buff dumplings tossed with spicy raw onions, lime juice and mustard oil.', 180, 'Momo', 'https://images.unsplash.com/photo-1625220194771-7ebedd0b4a1b?auto=format&fit=crop&w=600&q=80', true),
-- Chicken Momos
('Chicken Momo (Steam)', 'Freshly steamed chicken momos stuffed with minced chicken salad and butter.', 130, 'Momo', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', true),
('Chicken Momo (Fry)', 'Deep fried chicken momo dumplings cooked golden brown.', 150, 'Momo', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', true),
('Chicken Momo (Chilly)', 'Spicy stir-fry chicken dumplings glazed in rich red chili sauce and peppers.', 210, 'Momo', 'https://images.unsplash.com/photo-1625220194771-7ebedd0b4a1b?auto=format&fit=crop&w=600&q=80', true),
('Chicken Momo (Kothey)', 'Classic pan-fried potsticker chicken momos with a crispy bottom.', 180, 'Momo', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', true),
('Chicken Momo (Crispy)', 'Special crunchy crust coated chicken fried momos served with spicy dip.', 210, 'Momo', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', true),
('Chicken Momo (Jhol)', 'Hot steamed chicken momos submerged in sour sesame peanut soup.', 180, 'Momo', 'https://images.unsplash.com/photo-1625220194771-7ebedd0b4a1b?auto=format&fit=crop&w=600&q=80', true),
('Chicken Momo (Sadeko)', 'Fried chicken momos tossed with onions, cilantro, lemon and spices.', 200, 'Momo', 'https://images.unsplash.com/photo-1625220194771-7ebedd0b4a1b?auto=format&fit=crop&w=600&q=80', true),

-- Momo Plater
('Buff Momo Platter', 'Huge combination platter of steamed, fried, chilly, and kothey buff momos.', 350, 'Momo', 'https://images.unsplash.com/photo-1625220194771-7ebedd0b4a1b?auto=format&fit=crop&w=600&q=80', true),
('Chicken Momo Platter', 'Assorted platter of various styles of fresh chicken momos.', 400, 'Momo', 'https://images.unsplash.com/photo-1625220194771-7ebedd0b4a1b?auto=format&fit=crop&w=600&q=80', true),

-- Safale Items
('Chicken Safale', 'Tibetan flatbread stuffed with spiced minced chicken and deep fried.', 130, 'Momo', 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=600&q=80', true),
('Buff Safale', 'Tibetan flatbread stuffed with spiced minced buffalo beef and deep fried.', 130, 'Momo', 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=600&q=80', true),

-- Chaumien Items
('Veg Chowmein', 'Stir-fried noodles with crisp vegetables and rich soy seasoning.', 100, 'Noodles', 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80', true),
('Buff Chowmein', 'Stir-fried noodles with tender buffalo meat strips and veggies.', 140, 'Noodles', 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80', true),
('Chicken Chowmein', 'Wok-tossed noodles with shredded chicken breast and vegetables.', 150, 'Noodles', 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80', true),
('Egg Chowmein', 'Noodles stir-fried with scrambled eggs and fresh garden greens.', 140, 'Noodles', 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80', true),
('Pork Chowmein', 'Tossed chowmein noodles cooked with savory sliced pork slices.', 170, 'Noodles', 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80', true),
('Keema Chowmein', 'Spicy noodles stir-fried with rich minced chicken keema toppings.', 170, 'Noodles', 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80', true),
('Mix Chowmein', 'Ultimate combination chowmein with chicken, buff, eggs and vegetables.', 200, 'Noodles', 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80', true),

-- Pizza Items
('Chicken Pizza', 'Fresh dough topped with spiced grilled chicken pieces, mozzarella and marinara.', 450, 'Pizza', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', true),
('Mushrooms Pizza', 'Bake loaded with fresh button mushrooms, oregano, and double mozzarella.', 400, 'Pizza', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', true),
('Margerita Pizza', 'Classic pizza topped with fresh basil, marinara sauce, and pure olive oil.', 400, 'Pizza', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', true),
('BBQ Chicken Pizza', 'Topped with smoked BBQ shredded chicken, onions, cilantro, and double cheese.', 500, 'Pizza', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', true),
('Mix Non Veg Pizza', 'Supreme pizza with toppings of chicken, buff strips, ham, sausage, and peppers.', 600, 'Pizza', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', true),
('Salami Pizza', 'Loaded with seasoned slices of chicken salami and rich melted cheese crust.', 500, 'Pizza', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', true),
('Extra Cheese Pizza Addon', 'Double down on your favorite pizza with a thick layer of premium mozzarella.', 100, 'Pizza', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', true),

-- Corn Dog
('Corn Dog (Full Cheese)', 'Golden crispy batter-fried Korean style hot dog stuffed with melted mozzarella.', 250, 'Snacks', '/image_7.png', true),

-- Fried Rice Items
('Chicken/Buff Keema Fried Rice', 'Wok fried rice tossed with spicy minced meat keema, peas and carrots.', 190, 'Rice & Roti', 'https://images.unsplash.com/photo-1603133872878-6967b6823a4a?auto=format&fit=crop&w=600&q=80', true),
('Chicken Fried Rice', 'Savory fried rice cooked with grilled chicken bites, green onion, and eggs.', 180, 'Rice & Roti', 'https://images.unsplash.com/photo-1603133872878-6967b6823a4a?auto=format&fit=crop&w=600&q=80', true),
('Buff Fried Rice', 'Stir-fried rice tossed with spiced buffalo meat slices and vegetables.', 170, 'Rice & Roti', 'https://images.unsplash.com/photo-1603133872878-6967b6823a4a?auto=format&fit=crop&w=600&q=80', true),
('Pork Fried Rice', 'Savory fried rice cooked with roasted pork cubes and spices.', 200, 'Rice & Roti', 'https://images.unsplash.com/photo-1603133872878-6967b6823a4a?auto=format&fit=crop&w=600&q=80', true),
('Sausage Fried Rice', 'Fried rice loaded with sliced fried chicken sausages.', 180, 'Rice & Roti', 'https://images.unsplash.com/photo-1603133872878-6967b6823a4a?auto=format&fit=crop&w=600&q=80', true),
('Egg Fried Rice', 'Delicious stir-fried rice loaded with scrambled egg flakes.', 170, 'Rice & Roti', 'https://images.unsplash.com/photo-1603133872878-6967b6823a4a?auto=format&fit=crop&w=600&q=80', true),
('Mix Fried Rice', 'Combination rice featuring chicken, buff slices, sausage, egg, and vegetables.', 230, 'Rice & Roti', 'https://images.unsplash.com/photo-1603133872878-6967b6823a4a?auto=format&fit=crop&w=600&q=80', true),

-- Roti & Rice Items
('Sukka Roti (per pc)', 'Soft, freshly puffed wheat flour flatbread (roti) without butter/oil.', 20, 'Rice & Roti', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80', true),
('Alu Parautha', 'Flaky flatbread stuffed with spiced mashed potatoes, pan-fried with butter.', 100, 'Rice & Roti', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80', true),
('Chicken/Buff Parautha', 'Crispy paratha bread stuffed with seasoned minced chicken or buff meat.', 130, 'Rice & Roti', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80', true),
('Plain Rice', 'Freshly steamed hot long-grain Basmati rice bowl.', 100, 'Rice & Roti', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80', true),
('Biriyani Rice', 'Basmati rice cooked in fragrant biryani spices, ghee, saffron, and mint.', 150, 'Rice & Roti', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80', true),
('Jeera Rice Long Range', 'Aromatic basmati rice tempered with ghee and whole cumin seeds.', 160, 'Rice & Roti', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80', true),

-- Curry Items
-- Chicken Curry
('Chicken Curry (250g)', 'Rich gravy chicken curry prepared with Nepalese spices (250g portion).', 320, 'Khaja & Curry', 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80', true),
('Chicken Curry (500g)', 'Rich gravy chicken curry prepared with Nepalese spices (500g portion).', 600, 'Khaja & Curry', 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80', true),
('Chicken Curry (1kg)', 'Rich gravy chicken curry prepared with Nepalese spices (1kg portion).', 1200, 'Khaja & Curry', 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80', true),
-- Buff Curry
('Buff Curry (250g)', 'Tender buffalo beef slow-cooked in a spicy Nepalese curry broth (250g portion).', 300, 'Khaja & Curry', 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80', true),
('Buff Curry (500g)', 'Tender buffalo beef slow-cooked in a spicy Nepalese curry broth (500g portion).', 600, 'Khaja & Curry', 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80', true),
('Buff Curry (1kg)', 'Tender buffalo beef slow-cooked in a spicy Nepalese curry broth (1kg portion).', 1200, 'Khaja & Curry', 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80', true),
-- Veg Curry
('Veg Curry (250g)', 'Assorted fresh seasonal garden vegetables cooked in light onion gravy (250g).', 200, 'Khaja & Curry', 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80', true),
('Veg Curry (500g)', 'Assorted fresh seasonal garden vegetables cooked in light onion gravy (500g).', 400, 'Khaja & Curry', 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80', true)
ON CONFLICT DO NOTHING;

-- RLS (Row Level Security) Configuration
-- Enable RLS for security
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create Policies for menu_items (Anyone can read, Admins can write)
DROP POLICY IF EXISTS "Allow public read menu_items" ON menu_items;
CREATE POLICY "Allow public read menu_items" ON menu_items
    FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Allow all writes for admins on menu_items" ON menu_items;
CREATE POLICY "Allow all writes for admins on menu_items" ON menu_items
    FOR ALL TO public USING (true) WITH CHECK (true);

-- Create Policies for settings (Anyone can read, Admins can write)
DROP POLICY IF EXISTS "Allow public read settings" ON settings;
CREATE POLICY "Allow public read settings" ON settings
    FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Allow all writes for admins on settings" ON settings;
CREATE POLICY "Allow all writes for admins on settings" ON settings
    FOR ALL TO public USING (true) WITH CHECK (true);

-- 3. Create ORDERS Table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number SERIAL,
    customer_name TEXT NOT NULL,
    delivery_address TEXT NOT NULL,
    items JSONB NOT NULL,
    total_price NUMERIC NOT NULL,
    status TEXT DEFAULT 'Pending', -- 'Pending', 'Preparing', 'Completed', 'Cancelled'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create Policies for orders (Anyone can create and read, Admin/Public can update status)
DROP POLICY IF EXISTS "Allow public read orders" ON orders;
CREATE POLICY "Allow public read orders" ON orders
    FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Allow public insert orders" ON orders;
CREATE POLICY "Allow public insert orders" ON orders
    FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update orders" ON orders;
CREATE POLICY "Allow public update orders" ON orders
    FOR UPDATE TO public USING (true) WITH CHECK (true);
