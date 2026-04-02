# FinSight - Quick Start Guide

Welcome to FinSight! Here's everything you need to know to get started with your advanced finance dashboard.

## 🚀 Getting Started

### 1. Start the Development Server
```bash
cd c:\Users\Hariprasath\Documents\GitHub\FinSight
npm install --legacy-peer-deps  # If dependencies not installed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You'll be automatically redirected to the dashboard.

## 📊 Dashboard Tour

### Left Sidebar Navigation
- **Dashboard**: Main overview with summary cards and charts
- **Transactions**: Full transaction list with filtering and search
- **Analytics**: Advanced charting and financial analysis
- **Settings**: Theme, role, and export options

### Top Header
- **Current View Title**: Shows the active page
- **Role Badge**: Click to switch between Viewer and Admin roles
- **Theme Toggle**: Click to switch between light and dark modes

## 💰 Key Features Explained

### Dashboard Overview
The main landing page displays:
- **4 Summary Cards**: Total Balance, Total Income, Total Expenses, Savings Rate
- **Balance Trend Chart**: Line chart showing your balance over time
- **Spending by Category**: Donut chart showing where your money goes

### Transactions Page
Manage your financial transactions:
- **Search**: Type to find transactions by description or category
- **Filters**: 
  - Filter by transaction type (All, Income, Expense)
  - Filter by specific category
- **Admin Actions** (when in Admin role):
  - Click the "Add Transaction" button to create new transactions
  - Click the edit icon (pencil) to modify transactions
  - Click the delete icon (trash) to remove transactions
- **Pagination**: Navigate through pages with the pagination controls

### Analytics Page
Visual analysis of your finances:
- **Income vs Expenses**: Bar chart comparing monthly income and expenses
- **Savings Rate**: Line chart tracking your savings percentage over time
- **Balance Trend**: Historical balance visualization
- **Category Breakdown**: Where you're spending money

### Insights Page
Smart financial observations:
- **Top Spending Category**: Your highest expense category
- **Savings Rate Analysis**: How much you're saving with recommendations
- **Balance Trend**: Is your balance increasing or decreasing?
- **Average Transaction**: Typical expense amount

### Settings Page
Customize your experience:
- **Theme**: Choose between Light and Dark modes
- **Role Management**: Switch between Viewer (read-only) and Admin (full control)
- **Export Data**: Download transactions as JSON or CSV
- **Data Summary**: See how much data is stored

## 👥 Working with Roles

### Viewer Role (Default)
- View all dashboards and charts
- View transactions and search
- View insights and analytics
- Cannot modify any data
- Perfect for reviewing and monitoring finances

### Admin Role
- All Viewer permissions plus:
- Add new transactions
- Edit existing transactions
- Delete transactions
- Manage settings
- Perfect for recording daily transactions

**To switch roles**: Click the role badge in the top header and select a new role.

## 📝 Adding a Transaction (Admin Only)

1. Go to **Transactions** page
2. Click the "Add Transaction" button (only visible in Admin role)
3. Fill in the form:
   - **Date**: When the transaction occurred
   - **Description**: What is this transaction for?
   - **Amount**: How much money?
   - **Category**: What category? (Food, Utilities, Salary, etc.)
   - **Type**: Income or Expense?
4. Click "Add" to save

## 🔍 Searching and Filtering Transactions

1. Go to **Transactions** page
2. Use the **Search** box to find transactions by description or category
3. Use the **Category** dropdown to filter by specific category
4. Use the **Type** dropdown to show only Income or Expense
5. Click "Reset Filters" to clear all filters

## 🌙 Switching Themes

- **Click the Sun/Moon icon** in the top right header to toggle themes
- Your theme preference is saved automatically
- Changes apply to the entire dashboard

## 💾 Data Storage

- **Where is my data stored?**: Browser Local Storage (no server needed)
- **Is it secure?**: Data stays on your computer, not sent anywhere
- **Will it persist?**: Yes! Data survives browser restarts
- **What if I clear data?**: Clearing browser storage will delete all transactions

## 📥 Exporting Your Data

1. Go to **Settings** page
2. Scroll to "Export Data" section
3. Click either:
   - **Export JSON**: For backup or data analysis
   - **Export CSV**: For spreadsheet applications like Excel

## 🎨 Dashboard Design Features

- **Responsive Layout**: Works on mobile, tablet, and desktop
- **Dark Mode**: Easy on the eyes in low light
- **Smooth Animations**: Professional transitions and effects
- **Loading Skeletons**: Visual feedback while data loads
- **Hover Effects**: Interactive elements respond to mouse movement

## 📊 Understanding the Charts

### Balance Trend
- Shows how your total balance changes over time
- Upward trend = you're saving money
- Downward trend = you're spending more than earning

### Spending by Category
- Pie/Donut chart showing expense breakdown
- Click legend items to focus on specific categories
- Shows both amounts and percentages

### Income vs Expenses
- Bar chart comparing income and expenses by month
- Blue bars = Income
- Red bars = Expenses
- Helps identify months where you spent more

### Savings Rate
- Line chart showing percentage of income you save
- 20%+ is generally considered healthy
- Below 10% means opportunity to increase savings

## 💡 Tips & Tricks

### Organization Tips
- Use consistent category names (e.g., "Groceries" not "Grocery" and "grocery")
- Add descriptions that help you remember transactions
- Keep transaction types consistent (Income vs Expense)

### Insight Tips
- Higher savings rate = better financial health
- Track your highest spending category monthly
- Compare months to identify spending patterns
- Look for unusual transactions in the balance trend

### Export Tips
- Export data monthly for backup
- Use CSV to analyze data in Excel or Google Sheets
- Keep exports organized by date

## ⚡ Keyboard Shortcuts

- No special keyboard shortcuts yet, but they could be added in future versions!

## 🐛 Troubleshooting

### Data not saving?
- Check if your browser allows localStorage
- Clear browser cache and reload

### Charts not showing?
- Make sure you have transactions with valid dates
- Pie chart needs at least one expense transaction
- Bar chart needs transactions from multiple months

### Wrong time zone?
- Dates are stored as-is, displayed in your local format
- Ensure your system date is correct

### Feature not working?
- Refresh the page
- Check if you're in the correct role
- Try switching themes to see if it's a display issue

## 🎓 Next Steps

1. **Click through each page** to explore the features
2. **Add a few transactions** using the Admin role
3. **Check the Analytics** to see your data visualized
4. **Read the Insights** for personalized observations
5. **Customize your Settings** (theme, role preferences)
6. **Export your data** to back it up

## 📞 Need Help?

- Check the **DOCUMENTATION.md** for technical details
- Review the **Component structure** in the code
- Examine sample transactions in the store

## 🌟 Features Highlight

✅ Complete dashboard with real-time updates
✅ Advanced transactions management
✅ Beautiful charts and visualizations
✅ Financial insights and analytics
✅ Role-based access control
✅ Dark mode support
✅ Data export functionality
✅ Local storage persistence
✅ Responsive design
✅ Smooth animations

---

Enjoy using FinSight! Your feedback and suggestions for improvements are always welcome.
