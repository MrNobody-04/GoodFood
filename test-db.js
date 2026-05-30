import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Parse .env manually to avoid extra dependencies
const envPath = path.resolve('./.env');
let supabaseUrl = '';
let supabaseAnonKey = '';

try {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const lines = envContent.split('\n');
  for (const line of lines) {
    const match = line.match(/^\s*VITE_SUPABASE_URL\s*=\s*(.+)$/);
    if (match) supabaseUrl = match[1].trim();
    const matchKey = line.match(/^\s*VITE_SUPABASE_ANON_KEY\s*=\s*(.+)$/);
    if (matchKey) supabaseAnonKey = matchKey[1].trim();
  }
} catch (e) {
  console.error('Error reading .env file:', e.message);
}

console.log('Parsed Supabase URL:', supabaseUrl);
console.log('Parsed Supabase Anon Key:', supabaseAnonKey ? 'Found' : 'Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Keys are missing from .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function runTest() {
  try {
    const { data, error } = await supabase.from('menu_items').select('*').limit(5);
    if (error) {
      console.error('Error fetching menu items:', error.message);
      console.error(error);
    } else {
      console.log('SUCCESS! Connected to Supabase menu_items table.');
      console.log(`Fetched ${data.length} items from database.`);
      if (data.length > 0) {
        console.log('Sample item from DB:', data[0]);
      } else {
        console.log('Table is empty.');
      }
    }
  } catch (err) {
    console.error('Unexpected connection error:', err.message);
  }
}

runTest();
