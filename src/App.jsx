import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";
// Импортируем PNG как переменную
"import myIcon from 'C:\Users\Alya\Desktop\todo-app\src\assets\icons\winxclub.png'"

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  // загрузка из localStorage
  useEffect(() => {
  const saved = localStorage.getItem("todos");

  if (saved) {
    setTodos(JSON.parse(saved));
  }
}, []);

  // сохранение
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!text.trim()) return;

    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };

    setTodos((prev) => [newTodo, ...prev]);
    setText("");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => 
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const editTodo = (id, newText) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, text: newText } : t
      )
    );
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
      <h1>To-Do List</h1>

      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <Filter setFilter={setFilter} />

      <TodoList
        todos={filteredTodos}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
        editTodo={editTodo}
      />
    </div>
  );
}

export default App;