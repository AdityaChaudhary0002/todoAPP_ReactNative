# 🚀 React Native To-Do Application (Premium Edition)

A production-ready Mobile To-Do List Application built using **React Native CLI** and **TypeScript**. 
This project was designed for a high-quality user experience featuring a custom **Glassmorphism Dark Theme**, **Firebase Authentication**, and an advanced **Mixed-Priority Sorting Algorithm**.

## ✨ Features & Assignment Objectives Completed

### 1. Mandatory Requirements Achieved (100%)
- **React Native CLI (TypeScript)**: Clean setup and type-safety across components.
- **Firebase Authentication**: Secure User Registration and Login via Email/Password credentials.
- **Context API for State Management**: Efficient, decoupled flow avoiding prop-drilling or large dependencies (`AuthContext` & `TaskContext`).
- **Complete Task CRUD**: Creating, viewing, checking (marking completed), and deleting tasks flawlessly.
- **Task Meta-data**: Users can add Titles, Descriptions, Dates, Deadlines, and Priority levels for each task via a sleek Modal UI.

### 2. 🌟 Bonus Core Features & Enhancements Implemented
- **🔥 Mixed Sorting Algorithm (Deadline + Priority Mix)**: The task list is automatically sorted using a custom mathematical weightage formula. Tasks closest to the deadline and labeled 'High Priority' are pushed to the top of the queue dynamically!
- **🎨 Glassmorphism & Dark UI**: A visually appealing, translucent card effect using custom `rgba` styling boundaries and layered drop shadows to give a premium feel over a deep dark background (`#121212`).
- **📱 Optimistic UI Updates**: The "Add Task" modal instantly vanishes upon clicking save to give zero-latency visual feedback before the background sync completes.
- **🔍 Smart Filtering & Searching**: Added native-speed `useMemo` search logic to filter through tasks by Title/Description and segment them by Pending/Completed status.

## 🛠️ Project Clean Architecture
The application is structured for scalability and readability:
```text
src/
├── components/       # Reusable UI Blocks (e.g., TaskCard with Glassmorphism)
├── context/          # State Managers (AuthContext, TaskContext)
├── screens/          # Application Views (AuthScreen, TodoListScreen)
├── services/         # Firebase Integrations & Listeners
├── theme/            # Global Constants (Color Tokens)
└── types/            # TypeScript Interfaces (Task, User)
```

## ⚙️ Getting Started (Run the App Locally)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AdityaChaudhary0002/todoAPP_ReactNative.git
   cd todoAPP_ReactNative
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Android Setup:**
   - Ensure an Android Emulator is running.
   - *Note: Ensure you place your `google-services.json` file in `android/app/` to connect to your Firebase Project.*
   - Run the application:
   ```bash
   npm run android
   ```

---
*Developed for the React Native Developer Assignment.*
