# SolarShare — Peer-to-Peer (P2P) Solar Energy Trading & Carbon Credit Platform
## Complete Technical Documentation & Architectural Blueprint

---

## 1. Abstraction (Abstract & System Architecture)

### 1.1 Executive Abstract
**SolarShare** is a next-generation, decentralized Peer-to-Peer (P2P) solar energy trading and carbon credit monetization ecosystem designed to bridge rooftop solar producers (**Prosumers**) directly with local energy buyers (**Consumers**). 

Traditional DISCOM (Distribution Company) net-metering models provide low buyback tariffs (often ₹2.00–₹3.00/kWh) to prosumers while charging consumers high peak tariffs (₹7.00–₹10.00/kWh). SolarShare disrupts this monopoly by introducing an automated, transparent, and secure marketplace where prosumers sell surplus clean energy at fair market prices (e.g., ₹4.50–₹5.50/kWh). This creates a win-win financial model: **prosumers earn up to 60% higher returns on their solar investments**, and **consumers cut their electricity bills by up to 30%**.

Beyond energy trading, SolarShare incorporates:
1. **IoT Smart Meter Simulator & Telemetry Engine**: Provides real-time WebSocket generation/consumption streams and grid voltage monitoring.
2. **Automated P2P Order Matching Engine**: Matches buyers and sellers based on geographical proximity, pricing preference, and energy volume.
3. **Escrow-Backed Digital Wallet System**: Guarantees zero-counterparty risk with instant settlement upon smart meter verification.
4. **Tokenized Carbon Credit Minting**: Automatically generates verified Green Energy Certificates (RECs) based on environmental emission reduction metrics ($0.85 \text{ kg } \text{CO}_2 \text{ saved per kWh}$).

---

### 1.2 System Vision & Architectural Overview

SolarShare follows a **decoupled Client-Server Architecture** powered by modern RESTful APIs and real-time WebSockets.

```
+-----------------------------------------------------------------------------------+
|                                 CLIENT LAYER                                      |
|  React 18 + Vite | Tailwind CSS | Socket.IO Client | Recharts | Context API       |
+-----------------------------------------------------------------------------------+
                                         |
                       HTTP / REST APIs  |  WebSockets (WS)
                                         v
+-----------------------------------------------------------------------------------+
|                                 SERVER LAYER                                      |
|  Node.js + Express.js | JWT Auth | Socket.IO Server | Order Matching Engine       |
+-----------------------------------------------------------------------------------+
                                         |
                    Mongoose ODM         |  Meter Simulation Engine
                                         v
+-----------------------------------------------------------------------------------+
|                                 DATA & INFRASTRUCTURE                             |
|  MongoDB Atlas (NoSQL) | Render (Server Hosting) | Vercel (Client Hosting)        |
+-----------------------------------------------------------------------------------+
```

---

## 2. Technology Stack

SolarShare is engineered using industry-standard, high-performance web technologies:

| Layer | Technology | Purpose & Usage |
| :--- | :--- | :--- |
| **Frontend Framework** | React.js 18 + Vite | Component-based UI with fast Hot Module Replacement (HMR) and optimized build bundling. |
| **Styling & Design System**| Tailwind CSS | Utility-first CSS framework providing a sleek, modern, dark/light glassmorphic UI. |
| **Icons & Visuals** | Lucide React | Modern, clean vector icon suite for intuitive dashboard UX. |
| **Data Visualization** | Recharts | Responsive, interactive charts for real-time solar generation and financial analytics. |
| **HTTP Client** | Axios | Configured with base URLs, interceptors for JWT `Authorization: Bearer` headers, and credentials. |
| **Real-time Engine** | Socket.io & Socket.io-client | Bi-directional WebSocket channels for live smart meter telemetry and grid status broadcasts. |
| **Backend Runtime** | Node.js (v20+) | Asynchronous event-driven JavaScript runtime environment for backend logic execution. |
| **Web Framework** | Express.js | Robust REST API server framework with route grouping, CORS, and central error handling middleware. |
| **Database** | MongoDB Atlas | Cloud-hosted NoSQL database storing user profiles, listings, transactions, wallets, and disputes. |
| **Object Data Modeling**| Mongoose ODM | Schema validation, hooks, indexing, population, and structured query builder for MongoDB. |
| **Security & Auth** | JSON Web Token (JWT) & Bcrypt.js | Stateless JWT bearer token authentication and salted hash password encryption. |
| **Hosting & CI/CD** | Vercel (Client) & Render (Server)| Automated production deployment pipelines with cross-origin handling. |

---

## 3. Directory & Folder Structure

SolarShare uses a strict modular project organization segregating concerns into domain-driven modules.

```
SolarShare/
│
├── client/                              # React 18 + Vite Frontend Application
│   ├── public/                          # Static assets and favicon
│   ├── src/
│   │   ├── api/                         # HTTP API Configuration
│   │   │   └── axios.js                 # Axios instance with auth interceptors & base URL
│   │   ├── components/                  # Reusable UI Components
│   │   │   ├── Footer.jsx               # Global platform footer
│   │   │   ├── Navbar.jsx               # Navigation bar with role-based links & auth buttons
│   │   │   ├── ProtectedRoute.jsx       # Route guard enforcing authentication & role permissions
│   │   │   └── DashboardLayout.jsx      # Shared sidebar layout for Prosumer, Consumer & Admin
│   │   ├── context/                     # Global State Management
│   │   │   └── AuthContext.jsx          # Auth provider managing JWT, user profile & session state
│   │   ├── pages/                       # Screen Views & Dashboards
│   │   │   ├── Landing.jsx              # High-converting marketing homepage
│   │   │   ├── admin/                   # Admin Command & Control Panel Views
│   │   │   │   ├── AdminDashboard.jsx   # Grid health summary & platform analytics
│   │   │   │   ├── AdminUsers.jsx       # User management, role assignment & suspension
│   │   │   │   ├── AdminListings.jsx    # Moderation of energy trade listings
│   │   │   │   ├── AdminMeters.jsx      # Grid smart meter monitoring & override
│   │   │   │   ├── AdminPricing.jsx     # Tariff controls & surge pricing settings
│   │   │   │   ├── AdminReports.jsx     # Financial & environmental report export
│   │   │   │   ├── AdminDisputes.jsx    # Dispute arbitration panel
│   │   │   │   └── AdminCarbon.jsx      # Carbon credit pool management
│   │   │   ├── auth/                    # Authentication Views
│   │   │   │   ├── Login.jsx            # Sign-in form
│   │   │   │   └── Register.jsx         # Multi-role registration (Prosumer/Consumer/Admin)
│   │   │   ├── consumer/                # Consumer Portal Views
│   │   │   │   ├── ConsumerDashboard.jsx# Green energy consumption overview
│   │   │   │   ├── ConsumerOrders.jsx   # Purchased energy orders & status
│   │   │   │   ├── ConsumerLedger.jsx   # Dedicated consumer purchase transaction history
│   │   │   │   ├── ConsumerDisputes.jsx # Dispute filing for failed energy delivery
│   │   │   │   └── ConsumerCarbon.jsx   # Purchased green offsets & environmental impact
│   │   │   ├── prosumer/                # Prosumer Portal Views
│   │   │   │   ├── ProsumerDashboard.jsx# Live generation & revenue performance
│   │   │   │   ├── ListingsPage.jsx     # Create & manage surplus energy listings
│   │   │   │   ├── ProsumerSmartMeter.jsx# Live IoT telemetry simulation view
│   │   │   │   ├── ProsumerCarbon.jsx   # Earned carbon credit certificate manager
│   │   │   │   └── ProsumerCertificates.jsx# Downloadable REC certificates
│   │   │   └── shared/                  # Shared Authenticated Screens
│   │   │       ├── Marketplace.jsx      # Real-time P2P energy trading marketplace
│   │   │       ├── WalletPage.jsx       # Digital wallet deposit, withdrawal & ledger
│   │   │       ├── TransactionsPage.jsx # Complete transaction history
│   │   │       └── ProfilePage.jsx      # Account settings & KYC management
│   │   ├── App.jsx                      # React Router v6 routing definition & layout bindings
│   │   ├── main.jsx                     # Application root entry point
│   │   └── index.css                    # Tailwind CSS custom utilities & global styles
│   ├── package.json                     # Frontend dependencies & scripts
│   └── vite.config.js                   # Vite build & proxy settings
│
└── server/                              # Node.js + Express REST API Backend
    ├── config/                          # Database & System Configuration
    │   ├── db.js                        # MongoDB Mongoose connection handler
    │   └── seeder.js                    # Initial database seed script (Admin, demo users & listings)
    ├── controllers/                     # Business Logic Controllers
    │   ├── adminController.js           # Platform stats, user management & grid telemetry
    │   ├── authController.js            # User registration, login, JWT issuance & profile updates
    │   ├── certificateController.js    # Carbon credit green certificate minting & PDF generation
    │   ├── disputeController.js        # Trade dispute initiation, evidence submission & resolution
    │   ├── listingController.js        # P2P energy trade listing creation, purchasing & cancellation
    │   ├── matchingController.js       # Proximity & price matching engine algorithm
    │   ├── meterController.js          # IoT smart meter data ingestion & history
    │   ├── notificationController.js   # In-app notifications & alerts
    │   ├── pricingController.js        # Dynamic pricing rules & DISCOM rate benchmarks
    │   ├── transactionController.js    # Financial transaction ledger queries & isolation
    │   └── walletController.js         # Digital wallet balance updates, deposits & withdrawals
    ├── middleware/                      # Custom Express Middleware
    │   └── auth.js                      # JWT verification (`protect`) & Role authorization (`authorize`)
    ├── models/                          # Mongoose Database Schemas
    │   ├── User.js                      # User accounts, roles, solar capacity & KYC details
    │   ├── Listing.js                   # Active & completed P2P energy trade listings
    │   ├── Transaction.js               # Escrow transactions & settlement logs
    │   ├── Wallet.js                    # User digital balances & wallet ledger
    │   ├── MeterReading.js              # Time-series smart meter generation/consumption data
    │   ├── PricingSetting.js            # System-wide dynamic tariff parameters
    │   ├── CarbonCredit.js              # Minted carbon credits & green certificates
    │   ├── Dispute.js                   # Trade dispute records & evidence
    │   └── Notification.js             # User notification queue
    ├── routes/                          # Express API Route Definitions
    │   ├── adminRoutes.js
    │   ├── authRoutes.js
    │   ├── certificateRoutes.js
    │   ├── disputeRoutes.js
    │   ├── listingRoutes.js
    │   ├── matchingRoutes.js
    │   ├── meterRoutes.js
    │   ├── notificationRoutes.js
    │   ├── pricingRoutes.js
    │   ├── transactionRoutes.js
    │   └── walletRoutes.js
    ├── services/                        # System Services & Background Jobs
    │   └── meterSimulator.js            # Live IoT smart meter simulator emitting WebSocket events
    ├── utils/                           # Helper Utilities
    │   └── generateToken.js             # JWT signing utility
    ├── .env.example                     # Environment variables schema template
    ├── package.json                     # Backend dependencies & npm scripts
    └── server.js                        # Express server entry point & Socket.IO server initialization
```

---

## 4. Comprehensive REST API Specifications

SolarShare exposes 11 domain REST API modules. All protected endpoints require a valid JWT token sent via `Authorization: Bearer <token>` or HTTP-only cookies.

### 4.1 Authentication Module (`/api/auth`)

| Endpoint | Method | Access | Description | Request Body / Params | Response Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/auth/register` | `POST` | Public | Registers a new Prosumer, Consumer, or Admin user. Auto-initializes wallet. | `{ name, email, password, role, phone, city, capacityKw, adminCode }` | `201 Created` with User object & JWT token |
| `/api/auth/login` | `POST` | Public | Authenticates credentials and returns JWT token & user object. | `{ email, password }` | `200 OK` with User object & JWT token |
| `/api/auth/logout` | `POST` | Public | Clears authentication cookies and terminates session. | None | `200 OK` `{ message: "Logged out" }` |
| `/api/auth/me` | `GET` | Protected | Retrieves current authenticated user session data. | None | `200 OK` with User object |
| `/api/auth/profile` | `PATCH` | Protected | Updates profile information, solar capacity, or KYC details. | `{ name, phone, city, capacityKw, aadhaarNumber, panNumber }` | `200 OK` with updated User object |
| `/api/auth/change-password`| `PUT` | Protected | Changes account password after verifying current password. | `{ currentPassword, newPassword }` | `200 OK` `{ message: "Password updated" }` |

---

### 4.2 P2P Energy Listings Module (`/api/listings`)

| Endpoint | Method | Access | Description | Request Body / Params | Response Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/listings` | `GET` | Public | Retrieves all active surplus energy trade listings in the marketplace. | Query parameters: `status`, `minPrice`, `maxPrice` | `200 OK` array of Listing objects |
| `/api/listings` | `POST` | Prosumer | Creates a new energy trade listing specifying energy volume and unit price. | `{ energyAmount, pricePerKwh, deliveryTime }` | `201 Created` with Listing object |
| `/api/listings/:id/buy` | `POST` | Consumer | Purchases an energy listing. Transfers funds to escrow and settles trade. | URL param: `id` | `200 OK` with Transaction & updated Listing |
| `/api/listings/:id` | `DELETE`| Prosumer/Admin| Cancels an active unsold listing. | URL param: `id` | `200 OK` `{ message: "Listing cancelled" }` |

---

### 4.3 IoT Smart Meter Telemetry Module (`/api/meter`)

| Endpoint | Method | Access | Description | Request Body / Params | Response Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/meter/readings` | `GET` | Protected | Fetches historical smart meter readings for generation and consumption. | Query params: `range` (`1h`, `24h`, `7d`) | `200 OK` time-series data array |
| `/api/meter/live` | `GET` | Protected | Retrieves instantaneous generation (kW), consumption (kW), and voltage (V). | None | `200 OK` live telemetry snapshot |
| `/api/meter/simulate` | `POST` | Prosumer/Admin| Triggers custom smart meter pulse injection for testing grid dynamic load. | `{ generationKw, consumptionKw, gridVoltage }` | `200 OK` updated telemetry status |

---

### 4.4 Financial Transactions & Isolated Ledgers (`/api/transactions`)

| Endpoint | Method | Access | Description | Request Body / Params | Response Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/transactions` | `GET` | Protected | Retrieves user's financial transactions (Isolated view for Consumer purchases / Prosumer sales). | Query params: `type`, `page`, `limit` | `200 OK` paginated transaction ledger |
| `/api/transactions/:id` | `GET` | Protected | Fetches detailed receipt for a specific energy trade transaction. | URL param: `id` | `200 OK` Transaction object with listing & user details |

---

### 4.5 Digital Wallet Module (`/api/wallet`)

| Endpoint | Method | Access | Description | Request Body / Params | Response Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/wallet` | `GET` | Protected | Fetches user's current wallet balance and linked bank payout accounts. | None | `200 OK` Wallet object |
| `/api/wallet/deposit` | `POST` | Protected | Adds virtual demo funds to wallet for testing marketplace transactions. | `{ amount }` | `200 OK` with updated balance |
| `/api/wallet/withdraw` | `POST` | Protected | Initiates withdrawal request to linked bank account. | `{ amount, bankDetails }` | `200 OK` with updated balance & withdrawal log |

---

### 4.6 Dynamic Pricing Engine Module (`/api/pricing`)

| Endpoint | Method | Access | Description | Request Body / Params | Response Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/pricing/current` | `GET` | Public | Fetches current DISCOM baseline tariff, price floor, price cap, and surge multiplier. | None | `200 OK` PricingSetting object |
| `/api/pricing/update` | `PUT` | Admin | Updates system-wide dynamic tariff limits, DISCOM grid rates, and surge policies. | `{ discomRate, minPrice, maxPrice, surgeMultiplier }` | `200 OK` updated settings |

---

### 4.7 Automated P2P Matching Engine (`/api/matching`)

| Endpoint | Method | Access | Description | Request Body / Params | Response Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/matching/recommend` | `GET` | Consumer | Returns algorithmically ranked energy listings based on distance, price, and prosumer rating. | Query params: `maxPrice`, `preferredDistance` | `200 OK` ranked list of optimal energy offers |
| `/api/matching/auto-trade` | `POST` | Consumer | Executes automated instant buy matching for best available market price. | `{ maxBudget, requiredKwh }` | `200 OK` executed trades summary |

---

### 4.8 Carbon Credit & Certificate Module (`/api/certificates`)

| Endpoint | Method | Access | Description | Request Body / Params | Response Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/certificates` | `GET` | Protected | Lists minted Renewable Energy Certificates (RECs) and total $\text{CO}_2$ offset. | None | `200 OK` list of green certificates |
| `/api/certificates/claim` | `POST` | Prosumer | Claims minted carbon credit tokens earned from verified solar generation. | `{ creditIds }` | `200 OK` confirmation & certificate issuance |

---

### 4.9 Dispute Resolution Module (`/api/disputes`)

| Endpoint | Method | Access | Description | Request Body / Params | Response Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/disputes` | `GET` | Protected | Retrieves active trade disputes filed by or against the user. | None | `200 OK` array of Dispute objects |
| `/api/disputes` | `POST` | Protected | Opens a new dispute for non-delivery or meter reading discrepancy. | `{ transactionId, reason, description }` | `201 Created` Dispute object |
| `/api/disputes/:id/resolve`| `PUT` | Admin | Arbitrates dispute, issuing refund to consumer or releasing escrow to prosumer. | `{ resolution, refundAmount }` | `200 OK` updated Dispute object |

---

### 4.10 In-App Notifications Module (`/api/notifications`)

| Endpoint | Method | Access | Description | Request Body / Params | Response Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/notifications` | `GET` | Protected | Fetches user notifications (trade alerts, meter updates, wallet events). | None | `200 OK` list of notifications |
| `/api/notifications/read` | `PATCH` | Protected | Marks selected or all notifications as read. | `{ notificationIds }` | `200 OK` updated status |

---

### 4.11 Admin Command & Control Module (`/api/admin`)

| Endpoint | Method | Access | Description | Request Body / Params | Response Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/admin/stats` | `GET` | Admin | Fetches system metrics: total energy traded, active prosumers/consumers, grid revenue. | None | `200 OK` platform dashboard analytics |
| `/api/admin/users` | `GET` | Admin | Retrieves paginated user list with role filters and verification status. | Query params: `role`, `search` | `200 OK` list of users |
| `/api/admin/users/:id/status`| `PATCH`| Admin | Updates user account status (e.g. active, suspended, verified). | `{ status }` | `200 OK` updated user object |

---

## 5. Real-Time Use Cases & Competitive Edge

Why is **SolarShare** significantly superior to existing traditional grid models and centralized DISCOM systems?

### 5.1 Financial Comparison: DISCOM vs. SolarShare P2P Model

| Feature / Metric | Traditional DISCOM Net-Metering | SolarShare P2P Platform | Advantage |
| :--- | :--- | :--- | :--- |
| **Prosumer Sell Rate** | ₹2.00 – ₹3.00 / kWh (Flat Feed-in Tariff) | ₹4.50 – ₹5.50 / kWh (Dynamic Market Rate) | **+60% Higher Revenue for Prosumers** |
| **Consumer Buy Rate** | ₹7.50 – ₹9.50 / kWh (Slab + Peak Tariff) | ₹5.50 – ₹6.50 / kWh (Direct Peer Price) | **Up to 30% Cost Reduction for Buyers** |
| **Settlement Cycle** | Monthly or Bi-Monthly DISCOM billing adjustment | **Instant Escrow Settlement** via Digital Wallet | Immediate liquidity & transparent tracking |
| **Clean Energy Proof**| None (Mixed grid power without origin tracking) | **Tokenized Carbon Credit & REC Certificate** | Guaranteed green energy attribution |
| **Trading Control** | Zero control (DISCOM dictates terms) | **Full Control** (Prosumer sets prices & volume) | Free-market price discovery |

---

### 5.2 Real-Time Key Use Cases

#### Use Case 1: Prosumer Monetizes Daytime Solar Surplus
- **Scenario**: A prosumer with a 5 kW rooftop solar array generates 25 kWh on a sunny afternoon but only consumes 8 kWh.
- **Problem**: DISCOM net-metering pays a negligible ₹2.20/kWh at the end of the month.
- **SolarShare Solution**:
  1. The Smart Meter Simulator automatically detects 17 kWh surplus energy.
  2. The prosumer creates a listing at ₹5.00/kWh on SolarShare.
  3. A nearby commercial consumer purchases the listing for ₹85.00.
  4. Escrow settles instantly: ₹85 is credited to the prosumer's wallet, and 17 kWh green carbon credits are minted.

#### Use Case 2: EV Owner Purchases Cheaper Local Solar Power
- **Scenario**: An Electric Vehicle owner needs to charge their EV during peak hours.
- **Problem**: Charging from the grid costs ₹9.00/kWh during peak hours.
- **SolarShare Solution**:
  1. The EV owner opens the SolarShare Marketplace.
  2. The P2P Matching Engine recommends local prosumer listings within a 2 km radius at ₹5.50/kWh.
  3. The EV owner buys 30 kWh, saving ₹105 in a single charging session while charging on 100% verified clean energy.

#### Use Case 3: Automated Escrow & Dispute Safety Net
- **Scenario**: A grid failure occurs during energy transmission.
- **SolarShare Solution**:
  1. Smart meter telemetry cross-verifies actual energy delivered versus energy listed.
  2. If a discrepancy exceeds 5%, the consumer files a dispute with one click.
  3. The Admin Dispute Arbitration Engine inspects the meter logs and automatically issues an instant full or partial refund from escrow.

---

## 6. Summary of Architectural Excellence

1. **Security**: Stateless JWT auth with `Authorization: Bearer` headers, CORS origin verification, password hashing, and role-based access control (`prosumer`, `consumer`, `admin`).
2. **Scalability**: Decoupled React Vite frontend and Node.js REST API with cloud database support on MongoDB Atlas.
3. **User Experience**: Premium, modern interface with responsive charts, dark glassmorphism, instant feedback toasts, and role-isolated dashboards.
4. **Environmental Impact**: Directly incentivizes renewable solar adoption by maximizing ROI for prosumers while rewarding buyers with verifiable carbon credit certificates.
