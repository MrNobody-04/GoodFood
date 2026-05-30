// Good Food Database Service Adapter
// Supports Supabase with automatic local storage fallback for standalone demo testing.

const MOCK_ITEMS = [
  // Non Veg Snacks Chicken
  { id: 'item-nv-1', name: 'Buff Sukuti', description: 'Dry spiced jerky of buffalo meat, cooked with local herbs and spices.', price: 320, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-nv-2', name: 'Buff Choila', description: 'Traditional spiced grilled buffalo meat salad from the Newar cuisine.', price: 300, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-nv-3', name: 'Buff Sukuti Sadeko', description: 'Spiced and marinated dry buffalo meat with onions, tomatoes and garlic.', price: 320, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-nv-4', name: 'Buff Bhutan', description: 'Spicy stir-fry of buffalo offal, a popular Nepalese snack.', price: 320, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-nv-5', name: 'Chicken Lollipop', description: 'Crispy fried chicken drumettes glazed with savory spices.', price: 350, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-nv-6', name: 'Chicken Chilli (w/b)', description: 'Spicy wok-tossed chicken with bone, peppers and onions.', price: 300, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-nv-7', name: 'Chicken Chilli (b/l)', description: 'Boneless wok-tossed chicken chilli with capsicum and rich spices.', price: 340, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1598515214211-89d3e73ae83b?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-nv-8', name: 'Hotwings', description: 'Deep fried chicken wings tossed in signature hot sauce.', price: 350, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-nv-9', name: 'Buffalo Wings', description: 'Crispy wings coated in tangy buffalo sauce served with dip.', price: 350, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-nv-10', name: 'Crispy Chicken', description: 'Golden breaded fried chicken strips served with house special dip.', price: 470, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-nv-11', name: 'Chicken Choila', description: 'Spiced and roasted chicken cubes tossed with mustard oil and fenugreek.', price: 370, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-nv-12', name: 'Chicken Grilled', description: 'Succulent chicken breast marinated in herbs and grilled to perfection.', price: 350, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-nv-13', name: 'Pork Fry', description: 'Savory stir-fried pork chunks cooked with green chillies and garlic.', price: 350, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-nv-14', name: 'Pork Chilly', description: 'Spicy pork stir-fry with peppers, garlic, ginger and dark soy sauce.', price: 370, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-nv-15', name: 'Pork Dameko', description: 'Traditional pan-seared pork with crispy skin and Nepalese seasoning.', price: 350, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1602489114885-33a870b3ac5d?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-nv-16', name: 'Full Leg Fry', description: 'Crispy whole chicken leg seasoned with homestyle spices and deep fried.', price: 300, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-nv-17', name: 'Full Leg Chilly', description: 'Crispy chicken leg cooked in sweet and spicy chilli sauce.', price: 350, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1598515214211-89d3e73ae83b?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-nv-18', name: 'Chicken Whole Grilled', description: 'Whole chicken (1.5 kg+) slow roasted with herbs and tandoor spices.', price: 1500, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1598103442097-8b743e2b95c3?auto=format&fit=crop&w=600&q=80', is_available: true },

  // Veg Snacks
  { id: 'item-v-1', name: 'Alu Jeera', description: 'Boiled potatoes sauteed with cumin seeds and aromatic dry spices.', price: 150, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-v-2', name: 'French Fry', description: 'Classic golden potato fries served with tomato ketchup.', price: 200, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-v-3', name: 'Mustang Alu', description: 'Crispy potato wedges tossed in ginger-garlic paste and local wild herbs.', price: 180, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-v-4', name: 'Chips Chilly', description: 'Spiced french fries stir-fried with capsicum, onions and chilli sauce.', price: 200, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-v-5', name: 'Papad (Veg Snacks)', description: 'Crispy lentil wafers served with green mint chutney.', price: 170, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-v-6', name: 'Mushrooms Fry/Chilly', description: 'Spicy wok-tossed fresh mushrooms with bell peppers and green chillies.', price: 200, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-v-7', name: 'Veg Boil Sothe', description: 'Assorted seasonal vegetables boiled and lightly sauteed in butter.', price: 200, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-v-8', name: 'Veg Pakauda', description: 'Deep fried crispy vegetable fritters spiced with carom seeds.', price: 180, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-v-9', name: 'Onion Rings', description: 'Golden crispy batter-fried onion rings served with mayo sauce.', price: 180, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1639024471283-2bc7b3c6a267?auto=format&fit=crop&w=600&q=80', is_available: true },

  // Sadeko Items
  { id: 'item-sad-1', name: 'Peanut Sadeko', description: 'Crunchy roasted peanuts tossed with onions, green chillies, lime and cilantro.', price: 150, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1607349913338-fca147fc4235?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-sad-2', name: 'Vatmass Sadeko', description: 'Crispy roasted soybeans marinated with hot mustard oil, herbs and red onions.', price: 130, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-sad-3', name: 'Salad Sadeko', description: 'Freshly chopped cucumber, tomatoes, onions seasoned with salt and lime juice.', price: 130, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-sad-4', name: 'Papad Sadeko', description: 'Crushed crispy papad loaded with spiced tomatoes, onions, lime juice and herbs.', price: 170, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-sad-5', name: 'Chicken Sadeko', description: 'Boiled shredded chicken spiced up with local mustard oil, garlic and fresh herbs.', price: 300, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-sad-6', name: 'Waiwai Sadeko', description: 'Instant dry Wai Wai noodles mixed with chopped onions, tomatoes, lime and spice oil.', price: 150, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80', is_available: true },

  // Khaja Set Items
  { id: 'item-ks-1', name: 'Buff Khaja Set', description: 'Traditional Nepali platter with beaten rice (chiura), roasted buff, pickles and curry.', price: 370, category: 'Khaja & Curry', image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-ks-2', name: 'Chicken Khaja Set', description: 'Nepali set with beaten rice, flavorful chicken curry, dry snacks, and spiced pickles.', price: 400, category: 'Khaja & Curry', image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-ks-3', name: 'Pork Khaja Set', description: 'Beaten rice platter served with spicy roasted pork dameko and classic sides.', price: 400, category: 'Khaja & Curry', image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-ks-4', name: 'Veg Khaja Set', description: 'Healthy beaten rice set served with black lentil soup, potato curry, greens and pickles.', price: 200, category: 'Khaja & Curry', image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-ks-5', name: 'Mix Buff Set', description: 'Special combination beaten rice khaja platter featuring assorted buffalo meats.', price: 500, category: 'Khaja & Curry', image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-ks-6', name: 'Mix Chicken Set', description: 'Nepali khaja set loaded with spicy chicken parts, lollipops, beating rice and pickles.', price: 500, category: 'Khaja & Curry', image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80', is_available: true },

  // Special Items
  { id: 'item-sp-1', name: 'Safumichya (5 pcs)', description: 'A Newari delicacy made of buffalo leaf tripe stuffed with marrow (5 pieces).', price: 450, category: 'Special Items', image_url: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-sp-2', name: 'Chicken Ice Cream', description: 'Unique chef\'s special savory chicken appetizers shaped like mini ice creams.', price: 450, category: 'Special Items', image_url: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-sp-3', name: 'Timur Chicken', description: 'Spicy chicken dry-fry infused with Himalayan Sichuan pepper (Timur) and green chillies.', price: 450, category: 'Special Items', image_url: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=600&q=80', is_available: true },

  // Current Noodles Items
  { id: 'item-cn-1', name: 'Pouch Egg Noodles', description: 'Current instant noodles cooked spicy, topped with a soft pouched egg.', price: 130, category: 'Noodles', image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-cn-2', name: 'Fry Sausage Noodles', description: 'Spicy current noodles served with pan-fried local chicken sausages.', price: 180, category: 'Noodles', image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-cn-3', name: 'Egg with Soup Noodles', description: 'Hot and spicy noodle soup with double boiled eggs and green onions.', price: 150, category: 'Noodles', image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-cn-4', name: 'Sausage and Soup Noodles', description: 'Noodle soup bowl cooked extra hot, loaded with chopped sausage slices.', price: 190, category: 'Noodles', image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80', is_available: true },

  // Matka Biriyani Items
  { id: 'item-mb-1', name: 'Chicken Matka Biriyani', description: 'Flavorful long-grain rice layered with spiced chicken in a traditional clay pot.', price: 550, category: 'Biriyani', image_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-mb-2', name: 'Egg Matka Biriyani', description: 'Basmati rice cooked slow with eggs in a sealed clay matka.', price: 500, category: 'Biriyani', image_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80', is_available: true },

  // Biriyani Container
  { id: 'item-bc-1', name: 'Chicken Biriyani Container (450g)', description: 'Takeout container of flavorful chicken biriyani (450 grams portion).', price: 350, category: 'Biriyani', image_url: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-bc-2', name: 'Chicken Biriyani Container (800g)', description: 'Takeout container of flavorful chicken biriyani (800 grams portion).', price: 600, category: 'Biriyani', image_url: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-bc-3', name: 'Chicken Biriyani Container (1200g)', description: 'Takeout container of flavorful chicken biriyani (1200 grams portion).', price: 1100, category: 'Biriyani', image_url: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-bc-4', name: 'Egg Biriyani Container (450g)', description: 'Takeout container of egg biriyani (450 grams portion).', price: 350, category: 'Biriyani', image_url: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-bc-5', name: 'Egg Biriyani Container (800g)', description: 'Takeout container of egg biriyani (800 grams portion).', price: 550, category: 'Biriyani', image_url: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-bc-6', name: 'Egg Biriyani Container (1200g)', description: 'Takeout container of egg biriyani (1200 grams portion).', price: 1000, category: 'Biriyani', image_url: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80', is_available: true },

  // Burger Items
  { id: 'item-burg-1', name: 'Chicken Burger', description: 'Crispy fried chicken patty on fresh lettuce, tomatoes and dynamic burger sauce.', price: 130, category: 'Burgers & Rolls', image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-burg-2', name: 'Buff Burger', description: 'Juicy minced buffalo beef grilled patty served on a soft sesame seed bun.', price: 130, category: 'Burgers & Rolls', image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-burg-3', name: 'Cheese Chicken Burger', description: 'Crispy chicken patty with melted cheddar cheese slice and garlic spread.', price: 180, category: 'Burgers & Rolls', image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-burg-4', name: 'Cheese Buff Burger', description: 'Buffalo beef burger served extra cheesy with melted cheese sauce.', price: 180, category: 'Burgers & Rolls', image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-burg-5', name: 'Ham Burger', description: 'Premium sliced smoked ham layers with lettuce, onions and home recipe sauce.', price: 210, category: 'Burgers & Rolls', image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-burg-6', name: 'Chicken Crispy Burger', description: 'Golden flaky deep-fried chicken breast burger topped with mayonnaise.', price: 160, category: 'Burgers & Rolls', image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-burg-7', name: 'Chicken Crispy Cheese Burger', description: 'Crispy breaded chicken breast fillet burger served with double cheese.', price: 210, category: 'Burgers & Rolls', image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', is_available: true },

  // Katti Roll Items
  { id: 'item-roll-1', name: 'Chicken Katti Roll', description: 'Spiced chicken chunks and sauteed peppers wrapped inside a flaky flatbread paratha.', price: 150, category: 'Burgers & Rolls', image_url: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-roll-2', name: 'Buff Katti Roll', description: 'Marinated buffalo meat chunks with onions and green chutney inside flatbread.', price: 150, category: 'Burgers & Rolls', image_url: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-roll-3', name: 'Mushrooms Katti Roll', description: 'Sauteed mushrooms, onions and peppers tossed inside thin flatbread paratha.', price: 150, category: 'Burgers & Rolls', image_url: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80', is_available: true },

  // Keema Noodles Items
  { id: 'item-km-1', name: 'Buff Keema Noodles', description: 'Flat noodles topped with spicy minced buffalo beef curry sauce.', price: 280, category: 'Noodles', image_url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-km-2', name: 'Chicken Keema Noodles', description: 'Dry stir-fry noodles tossed with delicious minced chicken masala.', price: 280, category: 'Noodles', image_url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-km-3', name: 'Mix Keema Noodles', description: 'Savory noodles loaded with double keema of minced chicken and buff.', price: 350, category: 'Noodles', image_url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-km-4', name: 'Egg Keema Noodles', description: 'Noodles cooked with eggs and a rich layer of spiced chicken keema.', price: 280, category: 'Noodles', image_url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80', is_available: true },

  // Momo Items
  // Buff Momos
  { id: 'item-m-b1', name: 'Buff Momo (Steam)', description: 'Steamed buffalo dumplings filled with fresh minced meat, onions, and spices.', price: 110, category: 'Momo', image_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-m-b2', name: 'Buff Momo (Fry)', description: 'Golden crispy deep-fried buffalo dumplings served with dipping chutney.', price: 140, category: 'Momo', image_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-m-b3', name: 'Buff Momo (Chilly)', description: 'Fried buffalo dumplings tossed in spicy onion, tomato, and bell pepper glaze.', price: 190, category: 'Momo', image_url: 'https://images.unsplash.com/photo-1625220194771-7ebedd0b4a1b?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-m-b4', name: 'Buff Momo (Kothey)', description: 'Pan-fried half-moon shaped buffalo dumplings served with spicy sesame chutney.', price: 160, category: 'Momo', image_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-m-b5', name: 'Buff Momo (Crispy)', description: 'Extra-crispy crunched outer layer coated fried buff momos.', price: 190, category: 'Momo', image_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-m-b6', name: 'Buff Momo (Jhol)', description: 'Steamed buff dumplings submerged in cold, tangy and roasted sesame soup.', price: 160, category: 'Momo', image_url: 'https://images.unsplash.com/photo-1625220194771-7ebedd0b4a1b?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-m-b7', name: 'Buff Momo (Sadeko)', description: 'Fried buff dumplings tossed with spicy raw onions, lime juice and mustard oil.', price: 180, category: 'Momo', image_url: 'https://images.unsplash.com/photo-1625220194771-7ebedd0b4a1b?auto=format&fit=crop&w=600&q=80', is_available: true },
  // Chicken Momos
  { id: 'item-m-c1', name: 'Chicken Momo (Steam)', description: 'Freshly steamed chicken momos stuffed with minced chicken salad and butter.', price: 130, category: 'Momo', image_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-m-c2', name: 'Chicken Momo (Fry)', description: 'Deep fried chicken momo dumplings cooked golden brown.', price: 150, category: 'Momo', image_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-m-c3', name: 'Chicken Momo (Chilly)', description: 'Spicy stir-fry chicken dumplings glazed in rich red chili sauce and peppers.', price: 210, category: 'Momo', image_url: 'https://images.unsplash.com/photo-1625220194771-7ebedd0b4a1b?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-m-c4', name: 'Chicken Momo (Kothey)', description: 'Classic pan-fried potsticker chicken momos with a crispy bottom.', price: 180, category: 'Momo', image_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-m-c5', name: 'Chicken Momo (Crispy)', description: 'Special crunchy crust coated chicken fried momos served with spicy dip.', price: 210, category: 'Momo', image_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-m-c6', name: 'Chicken Momo (Jhol)', description: 'Hot steamed chicken momos submerged in sour sesame peanut soup.', price: 180, category: 'Momo', image_url: 'https://images.unsplash.com/photo-1625220194771-7ebedd0b4a1b?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-m-c7', name: 'Chicken Momo (Sadeko)', description: 'Fried chicken momos tossed with onions, cilantro, lemon and spices.', price: 200, category: 'Momo', image_url: 'https://images.unsplash.com/photo-1625220194771-7ebedd0b4a1b?auto=format&fit=crop&w=600&q=80', is_available: true },

  // Momo Plater
  { id: 'item-mp-1', name: 'Buff Momo Platter', description: 'Huge combination platter of steamed, fried, chilly, and kothey buff momos.', price: 350, category: 'Momo', image_url: 'https://images.unsplash.com/photo-1625220194771-7ebedd0b4a1b?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-mp-2', name: 'Chicken Momo Platter', description: 'Assorted platter of various styles of fresh chicken momos.', price: 400, category: 'Momo', image_url: 'https://images.unsplash.com/photo-1625220194771-7ebedd0b4a1b?auto=format&fit=crop&w=600&q=80', is_available: true },

  // Safale Items
  { id: 'item-saf-1', name: 'Chicken Safale', description: 'Tibetan flatbread stuffed with spiced minced chicken and deep fried.', price: 130, category: 'Momo', image_url: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-saf-2', name: 'Buff Safale', description: 'Tibetan flatbread stuffed with spiced minced buffalo beef and deep fried.', price: 130, category: 'Momo', image_url: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=600&q=80', is_available: true },

  // Chaumien Items
  { id: 'item-ch-1', name: 'Veg Chowmein', description: 'Stir-fried noodles with crisp vegetables and rich soy seasoning.', price: 100, category: 'Noodles', image_url: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-ch-2', name: 'Buff Chowmein', description: 'Stir-fried noodles with tender buffalo meat strips and veggies.', price: 140, category: 'Noodles', image_url: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-ch-3', name: 'Chicken Chowmein', description: 'Wok-tossed noodles with shredded chicken breast and vegetables.', price: 150, category: 'Noodles', image_url: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-ch-4', name: 'Egg Chowmein', description: 'Noodles stir-fried with scrambled eggs and fresh garden greens.', price: 140, category: 'Noodles', image_url: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-ch-5', name: 'Pork Chowmein', description: 'Tossed chowmein noodles cooked with savory sliced pork slices.', price: 170, category: 'Noodles', image_url: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-ch-6', name: 'Keema Chowmein', description: 'Spicy noodles stir-fried with rich minced chicken keema toppings.', price: 170, category: 'Noodles', image_url: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-ch-7', name: 'Mix Chowmein', description: 'Ultimate combination chowmein with chicken, buff, eggs and vegetables.', price: 200, category: 'Noodles', image_url: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80', is_available: true },

  // Pizza Items
  { id: 'item-piz-1', name: 'Chicken Pizza', description: 'Fresh dough topped with spiced grilled chicken pieces, mozzarella and marinara.', price: 450, category: 'Pizza', image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-piz-2', name: 'Mushrooms Pizza', description: 'Bake loaded with fresh button mushrooms, oregano, and double mozzarella.', price: 400, category: 'Pizza', image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-piz-3', name: 'Margerita Pizza', description: 'Classic pizza topped with fresh basil, marinara sauce, and pure olive oil.', price: 400, category: 'Pizza', image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-piz-4', name: 'BBQ Chicken Pizza', description: 'Topped with smoked BBQ shredded chicken, onions, cilantro, and double cheese.', price: 500, category: 'Pizza', image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-piz-5', name: 'Mix Non Veg Pizza', description: 'Supreme pizza with toppings of chicken, buff strips, ham, sausage, and peppers.', price: 600, category: 'Pizza', image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-piz-6', name: 'Salami Pizza', description: 'Loaded with seasoned slices of chicken salami and rich melted cheese crust.', price: 500, category: 'Pizza', image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-piz-7', name: 'Extra Cheese Pizza Addon', description: 'Double down on your favorite pizza with a thick layer of premium mozzarella.', price: 100, category: 'Pizza', image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', is_available: true },

  // Corn Dog
  { id: 'item-cd-1', name: 'Corn Dog (Full Cheese)', description: 'Golden crispy batter-fried Korean style hot dog stuffed with melted mozzarella.', price: 250, category: 'Snacks', image_url: '/image_7.png', is_available: true },

  // Fried Rice Items
  { id: 'item-fr-1', name: 'Chicken/Buff Keema Fried Rice', description: 'Wok fried rice tossed with spicy minced meat keema, peas and carrots.', price: 190, category: 'Rice & Roti', image_url: 'https://images.unsplash.com/photo-1603133872878-6967b6823a4a?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-fr-2', name: 'Chicken Fried Rice', description: 'Savory fried rice cooked with grilled chicken bites, green onion, and eggs.', price: 180, category: 'Rice & Roti', image_url: 'https://images.unsplash.com/photo-1603133872878-6967b6823a4a?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-fr-3', name: 'Buff Fried Rice', description: 'Stir-fried rice tossed with spiced buffalo meat slices and vegetables.', price: 170, category: 'Rice & Roti', image_url: 'https://images.unsplash.com/photo-1603133872878-6967b6823a4a?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-fr-4', name: 'Pork Fried Rice', description: 'Savory fried rice cooked with roasted pork cubes and spices.', price: 200, category: 'Rice & Roti', image_url: 'https://images.unsplash.com/photo-1603133872878-6967b6823a4a?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-fr-5', name: 'Sausage Fried Rice', description: 'Fried rice loaded with sliced fried chicken sausages.', price: 180, category: 'Rice & Roti', image_url: 'https://images.unsplash.com/photo-1603133872878-6967b6823a4a?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-fr-6', name: 'Egg Fried Rice', description: 'Delicious stir-fried rice loaded with scrambled egg flakes.', price: 170, category: 'Rice & Roti', image_url: 'https://images.unsplash.com/photo-1603133872878-6967b6823a4a?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-fr-7', name: 'Mix Fried Rice', description: 'Combination rice featuring chicken, buff slices, sausage, egg, and vegetables.', price: 230, category: 'Rice & Roti', image_url: 'https://images.unsplash.com/photo-1603133872878-6967b6823a4a?auto=format&fit=crop&w=600&q=80', is_available: true },

  // Roti & Rice Items
  { id: 'item-rr-1', name: 'Sukka Roti (per pc)', description: 'Soft, freshly puffed wheat flour flatbread (roti) without butter/oil.', price: 20, category: 'Rice & Roti', image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-rr-2', name: 'Alu Parautha', description: 'Flaky flatbread stuffed with spiced mashed potatoes, pan-fried with butter.', price: 100, category: 'Rice & Roti', image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-rr-3', name: 'Chicken/Buff Parautha', description: 'Crispy paratha bread stuffed with seasoned minced chicken or buff meat.', price: 130, category: 'Rice & Roti', image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-rr-4', name: 'Plain Rice', description: 'Freshly steamed hot long-grain Basmati rice bowl.', price: 100, category: 'Rice & Roti', image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-rr-5', name: 'Biriyani Rice', description: 'Basmati rice cooked in fragrant biryani spices, ghee, saffron, and mint.', price: 150, category: 'Rice & Roti', image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-rr-6', name: 'Jeera Rice Long Range', description: 'Aromatic basmati rice tempered with ghee and whole cumin seeds.', price: 160, category: 'Rice & Roti', image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80', is_available: true },

  // Curry Items
  // Chicken Curry
  { id: 'item-cy-c1', name: 'Chicken Curry (250g)', description: 'Rich gravy chicken curry prepared with Nepalese spices (250g portion).', price: 320, category: 'Khaja & Curry', image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-cy-c2', name: 'Chicken Curry (500g)', description: 'Rich gravy chicken curry prepared with Nepalese spices (500g portion).', price: 600, category: 'Khaja & Curry', image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-cy-c3', name: 'Chicken Curry (1kg)', description: 'Rich gravy chicken curry prepared with Nepalese spices (1kg portion).', price: 1200, category: 'Khaja & Curry', image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80', is_available: true },
  // Buff Curry
  { id: 'item-cy-b1', name: 'Buff Curry (250g)', description: 'Tender buffalo beef slow-cooked in a spicy Nepalese curry broth (250g portion).', price: 300, category: 'Khaja & Curry', image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-cy-b2', name: 'Buff Curry (500g)', description: 'Tender buffalo beef slow-cooked in a spicy Nepalese curry broth (500g portion).', price: 600, category: 'Khaja & Curry', image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-cy-b3', name: 'Buff Curry (1kg)', description: 'Tender buffalo beef slow-cooked in a spicy Nepalese curry broth (1kg portion).', price: 1200, category: 'Khaja & Curry', image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80', is_available: true },
  // Veg Curry
  { id: 'item-cy-v1', name: 'Veg Curry (250g)', description: 'Assorted fresh seasonal garden vegetables cooked in light onion gravy (250g).', price: 200, category: 'Khaja & Curry', image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80', is_available: true },
  { id: 'item-cy-v2', name: 'Veg Curry (500g)', description: 'Assorted fresh seasonal garden vegetables cooked in light onion gravy (500g).', price: 400, category: 'Khaja & Curry', image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80', is_available: true }
];

const MOCK_SETTINGS = {
  whatsapp_number: '+9779811117891',
  support_number: '+9779814562984',
  delivery_available: 'true',
  admin_password: 'admin'
};

// Check for environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
let supabase = null;

const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

if (isSupabaseConfigured) {
  try {
    // Dynamically importing supabase to handle cases where it isn't installed yet
    // or we are running in simple mock environments
    import('@supabase/supabase-js').then(({ createClient }) => {
      supabase = createClient(supabaseUrl, supabaseAnonKey);
      console.log('Good Food: Supabase backend connected.');
    }).catch(err => {
      console.warn('Failed to load Supabase module. Falling back to local storage.', err);
    });
  } catch (e) {
    console.warn('Supabase initialization failed. Using LocalStorage fallback.');
  }
} else {
  console.log('Good Food: Supabase keys missing. Running in Local Preview mode (LocalStorage).');
}

// Local Storage Helper functions
const getLocalData = (key, fallback) => {
  const data = localStorage.getItem(`goodfood_${key}`);
  if (!data) {
    localStorage.setItem(`goodfood_${key}`, JSON.stringify(fallback));
    return fallback;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return fallback;
  }
};

const setLocalData = (key, val) => {
  localStorage.setItem(`goodfood_${key}`, JSON.stringify(val));
};

// Database Service Implementation
export const dbService = {
  // Check if we are currently using Supabase or local storage
  isUsingSupabase: () => isSupabaseConfigured && supabase !== null,

  // Get all menu items
  getMenuItems: async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .order('created_at', { ascending: true });
        if (error) throw error;
        return data;
      } catch (err) {
        console.error('Supabase query error, loading local storage.', err);
      }
    }
    return getLocalData('menu_items', MOCK_ITEMS);
  },

  // Save (insert or update) menu item
  saveMenuItem: async (item) => {
    if (isSupabaseConfigured && supabase) {
      try {
        const isMockOrLocalId = item.id && (item.id.startsWith('mock') || item.id.startsWith('local') || item.id.startsWith('item-'));
        if (item.id && !isMockOrLocalId) {
          // Update
          const { data, error } = await supabase
            .from('menu_items')
            .update({
              name: item.name,
              description: item.description,
              price: Number(item.price),
              category: item.category,
              image_url: item.image_url,
              is_available: item.is_available
            })
            .eq('id', item.id)
            .select();
          if (error) throw error;
          return data[0];
        } else {
          // Insert
          const newItem = { ...item };
          if (newItem.id) delete newItem.id; // Let DB assign UUID
          newItem.price = Number(newItem.price);
          const { data, error } = await supabase
            .from('menu_items')
            .insert([newItem])
            .select();
          if (error) throw error;
          return data[0];
        }
      } catch (err) {
        console.error('Supabase save error, writing to local storage instead.', err);
      }
    }

    // Local Storage CRUD
    const items = getLocalData('menu_items', MOCK_ITEMS);
    if (item.id) {
      const idx = items.findIndex(i => i.id === item.id);
      if (idx !== -1) {
        items[idx] = { ...items[idx], ...item, price: Number(item.price) };
        setLocalData('menu_items', items);
        return items[idx];
      }
    }
    // Create new
    const newItem = {
      ...item,
      id: `local-${Date.now()}`,
      price: Number(item.price),
      is_available: item.is_available ?? true
    };
    items.push(newItem);
    setLocalData('menu_items', items);
    return newItem;
  },

  // Delete menu item
  deleteMenuItem: async (id) => {
    const isMockOrLocalId = id.startsWith('mock') || id.startsWith('local') || id.startsWith('item-');
    if (isSupabaseConfigured && supabase && !isMockOrLocalId) {
      try {
        const { error } = await supabase
          .from('menu_items')
          .delete()
          .eq('id', id);
        if (error) throw error;
        return true;
      } catch (err) {
        console.error('Supabase delete error, modifying local storage instead.', err);
      }
    }

    const items = getLocalData('menu_items', MOCK_ITEMS);
    const filtered = items.filter(i => i.id !== id);
    setLocalData('menu_items', filtered);
    return true;
  },

  // Get Settings (WhatsApp number, delivery hours status, admin password)
  getSettings: async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('*');
        if (error) throw error;
        // Transform settings from key-value rows to an object
        const settingsObj = {};
        data.forEach(s => {
          settingsObj[s.key] = s.value;
        });
        return { ...MOCK_SETTINGS, ...settingsObj };
      } catch (err) {
        console.error('Supabase settings query error, using local settings.', err);
      }
    }

    return getLocalData('settings', MOCK_SETTINGS);
  },

  // Update a single setting
  updateSetting: async (key, value) => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('settings')
          .upsert({ key, value, updated_at: new Date().toISOString() });
        if (error) throw error;
        return true;
      } catch (err) {
        console.error(`Supabase setting update failed for ${key}, using local settings.`, err);
      }
    }

    const settings = getLocalData('settings', MOCK_SETTINGS);
    settings[key] = String(value);
    setLocalData('settings', settings);
    return true;
  },

  // Get all orders
  getOrders: async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
      } catch (err) {
        console.error('Supabase query error for orders, loading local storage.', err);
      }
    }
    return getLocalData('orders', []);
  },

  // Create a new order
  createOrder: async (order) => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('orders')
          .insert([
            {
              customer_name: order.customer_name,
              delivery_address: order.delivery_address,
              items: order.items,
              total_price: Number(order.total_price),
              status: 'Pending'
            }
          ])
          .select();
        if (error) throw error;
        return data[0];
      } catch (err) {
        console.error('Supabase order creation failed, writing to local storage instead.', err);
      }
    }

    // Local Storage Mock
    const orders = getLocalData('orders', []);
    const newOrder = {
      id: `order-local-${Date.now()}`,
      order_number: orders.length + 1001, // Mock sequential Order Number
      customer_name: order.customer_name,
      delivery_address: order.delivery_address,
      items: order.items,
      total_price: Number(order.total_price),
      status: 'Pending',
      created_at: new Date().toISOString()
    };
    orders.push(newOrder);
    setLocalData('orders', orders);
    return newOrder;
  },

  // Update order status (Pending, Preparing, Completed, Cancelled)
  updateOrderStatus: async (id, status) => {
    const isMockOrLocalId = id.toString().startsWith('order-local');
    if (isSupabaseConfigured && supabase && !isMockOrLocalId) {
      try {
        const { data, error } = await supabase
          .from('orders')
          .update({ status, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select();
        if (error) throw error;
        return data[0];
      } catch (err) {
        console.error('Supabase order status update failed, writing to local storage instead.', err);
      }
    }

    const orders = getLocalData('orders', []);
    const idx = orders.findIndex(o => o.id === id);
    if (idx !== -1) {
      orders[idx].status = status;
      orders[idx].updated_at = new Date().toISOString();
      setLocalData('orders', orders);
      return orders[idx];
    }
    return null;
  }
};
