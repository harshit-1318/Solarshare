# SolarShare — Product Requirements Document (PRD)

> **Document Version:** 1.0.0  
> **Status:** Active / Production Specification  
> **Target Platform:** Web (Desktop & Mobile Responsive)  
> **Core Stack:** MERN (MongoDB, Express.js, React 18 + Vite, Node.js) + Socket.IO  

---

## 1. Executive Summary

**SolarShare** is an advanced Peer-to-Peer (P2P) solar energy trading and carbon credit monetization platform designed to bridge rooftop solar producers (**Prosumers**) directly with local energy buyers (**Consumers**). By bypassing traditional monopolistic distribution companies (DISCOMs) and utilizing real-time IoT smart meter telemetry, automated matching algorithms, and instant digital wallet escrow settlements, SolarShare maximizes financial yield for prosumers while reducing energy expenses for consumers.

---

## 2. Problem Statement

1. **Tariff Inequity:** DISCOM net-metering buyback tariffs pay prosumers a low feed-in tariff (₹2.00–₹3.00/kWh), while charging nearby consumers high peak tariffs (₹7.00–₹10.00/kWh).
2. **Delayed Settlements:** Prosumers often experience multi-month delays in DISCOM bill adjustments and payouts.
3. **Lack of Verifiable Green Tracking:** Consumers paying green tariffs have zero transparency or proof of actual renewable energy origin.
4. **Wasted Solar Surplus:** Rooftop solar installations frequently curtail energy generation when local battery storage is full and DISCOM grid feedback is restricted.

---

## 3. Product Vision & Goals

- **Empower Prosumers:** Increase solar investment ROI by enabling prosumers to sell surplus energy at fair market prices (₹4.50–₹5.50/kWh), boosting returns by up to **60%**.
- **Reduce Consumer Costs:** Lower clean energy procurement costs for consumers by up to **30%** compared to grid peak rates.
- **Automated P2P Settlement:** Provide zero-counterparty-risk trading using isolated escrow wallets and real-time smart meter verifications.
- **Monetize Sustainability:** Tokenize clean energy generation into verified **Renewable Energy Certificates (RECs)** and Carbon Credits ($0.85 \text{ kg } \text{CO}_2 \text{ saved per kWh}$).

---

## 4. Target User Personas & Role Matrix

| User Role | Primary Needs | Key Capabilities |
| :--- | :--- | :--- |
| **Prosumer** | Maximize return on rooftop solar assets; automated listing of excess energy; track generation & revenue. | Register solar capacity (kW), view live telemetry, create/cancel energy listings, claim carbon credits, withdraw earnings. |
| **Consumer** | Lower monthly power bills; buy verified clean energy; transparent billing & proof of sustainability. | Browse energy marketplace, use AI matching recommendations, instant purchase via escrow wallet, view green offset ledger. |
| **Admin** | Grid balance management; platform fee collection; dispute arbitration; tariff policy control. | Monitor grid voltage/load, manage user KYC & account statuses, set dynamic pricing rules, resolve trading disputes. |

---

## 5. Core Feature Specifications

### 5.1 Authentication & Profile Management
- Multi-role registration (Prosumer, Consumer, Admin with secret access key).
- Stateless JSON Web Token (JWT) issuing with HTTP-only security & role guards.
- User profile management including solar capacity configuration (`capacityKw`), phone, city, and KYC verification fields (Aadhaar/PAN).

### 5.2 IoT Smart Meter Telemetry & Simulation Engine
- Background telemetry service generating realistic generation/consumption readings every minute per user.
- Real-time WebSocket (`Socket.IO`) broadcasts of instantaneous power (`kW`), voltage (`V`), and energy cumulative totals (`kWh`).
- Admin & prosumer override/pulse test endpoints for grid dynamic load testing.

### 5.3 P2P Energy Marketplace & Matching Engine
- Real-time listing catalog with active/sold status filtering, pricing ranges, and volume controls.
- Proximity & pricing weighted matching algorithm (`MatchingEngine`) ranking sellers by price, geographic distance, and rating score.
- Auto-trade execution endpoint matching buyers to optimal available energy blocks.

### 5.4 Digital Escrow Wallet & Financial Ledger
- Isolated digital wallet per user with deposit, withdrawal, and pending escrow balances.
- Atomic trade settlement: upon purchase, buyer's wallet funds move to escrow, and upon meter verification, escrow releases to prosumer wallet.
- Complete immutable transaction logs for auditability.

### 5.5 Carbon Credit & REC Minting
- Automatic calculation of carbon offset metrics ($0.85 \text{ kg } \text{CO}_2 / \text{kWh}$).
- Tokenized Renewable Energy Certificate (REC) issuance upon transaction completion.
- Certificate export with downloadable PDF & embedded QR code verification (`pdfkit` & `qrcode`).

### 5.6 Dynamic Pricing Engine
- Dynamic tariff calculation considering DISCOM baseline rates, price floor, price cap, and peak demand multipliers.
- Admin controls to adjust pricing bounds and grid feed-in benchmarks dynamically.

### 5.7 Dispute Resolution & Admin Governance
- Dispute filing interface for trade discrepancies or telemetry failures.
- Admin arbitration workflow to release escrow funds or process consumer refunds with detailed logging.

---

## 6. Key Non-Functional Requirements (NFRs)

- **Modularity:** Strict architectural modularity keeping individual file sizes strictly **under 100 Lines of Code (LOC)** for high maintainability.
- **Performance:** Sub-200ms REST API response latency; real-time WebSocket telemetry updates within 1 second.
- **Security:** Bcrypt password hashing (10 salt rounds), JWT authentication, strict role-based access control (RBAC), and sanitization of input payloads.
- **Reliability:** Graceful error handling with unified JSON error payloads and transactional database state consistency.

---

## 7. Success Metrics & KPIs

1. **Total Energy Traded:** Target > 1,000,000 kWh settled via P2P marketplace.
2. **Prosumer Financial Yield:** Average 45%–60% higher revenue over DISCOM baseline.
3. **Consumer Savings:** Average 20%–30% lower expenditure vs grid peak rates.
4. **Environmental Impact:** Total metric tons of $\text{CO}_2$ emissions avoided.
5. **System Uptime & Latency:** 99.9% API uptime with 0 zero-day security vulnerabilities.
