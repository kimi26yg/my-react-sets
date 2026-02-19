import styles from "./TodoList.module.css";
import { useEffect, useState } from "react";

const todoList = [
  { id: 1, task: "첫번째할일", isDone: false },
  { id: 2, task: "두번째할일", isDone: true },
  { id: 3, task: "세번째할일", isDone: false },
  { id: 4, task: "네번째할일", isDone: false },
  { id: 5, task: "다섯번째할일", isDone: false },
];

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={todo.isDone ? styles.completed : ""}>
      <input
        type="checkbox"
        checked={todo.isDone}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.task}</span>
      <button className={styles.deleteBtn} onClick={() => onDelete(todo.id)}>
        ✖
      </button>
    </li>
  );
}

function TodoList({ isDarkMode }) {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [todoValue, setTodoValue] = useState("");
  const [filter, setFilter] = useState("all"); // all, active, completed

  // 남은 할 일 개수 계산
  const remainingCount = todos.filter((todo) => !todo.isDone).length;
  const [name, setName] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const savedInfo = localStorage.getItem("user_info");
    if (savedInfo) {
      const parsedInfo = JSON.parse(savedInfo);
      setName(parsedInfo.name);
    }
  }, []);
  // 필터링된 할 일 목록
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.isDone;
    if (filter === "completed") return todo.isDone;
    return true; // all
  });

  function isDoneToggle(id) {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
    );
    setTodos(newTodos);
  }

  function deleteTodo(id) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  function addTodo() {
    if (!todoValue.trim()) return;
    const newTodo = {
      id: Date.now(),
      task: todoValue,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
    setTodoValue("");
  }

  // 전체 삭제
  function deleteAllTodos() {
    setTodos([]);
  }

  // 완료된 항목 일괄 삭제
  function deleteCompletedTodos() {
    const newTodos = todos.filter((todo) => !todo.isDone);
    setTodos(newTodos);
  }

  // 현재 날짜 포맷
  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className={`${styles.container} ${isDarkMode ? styles.dark : styles.light}`}
    >
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <h1>{today}</h1>
          <div className={styles.headerRight}>
            <div className={styles.remainingCount}>
              <span className={styles.count}>{remainingCount}</span>
              <span className={styles.label}>tasks left</span>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.inputBox}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={todoValue}
          onChange={(e) => setTodoValue(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              addTodo();
            }
          }}
        />
        <button className={styles.addBtn} onClick={addTodo}>
          +
        </button>
      </div>

      <div className={styles.controls}>
        <div className={styles.filterControls}>
          <button
            className={`${styles.filterDot} ${filter === "all" ? styles.active : ""}`}
            onClick={() => setFilter("all")}
            title="All"
          >
            <span className={styles.dot}></span>
          </button>
          <button
            className={`${styles.filterDot} ${filter === "active" ? styles.active : ""}`}
            onClick={() => setFilter("active")}
            title="Active"
          >
            <span className={styles.dot}></span>
          </button>
          <button
            className={`${styles.filterDot} ${filter === "completed" ? styles.active : ""}`}
            onClick={() => setFilter("completed")}
            title="Completed"
          >
            <span className={styles.dot}></span>
          </button>
        </div>

        <div className={styles.actionButtons}>
          <button className={styles.actionBtn} onClick={deleteCompletedTodos}>
            Clear Completed
          </button>
          <button
            className={`${styles.actionBtn} ${styles.danger}`}
            onClick={deleteAllTodos}
          >
            Clear All
          </button>
        </div>
      </div>

      {filteredTodos.length === 0 ? (
        <div className={styles.emptyState}>
          <p>
            {name ? `${name}님, 할 일이 없네요!` : "할 일이 없습니다."} <br />
            커피 한 잔 어떠세요? ☕️
          </p>
        </div>
      ) : (
        <ul className={styles.todoList}>
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={isDoneToggle}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
