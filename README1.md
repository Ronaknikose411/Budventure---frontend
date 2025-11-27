

# 📌 **Chat Support System – README**

This project is a complete **AI + Human Support Chat System** with:

✅ Website Chat Widget
✅ AI Bot + Human Agent Switching
✅ Super Admin Panel
✅ Chat Monitoring (Waiting, Active, History)

---

# 🚀 **Project Overview**

This system allows users to chat with an AI chatbot from any website.
If the bot cannot handle the conversation, the chat shifts to a **Human Support Agent**.

Super Admin can view:

* **Waiting Chats** (Customers waiting for human help)
* **Active Chats** (Human agent currently chatting)
* **Chat History** (All past chat sessions)

AI + Human hybrid chat support improves customer experience and reduces manual work.

---

# 🧩 **Key Features**

## 🧑‍💻 **1. AI Chatbot (Frontend Widget)**

Accessible at:

👉 **[http://localhost:5173/chatbot](http://localhost:5173/chatbot)**

Features:

* Real-time chat with AI bot
* Auto-generated session ID
* Messages stored in backend
* User can request human help
* Smooth floating widget design

---

## 🧑‍✈️ **2. Super Admin Panel**

Accessible at:

👉 **[http://localhost:5173/login](http://localhost:5173/login)**

### **Login Credentials (Fixed)**

* **Email:** `superadmin@gmail.com`
* **Password:** `SuperAdmin5050`

### Admin Features:

### ✔ **Waiting Chats**

Customers who are waiting for a human agent.

### ✔ **Active Chats**

Chats currently being handled by a human.

### ✔ **Chat History**

Full log of every session:

* Session ID
* User messages
* AI messages
* Timestamps

Admin can open any session and view complete message logs.

---

# 🗂 **Folder Structure (High-Level)**

```
frontend/
│── src/
│   ├── pages/
│   │   ├── ChatPenal.jsx        // Main admin panel tabs
│   │   └── SuperAdmin/Table/
│   │        ├── WaitingChatData.jsx
│   │        ├── ActiveChatData.jsx
│   │        └── ChatHistoryData.jsx   // Full session history
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── ...
backend/
│── controllers/
│── routes/
│── models/
│── ...
```

---

# 🔌 **API Endpoints (Used in Project)**

### ✔ **Get All Sessions**

```
GET /api/widget/history
```

### ✔ **Get Single Session Chat**

```
GET /api/widget/history/:session_id
```

### ✔ **Send Message (AI + User)**

```
POST /api/widget/chat
```

---

# 🔐 **Authentication**

Super Admin login uses:

* JWT Auth
* Token stored in localStorage
* Private routes for dashboard

---

# ⚙ **Technical Stack**

### **Frontend**

* React + Vite
* Axios
* TailwindCSS
* React Context for Auth
* Component-based table structure

### **Backend**

* Node.js
* Express
* MongoDB
* Mongoose
* JWT Auth
* Session-based chat saving

---

# 📦 **Functions Implemented**

### 🟣 1. **AI Chat + User Chat**

AI responds automatically using your logic or third-party API.

### 🟣 2. **Chat Session Generation**

Every chat gets a unique:

```
session_12345
```

stored in DB.

### 🟣 3. **Session History Storage**

All messages stored as:

```json
{
  "sender": "user",
  "text": "Hello",
  "timestamp": "2025-11-26T18:15:28.488Z"
}
```

### 🟣 4. **Human Handoff**

AI → Human switching supported.

### 🟣 5. **Waiting / Active Status Update**

Backend marks sessions as:

* `waiting`
* `active`
* `closed`

### 🟣 6. **Super Admin Dashboard**

All sessions visible with clean UI.

---

# 🔒 **Limits / Restrictions Implemented**

### 🔸 Fixed Super Admin Login

Email + password cannot be changed:

```
Email: superadmin@gmail.com
Password: SuperAdmin5050
```

### 🔸 Only 1 Super Admin Exists

No option to add more.

### 🔸 AI Chatbot Works Without Login

But admin panel requires login.

### 🔸 Chatbot Does Not Identify Users

Every new chat generates a new session ID.

### 🔸 No File Upload or Image Messages

Currently text-only chat.

---

# 🛠 **Installation (Developer Guide)**

### 1️⃣ Backend Setup

```
cd backend
npm install
npm start
```

### 2️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

# 📌 Access URLs

| Feature               | URL                                                                    |
| --------------------- | ---------------------------------------------------------------------- |
| Chatbot Widget        | **[http://localhost:5173/chatbot](http://localhost:5173/chatbot)**     |
| Super Admin Login     | **[http://localhost:5173/login](http://localhost:5173/login)**         |
| Super Admin Dashboard | **[http://localhost:5173/chatpanel](http://localhost:5173/dashboard)** |

---

# 🎯 **Result**

You now have a full:

✔ AI Chat Support
✔ Human Agent Support
✔ Admin Dashboard
✔ Full Chat History System
✔ Real-time Session Handling

Everything is working end-to-end.

