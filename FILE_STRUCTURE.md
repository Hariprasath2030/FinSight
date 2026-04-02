# FinSight File Structure Guide

## Complete File Organization

```
c:\Users\Hariprasath\Documents\GitHub\FinSight\
│
├── 📄 Project Root Files
│   ├── package.json                 # Dependencies and scripts
│   ├── tsconfig.json               # TypeScript configuration
│   ├── next.config.ts              # Next.js configuration
│   ├── eslint.config.mjs           # ESLint configuration
│   ├── postcss.config.mjs          # PostCSS configuration
│   ├── tailwind.config.css         # Tailwind CSS configuration
│   ├── next-env.d.ts               # Next.js TypeScript definitions
│   ├── README.md                   # Original README
│   ├── AGENTS.md                   # Agent configuration
│   ├── CLAUDE.md                   # Claude configuration
│   ├── DOCUMENTATION.md            # Complete documentation
│   ├── QUICKSTART.md               # Quick start guide
│   └── PROJECT_SUMMARY.md          # This implementation summary
│
├── 📂 app\                          # Next.js App Router directory
│   ├── dashboard\
│   │   └── page.tsx               # Dashboard page component
│   ├── transactions\
│   │   └── page.tsx               # Transactions page component
│   ├── analytics\
│   │   └── page.tsx               # Analytics page component
│   ├── insights\
│   │   └── page.tsx               # Insights page component
│   ├── settings\
│   │   └── page.tsx               # Settings page component
│   ├── layout.tsx                 # Root layout component
│   ├── page.tsx                   # Home page (redirect)
│   ├── globals.css                # Global styles
│   └── favicon.ico                # Favicon
│
├── 📂 components\                  # React components
│   ├── layout\
│   │   ├── Sidebar.tsx            # Navigation sidebar
│   │   ├── Header.tsx             # Top header with controls
│   │   └── LayoutProvider.tsx     # Main layout wrapper
│   ├── dashboard\
│   │   ├── BalanceTrendChart.tsx  # Balance trend line chart
│   │   └── SpendingCategoryChart.tsx # Category breakdown chart
│   ├── transactions\
│   │   ├── TransactionFilters.tsx # Search & filter controls
│   │   ├── TransactionTable.tsx   # Transaction list table
│   │   └── TransactionModal.tsx   # Add/Edit transaction form
│   ├── analytics\
│   │   └── Charts.tsx             # Income/Expense & Savings charts
│   ├── insights\
│   │   └── InsightsModule.tsx     # Financial insights display
│   └── common\
│       ├── StatCard.tsx           # Reusable stat card
│       └── Skeleton.tsx           # Loading skeleton components
│
├── 📂 store\                        # State management
│   └── index.ts                   # Zustand store with all actions
│
├── 📂 lib\                          # Utility functions
│   └── calculations.ts            # Financial calculation utilities
│
├── 📂 types\                        # TypeScript definitions
│   └── index.ts                   # All type interfaces and enums
│
├── 📂 public\
│   └── [static assets]            # Next.js public assets
│
└── 📂 node_modules\                # Installed dependencies
```

## 📝 File Descriptions

### Root Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Defines dependencies and npm scripts |
| `tsconfig.json` | TypeScript compiler configuration |
| `next.config.ts` | Next.js build and runtime configuration |
| `tailwind.config.css` | Tailwind CSS theme and utilities |
| `eslint.config.mjs` | Code linting rules |
| `postcss.config.mjs` | PostCSS plugin configuration |

### App Directory (Next.js Routes)

| File | Route | Purpose |
|------|-------|---------|
| `app/page.tsx` | `/` | Home page (redirects to /dashboard) |
| `app/dashboard/page.tsx` | `/dashboard` | Dashboard overview |
| `app/transactions/page.tsx` | `/transactions` | Transaction management |
| `app/analytics/page.tsx` | `/analytics` | Financial analytics |
| `app/insights/page.tsx` | `/insights` | Financial insights |
| `app/settings/page.tsx` | `/settings` | Settings & preferences |
| `app/layout.tsx` | (root) | Root layout wrapper |
| `app/globals.css` | (global) | Global styles |

### Components

#### Layout Components (`components/layout/`)

**Sidebar.tsx**
- Navigation menu with links to all pages
- Active page highlighting
- Logo and branding
- Footer with copyright

**Header.tsx**
- Page title
- Role badge (clickable to switch roles)
- Theme toggle button (sun/moon)
- Auto-save on changes

**LayoutProvider.tsx**
- Wraps entire app with layout
- Manages localStorage persistence
- Handles theme application
- Auto-save mechanism (runs every second)

#### Dashboard Components (`components/dashboard/`)

**BalanceTrendChart.tsx**
- Uses Recharts LineChart
- Displays balance over time
- Responsive container
- Theme-aware colors
- Interactive tooltips

**SpendingCategoryChart.tsx**
- Uses Recharts PieChart (donut format)
- Shows expense breakdown by category
- Color-coded categories
- Legend for category reference
- Empty state handling

#### Transaction Components (`components/transactions/`)

**TransactionFilters.tsx**
- Search input (by description/category)
- Category dropdown filter
- Type dropdown filter (All/Income/Expense)
- Reset filters button
- Dynamic category list

**TransactionTable.tsx**
- Displays transactions in table format
- Column headers
- Pagination controls
- Admin-only action buttons
- Animated row entries
- Styled based on transaction type

**TransactionModal.tsx**
- Form for adding/editing transactions
- Date picker
- Description input
- Amount input
- Category input
- Type selector (Income/Expense)
- Submit and cancel buttons

#### Analytics Components (`components/analytics/`)

**Charts.tsx**
- IncomExpenseChart: Monthly comparison bar chart
- SavingsRateChart: Savings rate trend line chart
- Theme-aware styling
- Interactive legends and tooltips

#### Insights Components (`components/insights/`)

**InsightsModule.tsx**
- Displays financial insights as cards
- Color-coded based on insight type
- Icons for visual interest
- Data-driven recommendations
- Animated entry animations

#### Common Components (`components/common/`)

**StatCard.tsx**
- Reusable statistics card
- Icon, title, value display
- Optional trend indicator
- Color variants (blue, green, red, purple)
- Framer Motion animations

**Skeleton.tsx**
- Loading placeholder for cards
- Loading placeholder for tables
- Loading placeholder for charts
- Pulse animation
- Matches card dimensions

### Store (`store/index.ts`)

Zustand store with:
- Transaction management (add, edit, delete)
- Search and filter state
- Role management
- Theme management
- Pagination state
- localStorage persistence
- Auto-save/load functions

**State Structure:**
```typescript
{
  // Transactions
  transactions: Transaction[]
  
  // Filters
  searchQuery: string
  selectedCategory: string | null
  transactionType: 'all' | 'income' | 'expense'
  
  // User Settings
  userRole: 'viewer' | 'admin'
  theme: 'light' | 'dark'
  currentPage: number
  itemsPerPage: number
  
  // Actions & Methods
  // ... action functions
}
```

### Calculations Library (`lib/calculations.ts`)

Utility functions:
- `calculateDashboardStats()` - Calculate totals and percentages
- `getCategorySpending()` - Break down spending by category
- `getBalanceTrend()` - Generate trend data for charts
- `getMonthlyComparison()` - Monthly income/expense comparison
- `getHighestSpendingCategory()` - Find top spending category
- `getSavingsRate()` - Calculate savings percentage
- `filterTransactions()` - Filter with multiple criteria
- `getUniqueCategories()` - Get list of all categories
- `formatCurrency()` - Format numbers as currency
- `formatDate()` - Format date strings

### Types (`types/index.ts`)

TypeScript interfaces:
- `TransactionType` - 'income' | 'expense'
- `UserRole` - 'viewer' | 'admin'
- `Theme` - 'light' | 'dark'
- `Transaction` - Complete transaction object
- `DashboardStats` - Summary statistics
- `CategorySpending` - Spending per category
- `BalanceTrendData` - Historical balance data
- `MonthlyComparison` - Monthly income/expense

## 🔄 Component Hierarchy

```
<LayoutProvider>
  <div className="layout">
    <Sidebar />
    <Header />
    <main>
      {/* Page-specific components */}
      
      {/* Dashboard Page */}
      <StatCard />
      <BalanceTrendChart />
      <SpendingCategoryChart />
      
      {/* Transactions Page */}
      <TransactionFilters />
      <TransactionTable />
      <TransactionModal />
      
      {/* Analytics Page */}
      <IncomExpenseChart />
      <SavingsRateChart />
      
      {/* Insights Page */}
      <InsightsModule />
      
      {/* Settings Page */}
      {/* Form controls and buttons */}
    </main>
  </div>
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

### For Adding Features
- Add new page: Create file in `app/[feature]/page.tsx`
- Add component: Create in `components/[category]/NewComponent.tsx`
- Add utilities: Add to `lib/[category].ts`
- Add types: Update `types/index.ts`

### For Styling
- Global: Edit `app/globals.css`
- Component-specific: Use inline Tailwind classes
- Theme: Managed by `theme` state in store

### For State
- Use `useStore()` hook from `store/index.ts`
- Access any state or action function
- Changes auto-persist to localStorage

### For Calculations
- Import functions from `lib/calculations.ts`
- Use in components with `useEffect` and `useState`
- Memoize for performance where needed

## 📈 Scalability Notes

This structure is designed to:
- Scale easily with more pages
- Add new modules independently
- Maintain consistent patterns
- Keep concerns separated
- Enable code reuse
- Support team development

## 🚀 Build Output

When you run `npm run build`:
- `.next/` directory is created
- Optimized for production
- Can be deployed to any Node.js hosting
- Or use `npm start` for production server

---

This file structure provides a solid foundation for a modern, scalable financial dashboard application.
