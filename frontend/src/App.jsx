import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navigation from "./components/Navigation";

const Home = lazy(() => import("./components/Home"));
const Counter = lazy(() => import("./components/Counter"));
const TodoList = lazy(() => import("./components/TodoList"));
const UpDown = lazy(() => import("./components/UpDown"));
const NotFound = lazy(() => import("./components/NotFound"));
const FestivalList = lazy(() => import("./components/FestivalList"));
import UserInfoModal from "./components/UserInfoModal";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Apply theme class to body for global background color control
    document.body.className = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  useEffect(() => {
    const savedInfo = localStorage.getItem("user_info");
    if (savedInfo) {
      setUserInfo(JSON.parse(savedInfo));
    } else {
      setIsModalOpen(true);
    }
  }, []);

  const handleUserSubmit = (formData) => {
    localStorage.setItem("user_info", JSON.stringify(formData));
    setUserInfo(formData);
    setIsModalOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div>
      <Navigation isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Suspense fallback={<div>로딩 중...</div>}>
        <Routes>
          <Route path="/" element={<Home userInfo={userInfo} />} />
          <Route
            path="/TodoList"
            element={<TodoList isDarkMode={isDarkMode} userInfo={userInfo} />}
          />
          <Route path="/Counter" element={<Counter />} />
          <Route path="/UpDown" element={<UpDown userInfo={userInfo} />} />
          <Route
            path="/FestivalList"
            element={<FestivalList userInfo={userInfo} />}
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <UserInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUserSubmit}
      />
      <button
        className="fab-button"
        onClick={() => setIsModalOpen(true)}
        aria-label="Edit User Info"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </button>
    </div>
  );
}

export default App;
