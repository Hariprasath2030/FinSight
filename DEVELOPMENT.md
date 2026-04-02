# FinSight Development Guide

A comprehensive guide for developers who want to understand, extend, and maintain the FinSight dashboard.

## 🎯 Getting Started with Development

### Initial Setup
```bash
# Clone and install
cd c:\Users\Hariprasath\Documents\GitHub\FinSight
npm install --legacy-peer-deps

# Start development server
npm run dev

# Open http://localhost:3000 in browser
```

### Project Structure Overview
- **App Routes**: `app/` directory (Next.js App Router)
- **Components**: `components/` directory (organized by feature)
- **State**: `store/index.ts` (Zustand)
- **Utilities**: `lib/calculations.ts` (shared functions)
- **Types**: `types/index.ts` (TypeScript interfaces)

## 🏗️ Architecture Patterns

### Component Structure
Each functional area has its own component folder:
```
components/
├── layout/          # Navigation and layout components
├── dashboard/       # Dashboard-specific components
├── transactions/    # Transaction list and forms
├── analytics/       # Chart components
├── insights/        # Insight display components
└── common/          # Reusable components
```

### State Management Pattern
```typescript
// In any component
import { useStore } from '@/store';

export function MyComponent() {
  // Select specific state
  const transactions = useStore((state) => state.transactions);
  const addTransaction = useStore((state) => state.addTransaction);
  
  // Use in component
  const handleAdd = (newTx) => {
    addTransaction(newTx);
  };
  
  return (/* ... */);
}
```

### Data Flow
```
User Interaction (click, input, etc.)
  ↓
Event Handler in Component
  ↓
Call Zustand Store Action
  ↓
Store Updates State
  ↓
Component Re-renders with New State
  ↓
Auto-save to localStorage (every second)
```

## 📊 Understanding Key Components

### Dashboard Page (`app/dashboard/page.tsx`)
- Displays summary statistics
- Renders balance trend chart
- Renders spending category chart
- Uses `calculateDashboardStats()` for data

**Key Dependencies:**
- `useStore()` for transactions
- `calculateDashboardStats()` for metrics
- `BalanceTrendChart` component
- `SpendingCategoryChart` component

### Transactions Page (`app/transactions/page.tsx`)
- Manages transaction display
- Handles add/edit modal
- Wraps filter, table, and modal components
- Role-based button visibility

**Key Dependencies:**
- `useStore()` for transactions and role
- `TransactionFilters` component
- `TransactionTable` component
- `TransactionModal` component

### Settings Page (`app/settings/page.tsx`)
- Theme switching interface
- Role switching interface
- Data export functionality (JSON/CSV)
- Data summary display

**Export Implementation:**
```typescript
// JSON Export
const data = { transactions, exportDate, version };
const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
// Create download link...

// CSV Export
const csv = [headers, ...rows].join('\n');
const blob = new Blob([csv], { type: 'text/csv' });
// Create download link...
```

## 🔧 Extending the Application

### Adding a New Feature

#### 1. Create Types (if needed)
```typescript
// In types/index.ts
export interface MyNewType {
  id: string;
  name: string;
  value: number;
}
```

#### 2. Create Store Actions
```typescript
// In store/index.ts
interface StoreState {
  myFeatures: MyNewType[];
  addMyFeature: (feature: MyNewType) => void;
  // ... other actions
}

export const useStore = create<StoreState>((set, get) => ({
  myFeatures: [],
  addMyFeature: (feature) =>
    set((state) => ({
      myFeatures: [...state.myFeatures, feature],
    })),
}));
```

#### 3. Create Components
```typescript
// In components/myfeature/MyComponent.tsx
import { useStore } from '@/store';

export function MyComponent() {
  const features = useStore((state) => state.myFeatures);
  
  return (
    <div>
      {features.map((feature) => (
        <div key={feature.id}>{feature.name}</div>
      ))}
    </div>
  );
}
```

#### 4. Create Page
```typescript
// In app/myfeature/page.tsx
import { MyComponent } from '@/components/myfeature/MyComponent';

export default function MyFeaturePage() {
  return (
    <div>
      <h1>My Feature</h1>
      <MyComponent />
    </div>
  );
}
```

#### 5. Add Route to Sidebar
```typescript
// In components/layout/Sidebar.tsx
const navItems = [
  // ... existing items
  { href: '/myfeature', label: 'My Feature', icon: SomeIcon },
];
```

### Adding a New Chart

#### 1. Create Chart Component
```typescript
// In components/analytics/NewChart.tsx
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useStore } from '@/store';

export function NewChart() {
  const transactions = useStore((state) => state.transactions);
  const theme = useStore((state) => state.theme);
  const [data, setData] = useState<any[]>([]);
  
  useEffect(() => {
    // Calculate chart data from transactions
    const chartData = transformData(transactions);
    setData(chartData);
  }, [transactions]);
  
  return (
    <div className="rounded-xl border bg-white dark:bg-gray-900 p-6">
      <h2 className="text-lg font-semibold mb-6">Chart Title</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          {/* Chart components */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
```

#### 2. Add to Analytics Page
```typescript
// In app/analytics/page.tsx
import { NewChart } from '@/components/analytics/NewChart';

export default function AnalyticsPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ExistingChart />
      <NewChart /> {/* Add here */}
    </div>
  );
}
```

### Modifying Calculations

#### Adding New Calculation Function
```typescript
// In lib/calculations.ts
export function myNewCalculation(transactions: Transaction[]): any {
  // Implement logic
  return result;
}

// In component
import { myNewCalculation } from '@/lib/calculations';

useEffect(() => {
  const result = myNewCalculation(transactions);
  setData(result);
}, [transactions]);
```

## 🎨 Styling Guidelines

### Using Tailwind Classes
```typescript
// Prefer utility classes
<div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
  {/* Content */}
</div>
```

### Dark Mode Support
Always include dark mode variants:
```typescript
// Light mode first, then dark:
<div className="bg-white dark:bg-gray-900">
<p className="text-gray-900 dark:text-white">
<button className="hover:bg-gray-50 dark:hover:bg-gray-900">
```

### Color Scheme
- **Primary**: Blue (`blue-600`, `blue-50`)
- **Success**: Green (`green-600`, `green-50`)
- **Danger**: Red (`red-600`, `red-50`)
- **Warning**: Amber (`amber-600`, `amber-50`)
- **Neutral**: Gray (`gray-600`, `gray-50`)

### Responsive Breakpoints
```typescript
// Use Tailwind's responsive prefixes
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
//       mobile    tablet        desktop
```

## 🧪 Testing Tips

### Manual Testing Checklist
- [ ] Test on mobile (use browser dev tools)
- [ ] Test on tablet
- [ ] Test on desktop
- [ ] Toggle dark mode
- [ ] Switch roles (Viewer ↔ Admin)
- [ ] Add/edit/delete transactions
- [ ] Refresh page (verify persistence)
- [ ] Test search and filters
- [ ] Try pagination
- [ ] Export data
- [ ] Check all charts render

### Browser DevTools Tips
```javascript
// In browser console, access store
import { useStore } from '@/store';
const store = useStore.getState();
console.log(store.transactions);

// Manually trigger save
store.saveToLocalStorage();

// Check localStorage
console.log(localStorage.getItem('financeStore'));
```

## 🚀 Performance Optimization

### Memoization
```typescript
import { useMemo } from 'react';

export function ExpensiveComponent({ transactions }) {
  const calculations = useMemo(
    () => calculateDashboardStats(transactions),
    [transactions]
  );
  
  return (/* ... */);
}
```

### Selective State Subscription
```typescript
// Good: Only subscribe to what you need
const transactions = useStore((state) => state.transactions);

// Avoid: Subscribing to entire store
const state = useStore();
```

### Chart Optimization
```typescript
// Use ResponsiveContainer for proper sizing
// Limit number of data points in charts
// Use appropriate data aggregation
```

## 🔐 Security Considerations

### Input Validation
```typescript
// Validate before storing
if (!description || description.trim() === '') {
  throw new Error('Description is required');
}

const amount = parseFloat(amountInput);
if (isNaN(amount) || amount <= 0) {
  throw new Error('Invalid amount');
}
```

### localStorage Best Practices
```typescript
// Always wrap in try-catch
try {
  localStorage.setItem('key', JSON.stringify(data));
} catch (error) {
  console.error('Storage quota exceeded', error);
}

// Check if localStorage is available
if (typeof window !== 'undefined') {
  // Safe to use localStorage
}
```

## 🐛 Debugging

### Common Issues and Solutions

**Issue: Dark mode toggle not working**
- Check if theme is being saved to localStorage
- Verify `theme` class is applied to `<html>` element
- Check Tailwind dark mode configuration

**Issue: Transactions not persisting**
- Check browser localStorage settings
- Verify `saveToLocalStorage()` is being called
- Check for console errors

**Issue: Charts not rendering**
- Verify data structure matches Recharts requirements
- Check if transactions array is empty
- Verify theme colors are correct

**Issue: Filters not working**
- Check if filter state is being set correctly
- Verify filter logic in `filterTransactions()`
- Check if component is re-rendering

### Debug Console Logs
Add strategic console logs:
```typescript
useEffect(() => {
  console.log('Transactions updated:', transactions);
  const stats = calculateDashboardStats(transactions);
  console.log('Calculated stats:', stats);
}, [transactions]);
```

## 📚 Resource References

### Documentation Files
- `DOCUMENTATION.md` - Complete feature documentation
- `QUICKSTART.md` - User quick start guide
- `FILE_STRUCTURE.md` - Project file organization
- `PROJECT_SUMMARY.md` - Implementation summary

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org)
- [Framer Motion Docs](https://www.framer.com/motion)

## 🤝 Contributing Guidelines

### Code Style
- Use TypeScript for type safety
- Use functional components with hooks
- Use Tailwind for styling
- Follow existing naming conventions
- Add comments for complex logic
- Keep functions small and focused

### Component Structure
```typescript
'use client'; // Add if using client hooks

import { dependencies };
import types from '@/types';

interface Props {
  // Define props
}

export function ComponentName({ prop1, prop2 }: Props) {
  // Hooks
  const store = useStore(...);
  const [state, setState] = useState(...);
  
  // Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  // Handlers
  const handleClick = () => {
    // Handle event
  };
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

## 🚢 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deployment Platforms
- **Vercel**: Optimized for Next.js
- **Netlify**: Supports Next.js with configuration
- **AWS Amplify**: Good for larger projects
- **Self-hosted**: Standard Node.js server

### Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_API_URL=https://api.example.com
```

## 📈 Future Enhancement Ideas

### Short Term
- [ ] Add transaction categories editor
- [ ] Implement custom date range filters
- [ ] Add budget tracking
- [ ] Show trends over time

### Medium Term
- [ ] Add backend API integration
- [ ] Implement user authentication
- [ ] Add multi-user support
- [ ] Create recurring transactions feature

### Long Term
- [ ] Mobile app version
- [ ] Advanced analytics
- [ ] AI-powered recommendations
- [ ] Integration with banks

## ✅ Checklist for New Features

- [ ] Create types/interfaces
- [ ] Add store actions/state
- [ ] Create components
- [ ] Create page component
- [ ] Add navigation route
- [ ] Add to sidebar menu
- [ ] Test on desktop
- [ ] Test on mobile
- [ ] Test dark mode
- [ ] Test persistence
- [ ] Document new feature
- [ ] Update this guide if needed

---

Happy developing! Feel free to extend this dashboard with your own ideas and features.
