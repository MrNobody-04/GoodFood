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
('whatsapp_number', '+977981111891'),
('delivery_available', 'true'),
('admin_password', 'admin123') -- Fallback standard password, can be changed
ON CONFLICT (key) DO NOTHING;

-- Seed initial menu items for visual richness out-of-the-box
INSERT INTO menu_items (name, description, price, category, image_url, is_available)
VALUES
('Classic Cheese Pizza', 'Freshly baked hand-tossed dough with pure mozzarella cheese and house special marinara sauce.', 650, 'Pizza', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', true),
('Spicy Chicken Burger', 'Crispy fried chicken breast fillet on a bed of fresh lettuce, onion, tomato and spicy mayo sauce.', 350, 'Burgers', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', true),
('Steamed Chicken Momo', 'Handmade Nepalese dumplings filled with seasoned minced chicken, served with spicy tomato chutney.', 250, 'Momo', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', true),
('Jhol Momo Special', 'Steamed veg dumplings served drowned in cold, tangy and sesame seeds flavoured soup (Jhol).', 280, 'Momo', 'https://images.unsplash.com/photo-1625220194771-7ebedd0b4a1b?auto=format&fit=crop&w=600&q=80', true),
('Nepali Thakali Khana Set', 'Authentic Thakali platter with local rice, black lentil soup (daal), local ghee, leafy greens, chicken curry, and pickles.', 450, 'Nepali Foods', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80', true),
('Himalayan Iced Tea', 'Refreshing cold brew black tea infused with fresh mint and local mountain honey.', 120, 'Drinks', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80', true),
('Warm Chocolate Brownie', 'Rich fudge chocolate brownie served with warm chocolate syrup drizzle and powder dust.', 180, 'Desserts', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80', true)
ON CONFLICT DO NOTHING;

-- RLS (Row Level Security) Configuration
-- Enable RLS for security
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create Policies for menu_items (Anyone can read, Admins can write)
CREATE POLICY "Allow public read menu_items" ON menu_items
    FOR SELECT TO public USING (true);

CREATE POLICY "Allow all writes for authenticated admins on menu_items" ON menu_items
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Create Policies for settings (Anyone can read, Admins can write)
CREATE POLICY "Allow public read settings" ON settings
    FOR SELECT TO public USING (true);

CREATE POLICY "Allow all writes for authenticated admins on settings" ON settings
    FOR ALL TO authenticated USING (true) WITH CHECK (true);
