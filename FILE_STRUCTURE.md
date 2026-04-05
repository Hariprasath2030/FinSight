# FinSight File Structure Guide

## Complete File Organization

```
c:\Users\Hariprasath\Documents\GitHub\FinSight\
│
├── 📄 Project Root Files
│   ├── package.json                 # Dependencies and npm scripts
│   ├── package-lock.json            # Exact dependency versions
│   ├── tsconfig.json                # TypeScript configuration
│   ├── next.config.ts               # Next.js configuration
│   ├── eslint.config.mjs            # ESLint configuration
│   ├── postcss.config.mjs           # PostCSS plugin configuration
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   ├── next-env.d.ts                # Next.js TypeScript definitions
│   ├── README.md                    # Primary project README
│   ├── README_FINSIGHT.md           # FinSight-specific project overview
│   ├── DOCUMENTATION.md             # Detailed feature documentation
│   ├── DEVELOPMENT.md               # Developer guide and architecture notes
│   ├── QUICKSTART.md                # Quick start guide for users
│   ├── PROJECT_SUMMARY.md           # Implementation summary and goals
│   ├── FILE_STRUCTURE.md            # Current file structure reference
│   ├── IMPLEMENTATION_CHECKLIST.md  # Implementation notes and checklist
│   ├── components.json              # Component metadata file
│   └── node_modules/                # Installed dependencies
│
├── 📂 app/                          # Next.js App Router directory
│   ├── dashboard/
│   │   └── page.tsx                 # Dashboard page component
│   ├── transactions/
│   │   └── page.tsx                 # Transactions page component
│   ├── analytics/
│   │   └── page.tsx                 # Analytics page component
│   ├── insights/
│   │   └── page.tsx                 # Insights page component
│   ├── layout.tsx                   # Root layout component and ThemeProvider
│   ├── page.tsx                     # Landing page component
│   ├── globals.css                  # Global application styles
│   └── favicon.ico                  # Static favicon asset
│
├── 📂 components/                   # React components and shared UI
│   ├── layout/
│   │   ├── FinSightNavbar.tsx       # Top navigation bar and role switcher
│   │   └── LayoutProvider.tsx       # Layout wrapper with persistence and toast support
│   ├── dashboard/
│   │   ├── BalanceTrendChart.tsx    # Balance trend visualization
│   │   └── SpendingCategoryChart.tsx# Category spending breakdown chart
│   ├── transactions/
│   │   ├── TransactionFilters.tsx   # Transaction search/filter controls
│   │   ├── TransactionTable.tsx     # Transaction listing and actions
│   │   └── TransactionModal.tsx     # Add/Edit transaction modal form
│   ├── analytics/
│   │   └── Charts.tsx               # Income/expense and savings charts
│   ├── insights/
│   │   └── InsightsModule.tsx       # Financial insight cards and recommendations
│   ├── landing/
│   │   ├── LandingPage.tsx          # Landing page UI and feature intro
│   │   └── LoginForm.tsx            # Login/signup simulation form
│   ├── common/
│   │   ├── StatCard.tsx             # Reusable summary stat card
│   │   ├── Skeleton.tsx             # Loading skeleton components
│   │   └── Toast.tsx                # Notification toast system
│   ├── ui/
│   │   └── resizable-navbar.tsx     # Responsive navbar primitives
│   ├── ShapeGrid.css                # Decorative landing page shape styles
│   ├── ShapeGrid.tsx                # Animated landing page background shapes
│   └── TextGenerateEffect.tsx       # Typing/animation text effect
│
├── 📂 store/                        # Zustand state management
│   └── index.ts                     # Global app state, persistence, and actions
│
├── 📂 lib/                          # Utility and calculation helpers
│   └── calculations.ts              # Financial calculation utilities
│
├── 📂 types/                        # TypeScript interfaces and type definitions
│   └── index.ts                     # Shared type definitions
│
├── 📂 public/                       # Static public assets
│   └── [static assets]
│
└── 📂 node_modules/                 # Installed package dependencies
```

## 📝 File Descriptions

### Root Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Defines dependencies and npm scripts |
| `package-lock.json` | Records exact installed dependency versions |
| `tsconfig.json` | TypeScript compiler configuration |
| `next.config.ts` | Next.js build and runtime configuration |
| `tailwind.config.js` | Tailwind CSS theme and utilities |
| `eslint.config.mjs` | Code linting rules |
| `postcss.config.mjs` | PostCSS plugin configuration |
| `next-env.d.ts` | Next.js TypeScript global definitions |
| `README.md` | Primary project README |
| `README_FINSIGHT.md` | FinSight-specific project overview |
| `DOCUMENTATION.md` | Complete feature documentation |
| `DEVELOPMENT.md` | Developer guide and architecture |
| `QUICKSTART.md` | Quick start guide for users |
| `PROJECT_SUMMARY.md` | Implementation summary and goals |
| `FILE_STRUCTURE.md` | Current file structure reference |
| `IMPLEMENTATION_CHECKLIST.md` | Project implementation checklist |
| `components.json` | Metadata file for component inventory |

### App Directory (Next.js Routes)

| File | Route | Purpose |
|------|-------|---------|
| `app/page.tsx` | `/` | Landing page and app entrypoint |
| `app/dashboard/page.tsx` | `/dashboard` | Dashboard overview page |
| `app/transactions/page.tsx` | `/transactions` | Transaction management page |
| `app/analytics/page.tsx` | `/analytics` | Financial analytics page |
| `app/insights/page.tsx` | `/insights` | Insights and recommendations page |
| `app/layout.tsx` | Root layout | App layout wrapper, theme provider, and page scaffold |
| `app/globals.css` | Global styles | Application global CSS styles |
| `app/favicon.ico` | Favicon | Website favicon asset |

### Components

#### Layout Components (`components/layout/`)

| File | Purpose |
|------|---------|
| `FinSightNavbar.tsx` | Fixed top navigation bar with links, role switcher, and theme toggle |
| `LayoutProvider.tsx` | Wraps pages, handles auto-save, and renders layout structure |

#### Dashboard Components (`components/dashboard/`)

| File | Purpose |
|------|---------|
| `BalanceTrendChart.tsx` | Renders balance trend line chart |
| `SpendingCategoryChart.tsx` | Renders spending breakdown chart |

#### Transaction Components (`components/transactions/`)

| File | Purpose |
|------|---------|
| `TransactionFilters.tsx` | Search and filter controls for transactions |
| `TransactionTable.tsx` | Transaction table, pagination, and admin actions |
| `TransactionModal.tsx` | Add/Edit transaction modal form |

#### Analytics Components (`components/analytics/`)

| File | Purpose |
|------|---------|
| `Charts.tsx` | Income/Expense and savings rate chart components |

#### Insights Components (`components/insights/`)

| File | Purpose |
|------|---------|
| `InsightsModule.tsx` | Displays actionable financial insights and recommendations |

#### Landing Components (`components/landing/`)

| File | Purpose |
|------|---------|
| `LandingPage.tsx` | Landing page layout and hero section |
| `LoginForm.tsx` | Simulated login/signup form |

#### Common Components (`components/common/`)

| File | Purpose |
|------|---------|
| `StatCard.tsx` | Reusable statistic card with optional trend indicator |
| `Skeleton.tsx` | Loading placeholders for cards, tables, and charts |
| `Toast.tsx` | Toast notifications for user feedback |

#### UI Helpers (`components/ui/`)

| File | Purpose |
|------|---------|
| `resizable-navbar.tsx` | Navbar and mobile navigation primitives |

#### Other Shared Components

| File | Purpose |
|------|---------|
| `ShapeGrid.css` | Styles for animated landing background shapes |
| `ShapeGrid.tsx` | Animated landing page shape grid |
| `TextGenerateEffect.tsx` | Typing-style text animation effect |

### Store (`store/index.ts`)

Zustand store with:
- Transaction management (add, edit, delete)
- Search and filter state
- Role and theme management
- Pagination state
- Toast notifications
- LocalStorage persistence and auto-save

### Utilities (`lib/calculations.ts`)

Utility functions:
- `calculateDashboardStats()` - totals, income, expense, balance
- `getCategorySpending()` - category spending breakdown
- `getBalanceTrend()` - historical balance data
- `getMonthlyComparison()` - monthly income/expense comparison
- `getHighestSpendingCategory()` - top expense category
- `getSavingsRate()` - savings rate calculation
- `filterTransactions()` - search and filter logic
- `getUniqueCategories()` - category list generation
- `formatCurrency()` - currency formatting
- `formatDate()` - date formatting

### Types (`types/index.ts`)

Shared type definitions:
- `TransactionType` - `'income' | 'expense'`
- `UserRole` - `'viewer' | 'admin'`
- `Theme` - `'light' | 'dark'`
- `Transaction` - transaction model
- `DashboardStats` - dashboard totals and stats
- `CategorySpending` - category spending shape
- `BalanceTrendData` - balance chart data type
- `MonthlyComparison` - monthly comparison data type

## 🔄 Component Hierarchy

```
<LayoutProvider>
  <Toast />
  <FinSightNavbar />
  <main>
    {/* Page-specific content */}
    <StatCard />
    <BalanceTrendChart />
    <SpendingCategoryChart />
    <TransactionFilters />
    <TransactionTable />
    <TransactionModal />
    <IncomExpenseChart />
    <SavingsRateChart />
    <InsightsModule />
  </main>
</LayoutProvider>
```

## 🔄 Data Flow

```
User Interaction
    ↓
Component Event Handler
    ↓
Zustand Store Action
    ↓
State Update
    ↓
Component Re-render
    ↓
Auto-save to localStorage
```

## 📦 Dependencies

```json
{
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "next": "16.2.2",
  "typescript": "^5",
  "zustand": "^4.4.0",
  "recharts": "^2.10.0",
  "framer-motion": "^10.16.0",
  "lucide-react": "^0.441.0"
}
```

## 🎯 File Access Patterns

### Adding Features
- Add a new page: create `app/[feature]/page.tsx`
- Add a new component: create `components/[category]/NewComponent.tsx`
- Add shared logic: add helper in `lib/`
- Add types: update `types/index.ts`

### Styling
- Global styles: edit `app/globals.css`
- Component styling: use Tailwind CSS classes in component files

### State
- Use `useStore()` from `store/index.ts`
- Access state and actions directly from the centralized store
- Persistence is managed automatically through localStorage

### Calculations
- Import from `lib/calculations.ts`
- Use in components with standard React hooks
- Memoize results if needed for performance

## 📈 Scalability Notes

This structure is designed to:
- support independent page growth
- keep UI concerns separated
- enable reusable components
- make state reuse easy
- support new analytics and insight pages

## 🚀 Build Output

When running `npm run build`:
- `.next/` directory is generated
- code is optimized for production
- app can be deployed to supported Node.js hosts

---

This file structure guide now matches the actual current repository layout.
