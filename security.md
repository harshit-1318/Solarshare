# SolarShare — Security Architecture & Compliance Policy

> **Security Document Version:** 1.0.0  
> **Target Standards:** OWASP Top 10, NIST Cybersecurity Framework, Financial Escrow Isolation  

---

## 1. Security Architecture Overview

SolarShare handles financial trade settlements, real-time energy telemetry, and user KYC data. Security is integrated at every tier—from JWT token issuance and encrypted database storage to isolated wallet escrow mechanisms.

```
+-----------------------------------------------------------------------------------+
|  1. CLIENT TIER                                                                   |
|  - Token stored in HTTP-Only secure cookie or memory                             |
|  - Input sanitization & CSRF protection                                           |
+-----------------------------------------------------------------------------------+
                                         |
                        HTTPS (TLS 1.3)  |  Encrypted Bearer Headers
                                         v
+-----------------------------------------------------------------------------------+
|  2. API GATEWAY & EXPRESS MIDDLEWARE                                              |
|  - Cors Origin Whitelist                                                          |
|  - Express Rate Limiting (100 req/15min)                                          |
|  - JWT `protect` Token Verification                                               |
|  - Role-Based Authorization `authorize("prosumer", "admin")`                      |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|  3. BUSINESS & ESCROW SERVICES                                                    |
|  - Atomic wallet locks (preventing race conditions)                               |
|  - Input validation & parameter bounds checking                                  |
+-----------------------------------------------------------------------------------+
                                         |
                    Mongoose Encrypted  |  BCrypt Password Salt (10 rounds)
                                         v
+-----------------------------------------------------------------------------------+
|  4. PERSISTENCE TIER                                                              |
|  - MongoDB Atlas TLS/SSL connection with IP Access Lists                          |
|  - Masked Aadhaar / PAN KYC attributes                                            |
+-----------------------------------------------------------------------------------+
```

---

## 2. Authentication & Session Security

### 2.1 JSON Web Token (JWT) Lifecycle
- **Issuance:** Upon successful `/api/auth/login` or `/api/auth/register`, server signs a JWT containing `{ id: user._id, role: user.role }`.
- **Secret Management:** Signed using `JWT_SECRET` stored strictly in server `.env`.
- **Transmission:** Sent via HTTP-Only cookie and/or `Authorization: Bearer <token>` header to prevent XSS script access.
- **Expiration:** Tokens expire in 30 days (`30d`). Logout endpoints clear cookies immediately.

### 2.2 Password Security
- Passwords must meet a minimum length of 6 characters.
- Pre-save Mongoose hook automatically hashes passwords using `bcryptjs` with **10 salt rounds**.
- Password fields are marked `{ select: false }` in Mongoose schemas to prevent accidental leak in API queries.

---

## 3. Role-Based Access Control (RBAC)

Express middleware `server/middleware/auth.js` enforces strict RBAC across 3 roles:

```js
// Verification Middleware
export const protect = async (req, res, next) => { ... };

// Role Restriction Guard
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `User role '${req.user.role}' is not authorized to access this route.` 
      });
    }
    next();
  };
};
```

### Route Authorization Matrix

| Route Domain | Endpoint Pattern | Public | Prosumer | Consumer | Admin |
| :--- | :--- | :---: | :---: | :---: | :---: |
| Auth | `/api/auth/register`, `/login` | YES | YES | YES | YES |
| Profile | `/api/auth/profile` | NO | YES | YES | YES |
| Listings | `POST /api/listings` | NO | YES | NO | YES |
| Buying | `POST /api/listings/:id/buy` | NO | NO | YES | YES |
| Telemetry | `GET /api/meter/readings` | NO | YES | YES | YES |
| Telemetry Inject | `POST /api/meter/simulate` | NO | YES | NO | YES |
| Admin Control | `/api/admin/*` | NO | NO | NO | YES |

---

## 4. Wallet & Escrow Financial Protection

1. **Race Condition Prevention:** Wallet balance deductions use atomic Mongoose update operations (`$inc: { balance: -amount }`).
2. **Double Spending Safeguard:** Energy listing quantities are locked atomically upon escrow creation (`availableKwh: { $gte: requiredKwh }`).
3. **Escrow Isolation:** Escrow funds are held in a separate `escrowBalance` field and released only when transaction status transitions to `"COMPLETED"`.

---

## 5. Security Audit Checklist

- [x] Passwords salted and hashed with Bcrypt (10 rounds).
- [x] JWT verification attached to all protected API routes.
- [x] No sensitive credentials or DB URIs committed to repository.
- [x] Strict CORS origin configuration for API endpoints.
- [x] Mongoose models sanitize inputs to prevent NoSQL query injections.
- [x] Financial transfers handled with atomic balance updates.
