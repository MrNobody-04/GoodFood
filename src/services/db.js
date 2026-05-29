// Good Food Database Service Adapter
// Supports Supabase with automatic local storage fallback for standalone demo testing.

const MOCK_ITEMS = [
  {
    id: 'mock-1',
    name: 'Classic Cheese Pizza',
    description: 'Freshly baked hand-tossed dough with pure mozzarella cheese and house special marinara sauce.',
    price: 650,
    category: 'Pizza',
    image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    is_available: true
  },
  {
    id: 'mock-2',
    name: 'Spicy Chicken Burger',
    description: 'Crispy fried chicken breast fillet on a bed of fresh lettuce, onion, tomato and spicy mayo sauce.',
    price: 350,
    category: 'Burgers',
    image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    is_available: true
  },
  {
    id: 'mock-3',
    name: 'Steamed Chicken Momo',
    description: 'Handmade Nepalese dumplings filled with seasoned minced chicken, served with spicy tomato chutney.',
    price: 250,
    category: 'Momo',
    image_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    is_available: true
  },
  {
    id: 'mock-4',
    name: 'Jhol Momo Special',
    description: 'Steamed veg dumplings served drowned in cold, tangy and sesame seeds flavoured soup (Jhol).',
    price: 280,
    category: 'Momo',
    image_url: 'https://images.unsplash.com/photo-1625220194771-7ebedd0b4a1b?auto=format&fit=crop&w=600&q=80',
    is_available: true
  },
  {
    id: 'mock-5',
    name: 'Nepali Thakali Khana Set',
    description: 'Authentic Thakali platter with local rice, black lentil soup (daal), local ghee, leafy greens, chicken curry, and pickles.',
    price: 450,
    category: 'Nepali Foods',
    image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    is_available: true
  },
  {
    id: 'mock-6',
    name: 'Himalayan Iced Tea',
    description: 'Refreshing cold brew black tea infused with fresh mint and local mountain honey.',
    price: 120,
    category: 'Drinks',
    image_url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    is_available: true
  },
  {
    id: 'mock-7',
    name: 'Warm Chocolate Brownie',
    description: 'Rich fudge chocolate brownie served with warm chocolate syrup drizzle and powder dust.',
    price: 180,
    category: 'Desserts',
    image_url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    is_available: true
  }
];

const MOCK_SETTINGS = {
  whatsapp_number: '+9779801234567',
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
        if (item.id && !item.id.startsWith('mock')) {
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
    if (isSupabaseConfigured && supabase && !id.startsWith('mock') && !id.startsWith('local')) {
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
  }
};
