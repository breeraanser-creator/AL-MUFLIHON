# AL-MUFLIHON (المفلحون) - Luxury Clothing Brand Full-Stack Web App

> **"Wear • Believe • Succeed"** — Established in 2024. High-end modest luxury fashion, bespoke Saudi thobes, handcrafted cashmere shawls, opulent abayas, and pure linen festive kurta collections.

---

## 🎨 Official Brand Color Scheme

| Color Name | Hex Code | Purpose & Usage |
| :--- | :--- | :--- |
| **Imperial Plum** | `#601D49` | Primary Brand Color (Buttons, Emblems, Headings, Header/Footer) |
| **Blush Rose** | `#EA9D9D` | Secondary Accent (Badges, Callout texts, Highlights, Hover states) |
| **Warm Cream / Ivory** | `#FDF4D2` | Surface & Backgrounds (Cards, Neutral contrasts, Section tints) |
| **Sage Mint** | `#8BBB92` | Success & Prosperity Accent (In-stock tags, Delivery badges, Metrics) |

---

## 📂 Project Architecture

```
d:/AL-MUFLIHON/
├── client/                     # Frontend UI (React 18 + Vite + Tailwind CSS + Redux Toolkit)
│   ├── public/
│   │   └── logo.jpg            # Brand circular logo (المفلحون)
│   ├── src/
│   │   ├── assets/             # Brand logos & graphics
│   │   ├── components/         # Modular UI Components (Navbar, Footer, CartDrawer, ProductCard, SEO, Toast)
│   │   ├── pages/              # Complete Views
│   │   │   ├── Home.jsx        # Hero, Arabic Calligraphy, Curated Collections, Reviews
│   │   │   ├── Shop.jsx        # Product Catalog with Search, Category Filter & Price Slider
│   │   │   ├── ProductDetail.jsx # Gallery, Sizing Guide Table, Color Swatches, Review Submissions
│   │   │   ├── About.jsx       # Brand Philosophy ("المفلحون"), Craftsmanship & Ethics
│   │   │   ├── Signup.jsx      # Registration form with validation
│   │   │   ├── Login.jsx       # Authentication form & demo quick login
│   │   │   ├── ForgotPassword.jsx # Token generation & instructions
│   │   │   ├── ResetPassword.jsx  # New password confirmation
│   │   │   ├── Dashboard.jsx   # Tabbed client portal (Orders & Tracking, Profile, Addresses, Password)
│   │   │   ├── Checkout.jsx    # Complete checkout with Delivery Address & Payment Method
│   │   │   └── NotFound.jsx    # 404 Custom Error Page
│   │   ├── redux/              # Redux Toolkit
│   │   │   ├── store.js        # Configured Redux store
│   │   │   └── slices/         # authSlice, cartSlice, productSlice, uiSlice
│   │   ├── services/
│   │   │   └── api.js          # Axios client with JWT interceptor & offline fallback
│   │   ├── data/
│   │   │   └── mockProducts.js # Catalog inventory dataset
│   │   ├── App.jsx             # React router configuration
│   │   ├── index.css           # Tailwind design tokens & custom typography
│   │   └── main.jsx
│   ├── tailwind.config.js      # Tailored theme tokens (#601D49, #EA9D9D, #FDF4D2, #8BBB92)
│   └── package.json
│
└── server/                     # Backend REST API (Node.js + Express + MongoDB)
    ├── config/
    │   └── db.js               # MongoDB Mongoose connection
    ├── controllers/
    │   ├── authController.js   # register, login, forgotPassword, resetPassword, changePassword
    │   ├── productController.js# getProducts, getFeatured, getById, createReview
    │   ├── orderController.js  # createOrder, getMyOrders, getById
    │   └── userController.js   # updateProfile, getWishlist, toggleWishlist
    ├── middleware/
    │   ├── authMiddleware.js   # JWT verification & Admin authorization
    │   └── errorMiddleware.js  # Global error handling & 404 handler
    ├── models/
    │   ├── User.js             # User schema with bcrypt & reset token generator
    │   ├── Product.js          # Product schema with sizes, colors, fabric, reviews
    │   └── Order.js            # Order schema with shipping address, tracking & status
    ├── routes/
    │   ├── authRoutes.js       # /api/auth/*
    │   ├── productRoutes.js    # /api/products/*
    │   ├── orderRoutes.js      # /api/orders/*
    │   └── userRoutes.js       # /api/users/*
    ├── utils/
    │   ├── generateToken.js    # JWT token generator
    │   └── seeder.js           # Database seeder with luxury inventory
    ├── .env                    # Server environment variables
    ├── server.js               # Express application entry point
    └── package.json
```

---

## 🚀 How to Run Locally

### 1. Start the Backend API Server:
```bash
cd server
npm run dev
# Server will run on http://localhost:5000
```

### 2. Seed Database (Optional):
```bash
cd server
npm run seed
```

### 3. Start the Frontend Client:
```bash
cd client
npm run dev
# Client will run on http://localhost:5173
```

---

## 💎 Features Included

1. **Brand Identity & Logo:** The circular emblem with Arabic calligraphy *اَلْمُفْلِحُوْنَ* and *WEAR • BELIEVE • SUCCEED* is integrated into the navigation, hero section, footer, and authentication screens.
2. **Redux State Management:** Cart items and calculations are persisted in `localStorage`. Auth tokens and user state are fully managed via Redux Toolkit.
3. **Complete Authentication:**
   - Registration with password confirmation (`/signup`)
   - Login with token extraction (`/login`)
   - Forgot Password with verification token creation (`/forgot-password`)
   - Reset Password with token validation (`/reset-password/:token`)
   - Change Password inside User Dashboard
4. **Interactive Store & Checkout:**
   - Dynamic search, category filtering, and price slider.
   - Size selection (S, M, L, XL, XXL) and interactive size guide chart.
   - Slide-over Cart Drawer with real-time free shipping meter.
   - Complete checkout flow with multi-method payment support (COD, Card, EasyPaisa, JazzCash).
5. **Client Dashboard:** Real-time tracking of orders with tracking reference numbers (`AMF-XXXXXX`), address book management, and profile customization.
6. **SEO & Metadata:** Automated `<title>`, `<meta name="description">`, and OpenGraph headers.
