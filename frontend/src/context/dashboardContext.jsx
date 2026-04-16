import axios from "axios";
import { createContext, useContext, useState } from "react";

import Cookies from "js-cookie";
import { useEffect } from "react";

const dashboardContext = createContext(null);

export const DashboardProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("rooms");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [rooms, setRooms] = useState([]);

  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchQuestions = async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(`${apiUrl}/api/question`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuestions(response.data.questions);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchQuizzes = async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(`${apiUrl}/api/quiz`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuizzes(response.data.quizzes);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRooms = async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(`${apiUrl}/api/room`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRooms(response.data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuestions();
    fetchQuizzes();
    fetchRooms();
  }, []);

  return (
    <dashboardContext.Provider
      value={{
        activeTab,
        setActiveTab,
        sidebarOpen,
        setSidebarOpen,
        questions,
        setQuestions,
        quizzes,
        setQuizzes,
        rooms,
        setRooms,
        fetchRooms,
      }}
    >
      {children}
    </dashboardContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboard = () => useContext(dashboardContext);
