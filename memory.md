# SolarShare — AI Context & Memory Bank

> **Memory Bank Version:** 1.0.0  
> **Last Updated:** Current Session  
> **Workspace Path:** `d:\SolarShare`  

---

## 1. Project Overview & Context

**SolarShare** is a Peer-to-Peer (P2P) Solar Energy Trading & Carbon Credit Platform built with Node.js/Express (backend) and React 18/Vite/Tailwind CSS (frontend). It facilitates direct energy sales from rooftop prosumers to local consumers using smart meter simulation, weighted order matching, dynamic pricing, and escrow digital wallets.

---

## 2. Active Development Environment

- **Backend Dev Server:** Running via `nodemon` on `http://localhost:5000` (directory: `d:\SolarShare\server`).
- **Frontend Dev Server:** Running via Vite on `http://localhost:5173` (directory: `d:\SolarShare\client`).
- **Database:** MongoDB Atlas cluster / local MongoDB instance connected via Mongoose ODM.
- **Git State:** Active branch `main`. Recent commit: `Refactor server & client codebase into modular components under 100 LOC`.

---

## 3. Strict Coding Constraints & Architectural Mandates

1. **Strict <100 LOC Rule:** EVERY code file in both client and server MUST remain under **100 Lines of Code (LOC)**. If a file approaches 90 LOC during edits, split logic into modular helper/utility components immediately.
2. **Decoupled Architecture:** Business logic resides in `services/`, database operations in `models/`, route definitions in `routes/`, and request handling in `controllers/`.
3. **Escrow Atomic Flow:** Energy trade purchases (`/api/listings/:id/buy`) lock consumer funds into escrow and verify smart meter telemetry before releasing funds to prosumers.
4. **JWT Security:** Authorization headers (`Bearer <token>`) and HTTP-only cookies enforce RBAC across `prosumer`, `consumer`, and `admin` roles.

---

## 4. Key Data Models & Services Map

| Model / Service | Path | Description |
| :--- | :--- | :--- |
| `User` | `server/models/User.js` | User identity, password hash, role, solar capacity, KYC fields. |
| `Listing` | `server/models/Listing.js` | Energy trade listings (`energyAmount`, `pricePerKwh`, `status`). |
| `Transaction` | `server/models/Transaction.js` | Financial trade transactions and escrow settlement logs. |
| `Wallet` | `server/models/Wallet.js` | User digital balance, pending escrow, ledger entries. |
| `MeterReading` | `server/models/MeterReading.js` | Time-series telemetry readings (`generationKw`, `consumptionKw`). |
| `CarbonCredit` | `server/models/CarbonCredit.js` | Minted carbon offsets ($0.85 \text{ kg } \text{CO}_2/\text{kWh}$) & certificates. |
| `meterSimulator` | `server/services/meterSimulator.js` | Background job firing 60s meter simulation ticks & WS broadcasts. |
| `matchingEngine`| `server/services/matchingEngine.js` | Weighted-score seller ranking algorithm. |

---

## 5. Current Task List & Next Milestones

- [x] Complete PRD (`prd.md`), Architecture (`architecture.md`), Rules (`rules.md`), Phases (`phases.md`), Design (`design.md`), Memory (`memory.md`), Database (`database.md`), Prompts (`prompts.md`), and Security (`security.md`).
- [ ] Implement Carbon Credit Certificate PDF generator endpoint (`/api/certificates/pdf`).
- [ ] Wire dispute filing UI in Consumer & Prosumer portals.
- [ ] Add Admin dispute arbitration and refund capabilities.
- [ ] Complete multi-format analytics report exporter.
