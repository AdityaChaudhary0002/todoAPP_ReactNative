# 🚀 React Native To-Do App (Assignment)

A modern, full-featured To-Do application built with **React Native CLI** and **TypeScript**. This application includes Firebase Authentication, real-time data syncing using Firestore, and an advanced Task Sorting Algorithm. 

Built with special consideration for a **Premium Glassmorphism UI** & dynamic user experience.

---

## 🌟 Features Implemented

### 🎯 Core Requirements
- **User Authentication:** Secure Registration & Login using Firebase Auth (Email/Password).
- **Task Management (CRUD):** Add, View, Toggle (Complete/Pending), and Delete tasks.
- **Task Metadata:** Each task saves a Title, Description, Date-Time, Deadline, and Priority.
- **State Management:** Fully implemented structured app-wide state using React's **Context API**.
- **Tech Stack:** React Native CLI & TypeScript. Clean architecture handling types elegantly.

### 🏆 Bonus / Outstanding Features
- **Mixed-Sorting Algorithm:** Intelligently sorts tasks by calculating a combined weight of **Priority** (High/Medium/Low) + **Deadline Proximity** (sooner deadlines float to top).
- **Advanced Filtering & Search:** Filter by "All", "Pending", "Completed", and search tasks by keyword dynamically.
- **Cool & Creative UI/UX:** 
  - Unique Dark Mode with Glassmorphism frosted-glass styled inputs & modals.
  - Custom Color Palettes highlighting High Priority items clearly.
- **Clean Code & Comments:** Organized folder structures (components, screens, context, services) with proper explanatory developer comments for crucial logics.

---

## 🛠 Setup & Installation

**1. Clone the repository**
```bash
git clone <your-github-repo-url>
cd todoAPP
```

**2. Install dependencies**
```bash
npm install
```

**3. Run the App (Android / iOS)**
```bash
# Start the Metro Bundler
npm start

# In a new terminal tab, run on Android:
npx react-native run-android

# OR run on iOS:
npx react-native run-ios
```

---

## 🧑‍💻 Architecture Summary
- **`/src/components`**: Reusable UI parts (`TaskCard.tsx`).
- **`/src/context`**: Context Providers handling App State (`AuthContext.tsx`, `TaskContext.tsx`).
- **`/src/screens`**: Main Application views (`AuthScreen.tsx`, `TodoListScreen.tsx`).
- **`/src/theme`**: Holds Design System colors & tokens (`colors.ts`).
- **`/src/types`**: TypeScript interfaces defining exact data models (`index.ts`).

---

**Submitted by:** Aditya
**For Assignment Evaluation**
