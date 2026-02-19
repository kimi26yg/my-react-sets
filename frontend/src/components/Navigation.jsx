import React from "react";
import { NavLink, Link } from "react-router-dom";
import styles from "./Navigation.module.css";

function Navigation({ isDarkMode, toggleTheme }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.links}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/Counter">Counter</NavLink>
        <NavLink to="/TodoList">TodoList</NavLink>
        <NavLink to="/UpDown">UpDown</NavLink>
        <NavLink to="/FestivalList">FestivalList</NavLink>
      </div>
      <button
        className={styles.themeToggle}
        onClick={toggleTheme}
        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        <span className={styles.themeLabel}>
          {isDarkMode ? "DARK" : "LIGHT"}
        </span>
      </button>
    </nav>
  );
}

export default Navigation;
