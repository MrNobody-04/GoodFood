# 🍴 Good Food Cloud Kitchen & Restaurant

Good Food is a premium, fully-responsive, and modern full-stack web application designed for a family-owned cloud kitchen offering **24/7 home delivery**. It allows customers to browse menus, add items to a slide-out cart, and place orders directly to the kitchen via WhatsApp. It also features a fully-functional secure admin dashboard to control dishes, prices, availability, and active hours.

---

## 🌟 Key Features

*   **Vibrant & Cozy UI/UX**: Custom design themed around warm homemade food colors, incorporating Outfit & Inter typography, responsive card grids, hover animations, and a seamless Dark/Light Mode.
*   **Slide-Out Shopping Cart**: A fluid sidebar drawer enabling clients to adjust item quantities, insert name & delivery address, and tap to order.
*   **Automated WhatsApp Checkout**: Automatically compiles order summaries, quantities, delivery addresses, and final prices, formatting them into a standard URL redirecting clients to WhatsApp (`https://wa.me/...`).
*   **Secure Admin Panel**: A dashboard for owners to add/edit/delete menu items, upload photos, toggle sold-out status, update the target WhatsApp number, and toggle delivery availability banners. Includes a mockup analytics page.
*   **Dual Database Service Layer**: Works out-of-the-box with **LocalStorage Fallback** if database credentials are not present, allowing local preview editing. Syncs to **Supabase (PostgreSQL)** when keys are supplied.
*   **PWA Installable Experience**: Fully-configured web manifest and meta settings so mobile users can "install" the app on their phone home screens.
*   **SEO Optimizations**: OpenGraph visual banners, meta descriptions, and descriptive head tags built directly into the codebase.

---

## 📂 Folder Structure

```text
GoodFood/
├── public/
│   └── manifest.json         # Web PWA config
├── src/
│   ├── components/
│   │   ├── Admin.jsx         # CRUD admin panel & authentication
│   │   ├── Cart.jsx          # Slide-out basket & checkout router
│   │   ├── FloatingCallButton.jsx # Floating speed dials
│   │   ├── Hero.jsx          # Header tagline and calls-to-action
│   │   ├── Menu.jsx          # Categories grid list & item cards
│   │   ├── Navbar.jsx        # Sticky navigation & theme toggle
│   │   ├── Story.jsx         # About Rohan & Anita's biography
│   │   └── Toast.jsx         # Global floating status notifications
│   ├── db/
│   │   └── schema.sql        # Supabase database script
│   ├── services/
│   │   └── db.js             # Dual-engine database adapter (Supabase / LocalStorage)
│   ├── App.jsx               # Main state orchestrator
│   ├── index.css             # Tailwind base & custom animation scripts
│   └── main.jsx              # React mounting root
├── .env.example              # Environment variables template
├── index.html                # App skeleton & SEO header tags
├── package.json              # Project script & node configurations
├── postcss.config.js         # CSS compiler script
├── tailwind.config.js        # CSS design token mappings
└── vite.config.js            # Build compiler config
```

---

## 💻 Local Quick Start

To run the application locally on your computer, ensure you have **Node.js** (version 16 or above) installed.

1.  **Clone / Copy** this project folder to your local directory.
2.  **Open your terminal** inside the folder (`c:\Users\lenovo\Desktop\GoodFood`).
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Launch the development server**:
    ```bash
    npm run dev
    ```
5.  **Open the local URL**: Go to [http://localhost:3000](http://localhost:3000) in your web browser.

> [!TIP]
> The app runs instantly in **Local Preview Mode**! You can access the Admin Dashboard by selecting the tab, logging in with `admin@goodfood.com` / `admin`, and inserting or deleting items. Changes will save to your browser's local storage.

---

## 🗄️ Setting Up Supabase Database (Free)

To connect the application to a cloud database so your changes are live for all customers, follow these steps:

### Step 1: Create a Supabase Project
1.  Go to [Supabase](https://supabase.com/) and register for a free account.
2.  Click **New Project** and name it (e.g., `Good Food Database`).
3.  Set a database password and choose your nearest hosting region.

### Step 2: Create Tables & Seed Data
1.  In your Supabase project sidebar, click on **SQL Editor** (represented by a query terminal icon `SQL`).
2.  Click **New Query**.
3.  Open the [schema.sql](file:///c:/Users/lenovo/Desktop/GoodFood/src/db/schema.sql) file in your editor, copy the entire SQL script, and paste it into the Supabase SQL editor.
4.  Click **Run**. This will create the `menu_items` and `settings` tables, set up default dishes, configure permissions (RLS), and set default admin configurations.

### Step 3: Link API Keys to App
1.  In Supabase, navigate to **Project Settings** -> **API**.
2.  Find the **Project URL** and the **anon public** API Key.
3.  In your project folder, create a new file named `.env` by copying `.env.example`:
    ```bash
    cp .env.example .env
    ```
4.  Open `.env` and paste your Supabase URL and Anon API key:
    ```env
    VITE_SUPABASE_URL=https://your-unique-project-id.supabase.co
    VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-key-here...
    ```
5.  Restart your local developer server (`npm run dev`). Your app is now connected to your live Supabase database!

---

## 🚀 Free Web Hosting Deployment Guide

You can host this website completely for free without buying a domain.

### Option A: Deploying on Vercel (Recommended)
Vercel integrates directly with GitHub or can be run via command line.

#### Method 1: Using GitHub (Easiest for updates)
1.  Push your code folder to a repository on **GitHub** (e.g., `github.com/your-username/good-food`).
2.  Log in to [Vercel](https://vercel.com/) for free using your GitHub account.
3.  Click **Add New** -> **Project**.
4.  Import your `good-food` repository.
5.  Expand **Environment Variables** and add:
    *   `VITE_SUPABASE_URL` = (your Supabase project URL)
    *   `VITE_SUPABASE_ANON_KEY` = (your Supabase anon key)
6.  Click **Deploy**. Vercel will build and host your website under a free subdomain like `good-food.vercel.app`.

#### Method 2: Using Vercel CLI (Command Line)
1.  Install Vercel CLI globally: `npm install -g vercel`.
2.  Run `vercel login` and authenticate.
3.  Run the command `vercel` in the project root. Follow instructions to deploy.
4.  Run `vercel env add VITE_SUPABASE_URL` and `vercel env add VITE_SUPABASE_ANON_KEY` to link keys.
5.  Run `vercel --prod` to deploy to production.

---

### Option B: Deploying on Netlify
1.  Run the build command locally:
    ```bash
    npm run build
    ```
    This creates a compiled production-ready website inside the `dist/` directory.
2.  Go to [Netlify](https://www.netlify.com/) and register a free account.
3.  Navigate to **Add New Site** -> **Deploy Manually**.
4.  Drag and drop the newly created `dist/` folder from your desktop into the Netlify dashboard upload area.
5.  Go to your site **Site Settings** -> **Environment variables** to add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` keys.
6.  Your site will be live under a free `goodfood.netlify.app` subdomain!

---

## 🔐 Admin Dashboard Security

By default, the Admin dashboard checks the credentials stored in the `settings` database.
*   **Default Login Page**: Accessible by clicking the **Admin Dashboard** link in the navbar.
*   **Default Email**: `admin@goodfood.com`
*   **Default Password**: `admin` (or `admin123` depending on your SQL run).
*   **Updating Password**: You can change the dashboard password directly from the **Order Settings** tab inside the admin panel!
