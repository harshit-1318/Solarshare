# SolarShare — Development Rules & Coding Standards

> **Standard Version:** 1.0.0  
> **Target Enforcement:** Mandatory across all workspace code modifications.  

---

## 1. Core Architectural Guidelines

### 1.1 Strict Line Count Limitation (<100 LOC Rule)
- **Hard Limit:** No individual code file (`.js`, `.jsx`, `.css`, `.json`) should exceed **100 Lines of Code (LOC)** (excluding multi-line markdown docs).
- **Refactoring Requirement:** If a controller, service, or component grows beyond 90 lines, split it into sub-modules (e.g., helpers, utilities, sub-controllers, or specialized component atoms).

### 1.2 Single Responsibility Principle (SRP)
- Each controller file handles a single feature set (e.g., `listingController.js` handles CRUD; business logic belongs in `services/`).
- Frontend components must separate layout/JSX from complex state hooks or API calls.

---

## 2. Backend Coding Standards (Node.js & Express)

### 2.1 Async/Await & Centralized Error Handling
- All asynchronous route handlers must be wrapped in clean `try/catch` blocks or use `asyncHandler`.
- API error responses must adhere strictly to the platform JSON schema:

```json
{
  "success": false,
  "message": "Human-readable error explanation",
  "error": "Error code or stack details in development"
}
```

- Success responses must return:

```json
{
  "success": true,
  "data": { ... }
}
```

### 2.2 HTTP Status Code Standard
- `200 OK`: Successful fetch/update.
- `201 Created`: Resource successfully created (registration, listing creation, dispute opened).
- `400 Bad Request`: Validation failure or insufficient funds.
- `401 Unauthorized`: Missing or invalid JWT token.
- `403 Forbidden`: Authenticated user lacks required role permissions.
- `404 Not Found`: Requested resource does not exist.
- `500 Internal Server Error`: Unhandled server exception.

### 2.3 Database Mutation Safeguards
- Always validate input parameters with schema validators or explicit checks before database writes.
- Perform wallet transactions with atomic updates (e.g., `$inc`, `$set`, session transactions).

---

## 3. Frontend Coding Standards (React 18 & Vite)

### 3.1 Component Modularization
- Page components (`/src/pages/`) serve as route entry points and layout containers.
- Reusable UI elements (Buttons, Inputs, Cards, Tables) reside in `/src/components/`.
- Business context (auth, notification, sockets) must be encapsulated inside Context Providers.

### 3.2 State & Side Effects
- Avoid unnecessary `useEffect` calls; keep state local whenever possible.
- Standardize HTTP API calls using the pre-configured `axios` instance from `@/api/axios.js`.

### 3.3 Styling & Theme Consistency
- Use Tailwind CSS utility classes adhering to the SolarShare design system.
- Never use inline CSS styles (`style={{ ... }}`) unless dynamic positioning/calculation requires it.

---

## 4. Security & Safety Rules

- **Zero Hardcoded Secrets:** Never commit passwords, JWT secrets, or DB connection URIs into code. Use `.env` and `.env.example`.
- **Destructive Operations:** Never run `git reset --hard`, `DROP DATABASE`, or destructive shell scripts without explicit user authorization.
- **Input Sanitization:** Sanitize user input to prevent NoSQL injection and XSS vulnerabilities.

---

## 5. Verification & Testing Protocol

- **Build Check:** Before declaring task completion, verify that both server and client build without errors (`npm run build` or Vite syntax check).
- **Runtime Test:** Ensure backend API endpoints respond with expected payloads and status codes.
