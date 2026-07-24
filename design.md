# SolarShare — UI/UX Design System & Aesthetics Blueprint

> **Design Tokens Version:** 1.0.0  
> **Styling Framework:** Tailwind CSS 3.x + Custom Utilities  
> **Typography:** Inter & Poppins (Google Fonts)  

---

## 1. Design Vision & Aesthetic Direction

SolarShare features a **high-end, modern glassmorphic interface** tailored for clean energy visualization. The visual aesthetic conveys sustainability, security, and real-time intelligence using deep slate dark mode backgrounds, translucent glass card containers, and glowing emerald/amber accents for solar generation and revenue metrics.

---

## 2. Color Palette & Token System

### 2.1 Core Palette Matrix

| Token Name | Hex Code | Tailwind Equivalent | Primary Usage |
| :--- | :--- | :--- | :--- |
| **Brand Primary (Energy Green)** | `#10B981` | `emerald-500` | Primary buttons, success indicators, active listings, clean kWh metrics. |
| **Brand Secondary (Solar Gold)** | `#F59E0B` | `amber-500` | Solar panel generation badges, peak pricing alerts, carbon credit tokens. |
| **Brand Accent (Sky Grid Blue)** | `#0EA5E9` | `sky-500` | IoT smart meter status, grid voltage readings, active links. |
| **Dark Background (Void)** | `#0F172A` | `slate-900` | Primary application canvas background. |
| **Surface Dark (Card Glass)** | `#1E293B` | `slate-800` | Card containers, sidebar background, table rows. |
| **Border Dark** | `#334155` | `slate-700` | Subtle divider lines, card borders. |
| **Text Primary** | `#F8FAFC` | `slate-50` | Headings, primary labels, modal titles. |
| **Text Muted** | `#94A3B8` | `slate-400` | Subtitles, helper text, timestamps. |

---

## 3. Glassmorphic UI Utility Pattern

All dashboard card elements follow the standardized glassmorphic container specification defined in `index.css`:

```css
.glass-card {
  background-color: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(51, 65, 85, 0.6);
  border-radius: 0.75rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}
```

---

## 4. Typography & Font Hierarchy

- **Primary Sans:** `'Inter', -apple-system, BlinkMacSystemFont, sans-serif` — used for interface controls, body text, tables, and form inputs.
- **Display Headings:** `'Poppins', sans-serif` — used for dashboard main headings (`h1`), stat callouts, and landing page hero text.

### Font Scale Matrix
- `Heading 1 (h1)`: 2.25rem (36px), SemiBold / Bold, tracking-tight.
- `Heading 2 (h2)`: 1.5rem (24px), SemiBold.
- `Heading 3 (h3)`: 1.125rem (18px), Medium.
- `Body Text`: 0.875rem (14px), Regular.
- `Caption / Badge`: 0.75rem (12px), Medium / SemiBold upper-case.

---

## 5. Standard Component Specifications

### 5.1 Stat Card (`StatCard.jsx`)
- Container: `.glass-card` with hover glow transition (`transition-all duration-300 hover:border-emerald-500/50`).
- Content: Icon wrapper with tinted background, uppercase label, bold metric display, and directional change badge.

### 5.2 Responsive Data Tables
- Header: Sticky header with `bg-slate-800/80` and `text-slate-400` uppercase tracking.
- Row: Alternating hover state (`hover:bg-slate-800/50`), crisp cell padding (`px-6 py-4`).
- Action Badges: Rounded pill badges (`px-2.5 py-0.5 text-xs font-semibold rounded-full`).

### 5.3 Live Telemetry Pulse Badge
- Active IoT Smart Meter status features a dual-layer glowing pulse animation:

```html
<span class="relative flex h-3 w-3">
  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
  <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
</span>
```

---

## 6. Layout Grid & Responsiveness

- **Sidebar Layout:** 256px wide fixed left sidebar on desktop (`lg:w-64`), collapsible overlay drawer on mobile viewports.
- **Dashboard Grid:** Responsive CSS Grid (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`) for top stat widgets.
- **Analytics Charts:** Recharts containers set to `ResponsiveContainer width="100%" height={300}`.
