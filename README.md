# 🧠 Real-Time Multiplayer Quiz App

A fast, real-time quiz platform built with **WebSockets** and **Redis**.  
Create quizzes, host rooms, invite players, and watch the leaderboard update instantly.  
Includes AI-assisted question generation for smoother quiz creation.

---

## 🚀 Features

- **Create Questions** – Add your own custom questions.
- **Build Quizzes** – Combine selected questions into structured quizzes.
- **Create Rooms** – Host a room for any quiz and share the room code.
- **Real-Time Gameplay** – Live question streaming and synchronized answering via WebSockets.
- **Live Leaderboard** – Scores update instantly.
- **AI Support** – Generate questions or get suggestions using the AI endpoint.
- **Timer System** – Currently fixed at **30 seconds** (custom timers coming soon).
- **High Performance** – Redis for caching + fast lookup, Socket.io for realtime events.

---

## 🛠️ Tech Stack

- **Node.js / Express**
- **MongoDB + Mongoose**
- **Redis**
- **Socket.io (WebSockets)**
- **JWT Authentication**
- **AI Integration**

---

## 🔗 API Routes

### **Public Routes**
- /api/user → User signup/login

### **Protected Routes (Require Auth Token)**
- /api/question → Create & manage questions
- /api/talkToAI → AI-generated questions/suggestions
- /api/quiz → Create & manage quizzes
- /api/room → Create rooms, join rooms, manage realtime quiz flow
- /api/score → Save & fetch leaderboard scores

### Note
The routes listed under “Protected Routes” are intended to be JWT-verified, but authentication is not fully implemented yet. These endpoints will require proper JWT protection in a future update.

---

## 🎮 How It Works

1. Create questions  
2. Build quizzes using those questions  
3. Create a room for a selected quiz  
4. Share the room code — players join instantly  
5. Questions appear in real-time  
6. Leaderboard updates live as answers come in  

Powered by **Redis + WebSockets** for speed and reliability.

---

## 🔮 Future Enhancements

- Customizable timers per quiz/question  
- More analytics for hosts  
- Better UX for players  
- Admin dashboard  
- Rejoin / reconnect logic  

---

## 🤝 Suggestions Welcome

If you have cool ideas for future features or improvements, feel free to share!  
Always open to suggestions as this project grows. 🔥

---
