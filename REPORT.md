# ☀️ SolarShare — Project Report

---

## 1. Simple Abstract (Project Overview)

**SolarShare** is a Peer-to-Peer (P2P) Solar Energy Trading & Carbon Credit Platform that connects rooftop solar panel owners (**Prosumers**) directly with local energy buyers (**Consumers**).

### The Core Problem It Solves:
- **For Prosumers**: Traditional DISCOM power grids pay a very low rate (approx. ₹2.00–₹3.00/kWh) for surplus solar energy fed back to the grid.
- **For Consumers**: Grid electricity rates during peak hours are high (approx. ₹8.00–₹10.00/kWh).

### The SolarShare Solution:
SolarShare creates a direct, transparent marketplace where prosumers sell surplus solar energy at fair market prices (e.g. ₹5.00/kWh).
- **Prosumers earn up to 60% higher revenue** on their solar energy investment.
- **Consumers save up to 30%** on electricity bills.
- **Environment**: Automatically tracks clean energy generation and mints **Green Carbon Credit Certificates**.

---

## 2. Project Structure

The project follows a clean **MERN stack decoupled client-server structure**:

```
SolarShare/
│
├── client/                              # React.js + Vite Frontend
│   ├── public/                          # Favicon and static files
│   └── src/
│       ├── api/                         # Axios client configuration with JWT headers
│       ├── components/                  # Navbar, Footer, ProtectedRoute, DashboardLayout
│       ├── context/                     # AuthContext (JWT session state & user login)
│       ├── pages/                       # Screen Views
│       │   ├── Landing.jsx              # Public landing page
│       │   ├── auth/                    # Login.jsx & Register.jsx
│       │   ├── consumer/                # Consumer Dashboard, Orders, Ledger, Disputes
│       │   ├── prosumer/                # Prosumer Dashboard, Listings, Meter, Carbon Credits
│       │   ├── admin/                   # Admin Command Center, Users, Pricing, Meters
│       │   └── shared/                  # Marketplace, WalletPage, Transactions, Profile
│       ├── App.jsx                      # Page routes setup
│       ├── main.jsx                     # Entry point
│       └── index.css                    # Tailwind CSS styling
│
└── server/                              # Node.js + Express REST API Backend
    ├── config/                          # db.js (MongoDB) & seeder.js (Seed initial data)
    ├── controllers/                     # Core logic for auth, listings, wallet, meters, disputes
    ├── middleware/                      # auth.js (JWT authentication & role checks)
    ├── models/                          # MongoDB Mongoose database schemas
    ├── routes/                          # Express REST API routes definitions
    ├── services/                        # meterSimulator.js (Real-time IoT WebSocket simulator)
    ├── utils/                           # Token generator utility
    ├── .env.example                     # Environment variables schema
    └── server.js                        # Main Express application & Socket.IO server
```

---

## 3. API Endpoints

The backend provides 11 API modules:

### 🔐 Authentication (`/api/auth`)
- `POST /api/auth/register` — Create new Prosumer, Consumer, or Admin account.
- `POST /api/auth/login` — Authenticate user and receive JWT token.
- `POST /api/auth/logout` — Terminate session.
- `GET /api/auth/me` — Fetch current logged-in user profile.
- `PATCH /api/auth/profile` — Update user details or solar capacity.
- `PUT /api/auth/change-password` — Update password.

### ⚡ Energy Trade Listings (`/api/listings`)
- `GET /api/listings` — Get all available active energy listings.
- `POST /api/listings` — Create a new surplus energy sale listing (Prosumer).
- `POST /api/listings/:id/buy` — Buy energy listing with digital wallet (Consumer).
- `DELETE /api/listings/:id` — Cancel an unsold energy listing.

### 📟 Smart Meter Telemetry (`/api/meter`)
- `GET /api/meter/readings` — Fetch historical generation & consumption time-series data.
- `GET /api/meter/live` — Instant live telemetry snapshot (kW generation, voltage).
- `POST /api/meter/simulate` — Inject custom meter generation pulse for testing.

### 💳 Financial Ledger (`/api/transactions`)
- `GET /api/transactions` — Get user's financial transactions (Isolated view for buyer vs seller).
- `GET /api/transactions/:id` — Get detailed trade receipt.

### 💰 Digital Wallet (`/api/wallet`)
- `GET /api/wallet` — Fetch wallet balance and bank details.
- `POST /api/wallet/deposit` — Deposit virtual funds into wallet.
- `POST /api/wallet/withdraw` — Withdraw wallet balance to bank account.

### 🏷️ Dynamic Pricing (`/api/pricing`)
- `GET /api/pricing/current` — Get DISCOM rate, price caps, and surge multiplier.
- `PUT /api/pricing/update` — Update pricing rules (Admin only).

### 🤖 P2P Matching Engine (`/api/matching`)
- `GET /api/matching/recommend` — Get recommended energy listings based on distance & price.
- `POST /api/matching/auto-trade` — Automatically purchase best available energy trade.

### 🌿 Carbon Credit Certificates (`/api/certificates`)
- `GET /api/certificates` — View earned Green Carbon Credit certificates.
- `POST /api/certificates/claim` — Claim green carbon credits for solar generation.

### ⚖️ Dispute Resolution (`/api/disputes`)
- `GET /api/disputes` — List trade disputes.
- `POST /api/disputes` — Open trade delivery dispute.
- `PUT /api/disputes/:id/resolve` — Arbitrate dispute and issue refund (Admin only).

### 🔔 Notifications (`/api/notifications`)
- `GET /api/notifications` — Fetch user alerts and trade updates.
- `PATCH /api/notifications/read` — Mark notifications as read.

### ⚙️ Admin Panel (`/api/admin`)
- `GET /api/admin/stats` — Platform system analytics and grid health.
- `GET /api/admin/users` — Manage and search user accounts.
- `PATCH /api/admin/users/:id/status` — Activate/suspend user accounts.

---

## 4. MongoDB Database Schemas

The database uses 9 Mongoose collections:

1. **User Schema (`User.js`)**: Name, email, password (hashed), role (`prosumer`/`consumer`/`admin`), phone, city, solar panel capacity (kW), KYC status.
2. **Listing Schema (`Listing.js`)**: Prosumer reference, energy volume (kWh), price per kWh, delivery status (`active`, `sold`, `cancelled`).
3. **Transaction Schema (`Transaction.js`)**: Listing reference, buyer, seller, energy amount, total price, timestamp, settlement status.
4. **Wallet Schema (`Wallet.js`)**: User reference, current balance, transaction ledger history.
5. **MeterReading Schema (`MeterReading.js`)**: User reference, generation (kW), consumption (kW), grid voltage (V), timestamp.
6. **PricingSetting Schema (`PricingSetting.js`)**: DISCOM baseline rate, price floor, price ceiling, surge multiplier.
7. **CarbonCredit Schema (`CarbonCredit.js`)**: Prosumer reference, energy generated, $\text{CO}_2$ offset amount, certificate code.
8. **Dispute Schema (`Dispute.js`)**: Transaction reference, complainant, reason, evidence status, admin resolution notes.
9. **Notification Schema (`Notification.js`)**: Target user, message title, content, read status.

---

## 5. Technologies & NPM Libraries

### Backend Libraries (`server/package.json`)
- **`express`**: Web framework for REST API routing and middleware execution.
- **`mongoose`**: Object Data Modeling (ODM) library for MongoDB.
- **`jsonwebtoken`**: Stateless JWT token generation and authentication verification.
- **`bcryptjs`**: Password hashing algorithm with salt generation.
- **`cors`**: Cross-Origin Resource Sharing middleware for frontend integration.
- **`dotenv`**: Loads environment variables from `.env` file.
- **`cookie-parser`**: Parses incoming HTTP request cookies.
- **`socket.io`**: Real-time bi-directional WebSocket server engine.
- **`nodemon`** *(Dev)*: Automatically restarts Node server on file edits.

### Frontend Libraries (`client/package.json`)
- **`react` & `react-dom`**: UI component rendering engine.
- **`react-router-dom`**: Client-side single page application (SPA) routing.
- **`axios`**: HTTP request library with Authorization header interceptors.
- **`lucide-react`**: Vector icons suite for dashboard UX.
- **`recharts`**: Data charts for energy generation and financial graphs.
- **`socket.io-client`**: Real-time WebSocket connection to backend.
- **`vite`**: High-performance frontend build tool.
- **`tailwindcss`**: Utility-first CSS framework.

---

## 6. How to Run & Work on the Project

### Step 1: Clone & Setup Environment

1. Navigate to the server directory:
   ```bash
   cd D:\SolarShare\server
   ```
2. Create `.env` file inside `server/` (copy from `.env.example`):
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/solarshare
   JWT_SECRET=your_secret_key_here
   CLIENT_URL=http://localhost:5173
   ADMIN_REGISTRATION_CODE=solar@admin123
   ```

---

### Step 2: Install Dependencies & Run Backend Server

1. In `server` directory:
   ```bash
   npm install
   npm run dev
   ```
2. Output:
   - Server runs on `http://localhost:5000`
   - Connected to MongoDB Atlas
   - Initial demo seed data initialized automatically.

---

### Step 3: Install Dependencies & Run Frontend Client

1. Open a new terminal and navigate to client:
   ```bash
   cd D:\SolarShare\client
   npm install
   npm run dev
   ```
2. Open your browser at `http://localhost:5173`.

---

### Step 4: Login with Demo Accounts

- **Admin Account**:
  - Email: `admin@solarshare.com`
  - Password: `password123`
- **Prosumer Account** (Solar Producer):
  - Email: `prosumer1@solarshare.com`
  - Password: `password123`
- **Consumer Account** (Energy Buyer):
  - Email: `consumer1@solarshare.com`
  - Password: `password123`

---

## 7. Deployment Status

- **Frontend**: Live on **Vercel** (`https://solar-share-seven.vercel.app`)
- **Backend API**: Live on **Render** (`https://solarshare-05yw.onrender.com`)
- **Database**: Live on **MongoDB Atlas**
