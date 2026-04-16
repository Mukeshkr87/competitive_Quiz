# 🧠 QuizCraft-AI(competitive_Quiz)

A dynamic, real-time multiplayer quiz platform that combines the excitement of live competitions with AI-powered assistance. Built with modern web technologies, this app allows users to create custom quizzes, host rooms, and engage in interactive gameplay with instant leaderboards and real-time updates.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure signup and login with JWT tokens
- **Quiz Creation**: Intuitive forms to create and manage quizzes with multiple questions
- **Question Management**: Add, edit, and organize questions with various types (multiple choice, etc.)
- **Room Hosting**: Create private rooms with unique codes for multiplayer sessions
- **Real-Time Gameplay**: Live question streaming and synchronized answering using WebSockets
- **Live Leaderboard**: Real-time score updates and rankings during gameplay
- **Timer System**: Configurable timers for questions (currently 30 seconds default)

### AI Integration
- **AI-Powered Question Generation**: Use Google''s Generative AI to create questions automatically
- **Smart Suggestions**: Get AI recommendations for quiz topics and question improvements
- **Chatbot Assistance**: Interactive AI chatbox for help during quiz creation and gameplay

### Advanced Features
- **Responsive Design**: Mobile-friendly interface built with React and Tailwind CSS
- **High Performance**: Redis caching for fast data retrieval and Socket.io for real-time communication
- **Data Persistence**: MongoDB for storing users, quizzes, questions, and scores
- **Secure API**: Protected routes with authentication middleware
- **Modern UI Components**: Custom components using Radix UI and shadcn/ui for a polished experience

### User Experience
- **Dashboard**: Centralized hub for managing quizzes, rooms, and settings
- **Host Controls**: Full control over quiz flow for room hosts
- **Participant Lobby**: Easy joining with room codes
- **Settings Management**: Customize user preferences and app settings

## 🛠️ Tech Stack

### Frontend
- **React 19**: Modern React with hooks and concurrent features
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Radix UI**: Accessible UI primitives
- **Socket.io Client**: Real-time communication
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **Framer Motion**: Smooth animations and transitions

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for API development
- **MongoDB + Mongoose**: NoSQL database and ODM
- **Redis**: In-memory data structure store for caching
- **Socket.io**: Real-time bidirectional communication
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing
- **Google Generative AI**: AI-powered features

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **MongoDB** (local installation or cloud service like MongoDB Atlas)
- **Redis** (local installation or cloud service like Redis Cloud)
- **Git** (for cloning the repository)

## 🔧 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mukeshkr87/competitive_Quiz.git
   cd competitive_Quiz
   ```

2. **Set up the backend:**
   ```bash
   cd server
   npm install
   ```

3. **Set up the frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

## ⚙️ Setup

### Environment Configuration

1. **Backend Environment Variables:**
   Create a `.env` file in the `server` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/quizapp
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=your_jwt_secret_key
   GOOGLE_AI_API_KEY=your_google_ai_api_key
   ```

   - Replace `your_jwt_secret_key` with a strong secret key
   - Get your Google AI API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Adjust MongoDB and Redis URLs if using cloud services

2. **Frontend Environment Variables:**
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

### Database Setup

1. **Start MongoDB:**
   If running locally:
   ```bash
   mongod
   ```

2. **Start Redis:**
   If running locally:
   ```bash
   redis-server
   ```

## 🚀 Running the Application

1. **Start the backend server:**
   ```bash
   cd server
   npm start
   ```
   The server will run on `http://localhost:5000`

2. **Start the frontend development server:**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (default Vite port)

3. **Access the application:**
   Open your browser and navigate to `http://localhost:5173`

## 📡 API Endpoints

### Authentication
- `POST /api/user/signup` - User registration
- `POST /api/user/login` - User login

### Questions
- `GET /api/question` - Get all questions
- `POST /api/question` - Create a new question
- `PUT /api/question/:id` - Update a question
- `DELETE /api/question/:id` - Delete a question

### Quizzes
- `GET /api/quiz` - Get all quizzes
- `POST /api/quiz` - Create a new quiz
- `PUT /api/quiz/:id` - Update a quiz
- `DELETE /api/quiz/:id` - Delete a quiz

### Rooms
- `GET /api/room` - Get all rooms
- `POST /api/room` - Create a new room
- `POST /api/room/join` - Join a room
- `GET /api/room/:id` - Get room details

### Scores
- `GET /api/score` - Get leaderboard scores
- `POST /api/score` - Save a score

### AI Integration
- `POST /api/talkToAI` - Generate questions or get AI suggestions

*Note: Most endpoints require authentication via JWT token in the Authorization header.*

## 🎮 Usage

1. **Sign Up/Login**: Create an account or log in to access the dashboard
2. **Create Questions**: Use the question creation form with AI assistance
3. **Build Quizzes**: Select questions and organize them into quizzes
4. **Host a Room**: Create a room for your quiz and share the code
5. **Join a Game**: Enter a room code to participate as a player
6. **Play**: Answer questions in real-time and watch the leaderboard update
7. **Review Results**: Check final scores and rankings after the quiz

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m ''Add amazing feature''`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write clear, concise commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ by Mukesh Kumar
- Thanks to the open-source community for the amazing tools and libraries
- Special thanks to Google for the Generative AI API

## 🔮 Future Roadmap

- [ ] Customizable question timers
- [ ] Advanced analytics and reporting
- [ ] Mobile app versions
- [ ] Multi-language support
- [ ] Integration with external quiz platforms
- [ ] Advanced AI features (difficulty assessment, personalized quizzes)

---

Have fun quizzing! 🎉
