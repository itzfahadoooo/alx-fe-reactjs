import React, { useState } from 'react';

// TodoList Component
const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Master Testing', completed: false },
  ]);
  const [input, setInput] = useState('');

  // Add a new todo
  const addTodo = () => {
    if (input.trim() === '') return;
    
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    
    setTodos([...todos, newTodo]);
    setInput('');
  };

  // Toggle todo completion status
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Todo List</h1>
      
      <div style={styles.formContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a new todo..."
          style={styles.input}
          data-testid="todo-input"
        />
        <button 
          onClick={addTodo}
          style={styles.button}
          data-testid="add-button"
        >
          Add Todo
        </button>
      </div>
      
      <div style={styles.todosList}>
        {todos.length === 0 ? (
          <p style={styles.emptyMessage}>No todos yet. Add one to get started!</p>
        ) : (
          todos.map(todo => (
            <div key={todo.id} style={styles.todoItem}>
              <div style={styles.todoContent}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  style={styles.checkbox}
                  data-testid={`toggle-todo-${todo.id}`}
                />
                <span
                  style={{
                    ...styles.todoText,
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#999' : '#333',
                  }}
                  onClick={() => toggleTodo(todo.id)}
                  data-testid={`todo-text-${todo.id}`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={styles.deleteButton}
                data-testid={`delete-todo-${todo.id}`}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
      
      <div style={styles.stats}>
        <span>Total: {todos.length}</span>
        <span style={styles.statSeparator}>|</span>
        <span>Completed: {todos.filter(t => t.completed).length}</span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  formContainer: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  todosList: {
    marginBottom: '20px',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#999',
    padding: '20px',
    fontStyle: 'italic',
  },
  todoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    marginBottom: '8px',
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  todoContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: 1,
  },
  checkbox: {
    cursor: 'pointer',
    width: '18px',
    height: '18px',
  },
  todoText: {
    cursor: 'pointer',
    flex: 1,
    fontSize: '14px',
  },
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  stats: {
    textAlign: 'center',
    color: '#666',
    fontSize: '14px',
  },
  statSeparator: {
    margin: '0 10px',
  },
};

export default TodoList;