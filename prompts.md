# SolarShare — AI Agent Prompts & Task Execution Templates

> **Template Version:** 1.0.0  
> **Usage:** Paste or reference these structured prompts for AI coding sessions, refactoring tasks, and feature additions in SolarShare.  

---

## 1. System Persona & Core Context

When operating as an AI coding assistant on the SolarShare workspace, adopt the following identity and constraints:

```markdown
You are an expert full-stack engineer and software architect specializing in Node.js, Express, MongoDB Mongoose, React 18, Vite, and Tailwind CSS. You are working on the SolarShare P2P Solar Energy Trading & Carbon Credit Platform.

STRICT MANDATE:
- All code files (.js, .jsx) MUST remain under 100 Lines of Code (LOC).
- Maintain single-responsibility modular structure.
- Never delete or modify core working logic without verifying impact across both server and client.
- Always verify builds and runtime endpoints after code edits.
```

---

## 2. Standard Task Execution Templates

### 2.1 Feature Implementation Prompt Template

```markdown
Task: Implement [Feature Name] in SolarShare.

Requirements:
1. Review relevant existing controllers, models, and routes in `server/` or components in `client/src/`.
2. Keep all new or modified code files strictly under 100 LOC.
3. Ensure API responses follow the standard JSON format:
   `{ success: true, data: { ... } }` or `{ success: false, message: "..." }`.
4. If modifying database models, update Mongoose schemas in `server/models/`.
5. Run runtime verification (`npm run dev` or build checks) after code edits.
```

---

### 2.2 Refactoring Prompt Template (<100 LOC Enforcement)

```markdown
Task: Refactor [File Name] to comply with the strictly enforced <100 LOC rule.

Instructions:
1. Inspect [File Name] line by line.
2. Identify sub-responsibilities (e.g. data validation, formatting, sub-components, database helpers).
3. Extract reusable logic into dedicated utility or helper files (e.g. `utils/`, `helpers/`, `services/`).
4. Re-export and import cleanly using ES6 syntax.
5. Verify that no functionality is broken by running tests or building the project.
```

---

### 2.3 Bug Fix & Diagnostic Prompt Template

```markdown
Task: Investigate and resolve [Error Description / Symptom].

Step 1: Inspect empirical logs and terminal stack trace.
Step 2: Trace failure to exact line in controller/service/component.
Step 3: Root-cause the failure (e.g. unhandled async exception, null dereference, missing model population, missing authorization header).
Step 4: Apply precise surgical fix maintaining existing function signatures.
Step 5: Verify the fix with runtime API call or test command.
```

---

### 2.4 New REST Endpoint Prompt Template

```markdown
Task: Add new REST API endpoint `[METHOD] /api/[module]/[path]`.

Execution Checklist:
- [ ] Define Mongoose query or service logic in `server/services/` or `server/controllers/`.
- [ ] Ensure `protect` and `authorize("role")` middleware are attached if endpoint requires authentication.
- [ ] Add route to `server/routes/[module]Routes.js`.
- [ ] Ensure file size of updated route/controller remains <100 LOC.
- [ ] Document endpoint in `architecture.md` and `prd.md`.
```

---

### 2.5 Component Creation Prompt Template (React + Tailwind)

```markdown
Task: Create new frontend screen/component `[Component Name].jsx`.

Design Checklist:
- [ ] Follow SolarShare glassmorphic theme (`.glass-card`, `bg-slate-900`, `text-slate-50`).
- [ ] Use Lucide React icons for visual cues.
- [ ] Connect state to AuthContext or custom hooks cleanly.
- [ ] Keep JSX file concise and under 100 LOC.
- [ ] Integrate into `App.jsx` router if creating a page view.
```
