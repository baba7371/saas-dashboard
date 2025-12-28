# Modern SaaS Dashboard (React + Tailwind)

A production-ready, high-performance SaaS dashboard frontend inspired by Stripe. This project features a dual-role architecture (Admin & User panels), interactive analytics charts, dark mode support, and a fully responsive layout.

![Dashboard Preview](https://github.com/baba7371/saas-dashboard/blob/main/public/preview.png?raw=true)
*(Note: You can upload a screenshot to your repo later and name it preview.png to make this image appear)*

## 🚀 Features

### Core Architecture
- **Dual Role System:** Separate environments for **Users** (Dashboard, Billing) and **Admins** (User Management, Revenue).
- **Responsive Layout:** Mobile-friendly Sidebar with collapsible "Mini Mode" on desktop.
- **Dark/Light Mode:** Fully integrated theme toggling with Tailwind CSS v4.

### User Panel
- **Overview Dashboard:** KPI cards with trend indicators and interactive line charts.
- **Analytics:** Visual data breakdown using Line and Bar graphs (`Recharts`).
- **Billing & Invoices:** Searchable data table with status badges and download actions.
- **Settings:** Profile management with form inputs and toggle switches.

### Admin Panel
- **User Management:** Advanced table to view, filter, and manage registered users.
- **Status Monitoring:** Real-time visibility into user roles and subscription statuses.

---

## 📂 Project Structure & Component Guide

This project follows a clean, modular architecture designed for scalability.

### 1. `src/components/ui` (Atoms)
*Reusable, low-level primitives used throughout the app.*
- **`Button.jsx`:** Versatile button component supporting multiple variants (primary, ghost, danger) and sizes.
- **`Card.jsx`:** The foundational container with consistent padding, borders, and shadow styles.
- **`Toggle.jsx`:** iOS-style switch for handling boolean states (e.g., enabling notifications).
- **`Badge.jsx`:** Visual indicators for status (Active, Pending, Failed).

### 2. `src/components/shared` (Molecules)
*Complex components specific to the dashboard layout.*
- **`Sidebar.jsx`:** Smart navigation that adapts based on `role` (Admin vs User) and supports a collapsed "Mini" state.
- **`Navbar.jsx`:** Top navigation bar handling Global Search, Notifications, and Theme Toggling.
- **`DataTable.jsx`:** A high-powered table component with built-in search filtering and pagination logic.
- **`StatsCard.jsx`:** KPI display component showing a metric, icon, and percentage growth trend (up/down).

### 3. `src/components/charts` (Visuals)
*Data visualization wrappers using Recharts.*
- **`OverviewChart.jsx`:** Smooth area chart with gradient fills for usage trends.
- **`BarGraph.jsx`:** Vertical bar chart for categorical data (e.g., Revenue by Plan).

### 4. `src/layouts`
- **`DashboardLayout.jsx`:** The "Shell" of the application. It handles the responsive sidebar state, layout shifts (collapse/expand), and theme context.

### 5. `src/pages`
- **`UserDashboard.jsx`:** The main landing page for users, aggregating stats and charts.
- **`Analytics.jsx`:** Detailed view combining multiple chart types.
- **`UserManagement.jsx` (Admin):** Administrative view for managing the user base.
- **`Settings.jsx`:** Form-heavy page demonstrating input handling and state management.

---

## 🛠️ Tech Stack

- **Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Charts:** Recharts
- **Routing:** React Router DOM 6
- **Utilities:** clsx, tailwind-merge (for class handling)

---

## ⚡ Getting Started

1. **Clone the repository**

   git clone [https://github.com/baba7371/saas-dashboard.git](https://github.com/baba7371/saas-dashboard.git)
   cd saas-dashboard

2. **Install dependencies**

     npm install


3. **Run the development server**

     npm run dev

© Author & License
Developed by @baba7371

This project is open for educational use and portfolio references. Please credit the original author if you use this codebase as a template for commercial projects.     