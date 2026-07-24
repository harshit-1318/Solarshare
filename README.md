# ☀️ SolarShare — Peer-to-Peer Solar Energy Trading & Carbon Credit Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v20%2B-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-purple.svg)](https://vitejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen.svg)](https://www.mongodb.com/)
[![Architecture](https://img.shields.io/badge/Architecture-Modular%20Micro--Services-orange.svg)](file:///d:/SolarShare/architecture.md)

**SolarShare** is a next-generation, decentralized Peer-to-Peer (P2P) solar energy trading and carbon credit monetization ecosystem. It empowers rooftop solar generators (**Prosumers**) to trade surplus energy directly with local buyers (**Consumers**) at fair market rates—bypassing traditional utility monopolies (DISCOMs), optimizing financial returns, and accelerating global clean energy adoption.

---

## 🌟 Key Highlights & Competitive Edge

- **💰 Up to 60% Higher Revenue for Prosumers:** Earn ₹4.50–₹5.50/kWh compared to restrictive DISCOM net-metering feed-in tariffs (₹2.00–₹3.00/kWh).
- **📉 Up to 30% Savings for Consumers:** Procure verified clean solar energy below peak grid rates (₹7.50–₹9.50/kWh).
- **📡 Real-Time IoT Smart Meter Telemetry:** Live generation/consumption pulse streaming via WebSockets (`Socket.IO`).
- **🛡️ Zero-Counterparty Escrow Settlement:** Isolated digital wallets with atomic balance locks and automated trade verification.
- **🌱 Tokenized Carbon Credits & REC Issuance:** Mint verified Renewable Energy Certificates ($0.85\text{ kg CO}_2\text{ saved per kWh}$) featuring downloadable PDF reports & verification QR codes.
- **⚡ Dynamic Pricing & Grid Load Balancing:** Automated price floors, caps, and surge multipliers based on live grid demand.

---

## 🏗️ System Architecture Overview

SolarShare follows a decoupled client-server architecture built for high performance, modular maintainability, and sub-second real-time streaming.

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

## 🛠️ Technology Stack

| Layer | Technology | Primary Role |
| :--- | :--- | :--- |
| **Frontend UI** | React 18 + Vite | Modern, component-based user interface with HMR & optimized bundling. |
| **Styling** | Tailwind CSS | Utility-first glassmorphic dark/light design system. |
| **Data Visualization** | Recharts | Interactive time-series energy generation & financial charts. |
| **Backend Runtime** | Node.js (v20+) | Asynchronous event-driven REST API engine. |
| **Web Framework** | Express.js | Route handling, RBAC authorization, and middleware execution. |
| **Database** | MongoDB Atlas | Scalable document data store for users, listings, wallets, and telemetry. |
| **Object Modeling** | Mongoose ODM | Schema validation, hooks, indexing, and transactional queries. |
| **Real-Time Communications**| Socket.IO | Bi-directional WebSocket channels for live IoT smart meter broadcasts. |
| **Auth & Security** | JWT & Bcrypt.js | Stateless bearer authentication and salted password encryption. |
| **Certificates** | PDFKit & QRCode | Automated PDF generation with embedded cryptographic QR codes. |

---

## 🚀 Quick Start & Installation Guide

### Prerequisites
- **Node.js** v18.x or v20.x
- **npm** v9.x or higher
- **MongoDB** instance (local `mongod` or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster)

### 1. Clone & Setup Workspace
```bash
git clone https://github.com/harshit-1318/SolarShare.git
cd SolarShare
```

### 2. Configure Backend Server
```bash
cd server
npm install
copy .env.example .env
```
Edit `server/.env` with your credentials:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/solarshare
JWT_SECRET=your_super_secret_jwt_key_here
ADMIN_CODE=SOLAR_ADMIN_2026
```
Start the backend server:
```bash
npm run dev    # Starts server via Nodemon on http://localhost:5000
```

### 3. Configure Frontend Client
In a separate terminal window:
```bash
cd client
npm install
npm run dev    # Starts Vite dev server on http://localhost:5173
```

Visit **`http://localhost:5173`** in your browser.

---

## 📖 Complete Project Documentation Suite

The repository contains an exhaustive suite of production documentation specifications:

| Document | Description | Link |
| :--- | :--- | :--- |
| 📄 **PRD** | Product Requirements Document & Persona Specifications | [prd.md](file:///d:/SolarShare/prd.md) |
| 🏛️ **Architecture** | System Topology, Sequence Flowcharts & Tech Rationale | [architecture.md](file:///d:/SolarShare/architecture.md) |
| 📏 **Rules** | Coding Standards & Strict <100 LOC Refactoring Guidelines | [rules.md](file:///d:/SolarShare/rules.md) |
| 🗺️ **Phases** | Detailed Roadmap & Phase Milestones (Phases 1–5) | [phases.md](file:///d:/SolarShare/phases.md) |
| 🎨 **Design System** | Glassmorphism Design Tokens, Color Palette & Typography | [design.md](file:///d:/SolarShare/design.md) |
| 🧠 **Memory Bank** | AI Agent Context, Workspace State & Active Blueprint | [memory.md](file:///d:/SolarShare/memory.md) |
| 🗄️ **Database** | Complete Mongoose Schemas, Indexes & ER Diagrams | [database.md](file:///d:/SolarShare/database.md) |
| 🤖 **Prompts** | Standardized AI Execution Templates & Refactoring Prompts | [prompts.md](file:///d:/SolarShare/prompts.md) |
| 🔒 **Security** | Authentication, JWT Lifecycle, RBAC & Escrow Isolation | [security.md](file:///d:/SolarShare/security.md) |

---

## 🔑 REST API Module Overview

| Module | Base Path | Core Operations | Access |
| :--- | :--- | :--- | :--- |
| **Authentication** | `/api/auth` | Register, Login, Logout, Profile Update, Password Change | Public / Protected |
| **Market Listings** | `/api/listings` | Create Listing, Search Marketplace, Buy Energy, Cancel | Prosumer / Consumer |
| **IoT Telemetry** | `/api/meter` | Live Telemetry Stream, History Logs, Meter Pulse Injection | Protected / Admin |
| **Escrow Wallet** | `/api/wallet` | Check Balance, Deposit Virtual Funds, Withdraw to Bank | Protected |
| **Transactions** | `/api/transactions`| View Isolated Purchase/Sale Ledgers, Receipt Export | Protected |
| **Carbon Credits** | `/api/certificates`| Claim Green Credits, Download REC Certificates PDF | Prosumer |
| **Dynamic Pricing**| `/api/pricing` | Baseline Rates, Surge Multipliers, Tariff Constraints | Public / Admin |
| **Admin Control** | `/api/admin` | Platform Analytics, User Suspension, Dispute Arbitration | Admin Only |

---

## 🤝 Contributing & Code Guidelines

We enforce strict modularity guidelines. All code contributions must adhere to the **<100 LOC Rule** per file and pass static syntax checks. Please review our [rules.md](file:///d:/SolarShare/rules.md) before submitting Pull Requests.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p center>
  Made with ☀️ for a cleaner, greener decentralized power grid.
</p>
