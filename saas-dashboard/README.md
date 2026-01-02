# Modern SaaS Dashboard (MERN Stack)

A production-ready SaaS dashboard built with the **MERN Stack** (MongoDB, Express, React, Node.js). This project features a dual-role architecture (Admin & User), secure authentication, dynamic profile management, and interactive analytics.

## Images of working Web is available in Preview Folder.....
## 🚀 Features

### Core Architecture
- **Full Stack Auth:** Secure Login, Registration, and "Forgot Password" flows using JWT.
- **Role-Based Access:** Distinct interfaces for **Admins** (User Management) and **Users** (Dashboard).
- **Protected Routes:** Smart routing that redirects unauthenticated users.

### User Features
- **Dynamic Profile:** Update Name and Profile Picture (stored as Base64 in MongoDB).
- **Interactive Dashboard:** Real-time data visualization with Recharts.
- **Settings & Billing:** Form handling and toggle switches for preferences.

### Admin Features
- **User Management:** View, filter, and monitor registered users in real-time.
- **Status Monitoring:** Track active subscriptions and login activity.

---

## 🛠️ Tech Stack

- **Frontend:** React 18 (Vite), Tailwind CSS v4, Framer Motion, Lucide Icons.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (Local or Atlas).
- **State Management:** React Context / LocalStorage for session handling.

---

## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone [https://github.com/baba7371/saas-dashboard.git](https://github.com/baba7371/saas-dashboard.git)
cd saas-dashboard

```

### 2. Setup the Backend (Server)

Open a terminal and run:

```bash
cd server
npm install
npm run dev

```

*The server will run on `http://localhost:5000` and connect to your local MongoDB.*

### 3. Setup the Frontend (Client)

Open a **new** terminal (keep the server running) and run:

```bash
# Return to root folder if inside server
cd .. 

npm install
npm run dev

```

*The app will run on `http://localhost:5173`.*

---

## 📂 Project Structure

```
├── server/              # Backend Code
│   ├── models/          # MongoDB Schemas (User.js)
│   └── index.js         # Express Server & API Routes
│
├── src/                 # Frontend Code
│   ├── components/      # Reusable UI (Buttons, Cards, Sidebar)
│   ├── layouts/         # Dashboard & Auth Layouts
│   ├── pages/           # Admin & User Pages
│   └── App.jsx          # Routing & Security Logic

```

---

## © Author

**Developed by [@baba7371**](https://www.google.com/search?q=https://github.com/baba7371)

This project is open for educational use and portfolio references.
