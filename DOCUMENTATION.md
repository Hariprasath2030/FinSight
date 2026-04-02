# FinSight - Advanced Finance Dashboard

A modern, fully-featured finance dashboard built with Next.js 16, React 19, TypeScript, and Tailwind CSS. Track your finances with advanced visualizations, role-based access, and intelligent insights.

## 🚀 Features

### Core Features
- **Dashboard Overview**: Summary cards showing Total Balance, Income, Expenses, and Savings Rate
- **Interactive Charts**: 
  - Balance trend line chart
  - Spending category breakdown (donut chart)
  - Income vs Expenses bar chart
  - Savings rate trend visualization

### Transaction Management
- **View Transactions**: Complete transaction history with date, description, category, type, and amount
- **Advanced Filtering**: Search by description/category, filter by type (income/expense), filter by specific category
- **Sorting & Pagination**: Organized transaction display with page navigation
- **Admin Actions**: Add, edit, and delete transactions (Admin role only)

### Role-Based Access Control
- **Viewer Role**: View-only access to all financial data
- **Admin Role**: Full CRUD capabilities for transactions and settings

### Financial Insights
- **Smart Observations**: 
  - Top spending category identification
  - Savings rate analysis with recommendations
  - Balance trend tracking
  - Average transaction calculation
- **Data-Driven Recommendations**: Personalized suggestions based on spending patterns

### Theme Management
- **Light/Dark Mode**: Toggle between light and dark themes for comfortable viewing
- **Persistent Preferences**: Theme choice saved across sessions

### Data Export
- **JSON Export**: Download all transactions as JSON file
- **CSV Export**: Export transactions in CSV format for external analysis

### Data Persistence
- **Local Storage**: All data persists automatically using browser localStorage
- **Auto-Save**: Changes are saved automatically every second
- **No Backend Required**: Production-like experience without server dependency

## 📁 Project Structure

```
app/
├── dashboard/          # Dashboard overview page
├── transactions/       # Transactions list and management
├── analytics/         # Advanced charts and visualizations
├── insights/          # Financial insights page
├── settings/          # Settings and preferences
├── layout.tsx         # Root layout with LayoutProvider
├── page.tsx           # Home page (redirects to dashboard)
└── globals.css        # Global styles and Tailwind config

components/
├── layout/
│   ├── Sidebar.tsx      # Navigation sidebar
│   ├── Header.tsx       # Top header with theme/role toggle
│   └── LayoutProvider.tsx # Layout wrapper with theme and persistence
├── dashboard/
│   ├── BalanceTrendChart.tsx  # Balance trend visualization
│   └── SpendingCategoryChart.tsx # Category spending donut chart
├── transactions/
│   ├── TransactionFilters.tsx  # Filter and search component
│   ├── TransactionTable.tsx    # Transactions table with pagination
│   └── TransactionModal.tsx    # Add/Edit transaction modal
├── analytics/
│   └── Charts.tsx       # Income vs Expenses and Savings Rate charts
├── insights/
│   └── InsightsModule.tsx # Financial insights display
└── common/
    ├── StatCard.tsx     # Reusable stat card component
    └── Skeleton.tsx     # Loading skeleton components

lib/
└── calculations.ts      # Utility functions for financial calculations

store/
└── index.ts            # Zustand store for global state management

types/
└── index.ts            # TypeScript interfaces and types
```

## 🛠 Tech Stack

- **Framework**: Next.js 16.2.2
- **React**: 19.2.4
- **TypeScript**: Latest
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Charting**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Storage**: Browser LocalStorage

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FinSight
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Start production server**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## 🎯 Key Modules

### Dashboard Overview
- Displays 4 summary stat cards with trends
- Balance trend line chart showing historical balance
- Category spending breakdown with donut chart
- Real-time updates from transaction data

### Transactions Module
- **Search**: Find transactions by description or category
- **Filter**: By type (income/expense) and specific categories
- **Pagination**: Navigate through 10 transactions per page
- **Role-Based Actions**: 
  - Viewers: Read-only access
  - Admins: Add, edit, delete capabilities
- **Modal Interface**: Clean form for adding/editing transactions

### Analytics Module
- Income vs Expenses monthly comparison (bar chart)
- Savings rate trend visualization (line chart)
- Balance trend historical view
- Category-wise spending breakdown

### Insights Module
- **Top Spending Category**: Identifies highest expense category
- **Savings Rate Analysis**: Shows percentage and recommendations
- **Balance Trend**: Tracks whether balance is increasing/decreasing
- **Average Transaction**: Calculates typical expense amount

### Settings Module
- **Theme Settings**: Switch between light and dark modes
- **Role Management**: Toggle between Viewer and Admin roles
- **Data Export**: Download data as JSON or CSV
- **Data Summary**: Shows transaction count and storage info

## 💾 State Management with Zustand

The application uses Zustand for centralized state management:

```typescript
// Store includes:
- transactions: Transaction[]
- searchQuery: string
- selectedCategory: string | null
- transactionType: 'all' | 'income' | 'expense'
- userRole: 'viewer' | 'admin'
- theme: 'light' | 'dark'
- currentPage: number
- itemsPerPage: number

// Actions for all state updates and persistence
```

## 🔒 Security Notes

- Data is stored locally in the browser
- No data is sent to external servers
- Clear browser data will clear stored transactions
- Each browser/device has separate data storage

## 🎨 UI/UX Features

- **Responsive Design**: Full mobile, tablet, and desktop support
- **Animations**: Smooth transitions with Framer Motion
- **Dark Mode**: Full dark theme support
- **Accessibility**: Semantic HTML, proper ARIA labels
- **Loading States**: Skeleton loaders while data loads
- **Empty States**: User-friendly messages when no data available
- **Interactive Elements**: Hover effects, smooth transitions

## 📊 Sample Data

The application comes with sample transactions to demonstrate features:
- Salary income transactions
- Various expense categories (Food, Utilities, Transportation)
- Multi-month data for trend analysis

## 🚀 Performance Optimizations

- **Client-Side Rendering**: Optimized for fast interactions
- **Memoization**: React components optimized with proper memoization
- **Local Storage**: Instant data availability without API calls
- **Chart Optimization**: Efficient Recharts rendering

## 🔄 Development Workflow

### Best Development Flow (Recommended)
1. Start with layout and navigation ✅
2. Build summary cards ✅
3. Create transaction table ✅
4. Add filtering capabilities ✅
5. Implement role-based actions ✅
6. Add insights module ✅
7. Build analytics charts ✅
8. Implement dark mode ✅
9. Add persistence ✅
10. Final polish and animations ✅

## 🎓 Learning Resources

### Key Concepts Demonstrated
- **Component Composition**: Modular, reusable component structure
- **State Management**: Zustand for global state
- **Type Safety**: Full TypeScript implementation
- **Data Visualization**: Recharts for professional charts
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Theme switching implementation
- **Local Storage**: Client-side data persistence
- **Form Handling**: Controlled components and validation

## ✅ Quality Metrics

- ✅ **Design**: Modern, professional UI with consistent styling
- ✅ **Responsiveness**: Works seamlessly on all screen sizes
- ✅ **Functionality**: All features fully implemented and working
- ✅ **Technical Quality**: TypeScript, proper error handling, clean code
- ✅ **User Experience**: Smooth animations, intuitive navigation, helpful insights

## 🌟 Future Enhancement Ideas

- Backend API integration for data persistence
- Multi-currency support
- Budget creation and tracking
- Monthly financial goals
- Recurring transactions
- Investment tracking
- Bill reminders
- Advanced filtering with date ranges
- Custom report generation
- Data visualization improvements
- Social features for budget sharing

## 📝 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

Contributions are welcome! Feel free to submit pull requests with improvements and new features.

---

Built with ❤️ using Next.js and modern web technologies.
