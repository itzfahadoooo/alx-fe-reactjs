/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  
  // Test 1: Initial Render
  describe('Initial Render', () => {
    test('should render the TodoList component', () => {
      render(<TodoList />);
      expect(screen.getByText('My Todo List')).toBeInTheDocument();
    });

    test('should render initial todos', () => {
      render(<TodoList />);
      expect(screen.getByText('Learn React')).toBeInTheDocument();
      expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
      expect(screen.getByText('Master Testing')).toBeInTheDocument();
    });

    test('should render the add todo input field', () => {
      render(<TodoList />);
      expect(screen.getByTestId('todo-input')).toBeInTheDocument();
    });

    test('should render the add button', () => {
      render(<TodoList />);
      expect(screen.getByTestId('add-button')).toBeInTheDocument();
    });

    test('should display initial stats', () => {
      render(<TodoList />);
      expect(screen.getByText(/Total: 3/)).toBeInTheDocument();
      expect(screen.getByText(/Completed: 0/)).toBeInTheDocument();
    });
  });

  // Test 2: Adding Todos
  describe('Adding Todos', () => {
    test('should add a new todo when button is clicked', () => {
      render(<TodoList />);
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-button');

      fireEvent.change(input, { target: { value: 'Buy groceries' } });
      fireEvent.click(addButton);

      expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    });

    test('should add a new todo when Enter key is pressed', () => {
      render(<TodoList />);
      const input = screen.getByTestId('todo-input');

      fireEvent.change(input, { target: { value: 'Go to gym' } });
      fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

      expect(screen.getByText('Go to gym')).toBeInTheDocument();
    });

    test('should clear the input field after adding a todo', () => {
      render(<TodoList />);
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-button');

      fireEvent.change(input, { target: { value: 'New task' } });
      fireEvent.click(addButton);

      expect(input.value).toBe('');
    });

    test('should not add an empty todo', () => {
      render(<TodoList />);
      const addButton = screen.getByTestId('add-button');
      const initialTodoCount = screen.getAllByTestId(/todo-text-/).length;

      fireEvent.click(addButton);

      expect(screen.getAllByTestId(/todo-text-/).length).toBe(initialTodoCount);
    });

    test('should not add a todo with only whitespace', () => {
      render(<TodoList />);
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-button');
      const initialTodoCount = screen.getAllByTestId(/todo-text-/).length;

      fireEvent.change(input, { target: { value: '   ' } });
      fireEvent.click(addButton);

      expect(screen.getAllByTestId(/todo-text-/).length).toBe(initialTodoCount);
    });

    test('should update the total count after adding a todo', () => {
      render(<TodoList />);
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-button');

      fireEvent.change(input, { target: { value: 'New todo' } });
      fireEvent.click(addButton);

      expect(screen.getByText(/Total: 4/)).toBeInTheDocument();
    });
  });

  // Test 3: Toggling Todos
  describe('Toggling Todos', () => {
    test('should toggle a todo by clicking the checkbox', () => {
      render(<TodoList />);
      const checkbox = screen.getByTestId('toggle-todo-1');

      expect(checkbox.checked).toBe(false);
      fireEvent.click(checkbox);
      expect(checkbox.checked).toBe(true);
      fireEvent.click(checkbox);
      expect(checkbox.checked).toBe(false);
    });

    test('should toggle a todo by clicking the text', () => {
      render(<TodoList />);
      const todoText = screen.getByTestId('todo-text-1');
      const checkbox = screen.getByTestId('toggle-todo-1');

      expect(checkbox.checked).toBe(false);
      fireEvent.click(todoText);
      expect(checkbox.checked).toBe(true);
    });

    test('should apply strikethrough style when todo is completed', () => {
      render(<TodoList />);
      const todoText = screen.getByTestId('todo-text-1');
      const checkbox = screen.getByTestId('toggle-todo-1');

      fireEvent.click(checkbox);

      expect(todoText).toHaveStyle('text-decoration: line-through');
    });

    test('should update completed count when todo is toggled', () => {
      render(<TodoList />);
      const checkbox = screen.getByTestId('toggle-todo-1');

      expect(screen.getByText(/Completed: 0/)).toBeInTheDocument();
      fireEvent.click(checkbox);
      expect(screen.getByText(/Completed: 1/)).toBeInTheDocument();
      fireEvent.click(checkbox);
      expect(screen.getByText(/Completed: 0/)).toBeInTheDocument();
    });

    test('should toggle multiple todos independently', () => {
      render(<TodoList />);
      const checkbox1 = screen.getByTestId('toggle-todo-1');
      const checkbox2 = screen.getByTestId('toggle-todo-2');

      fireEvent.click(checkbox1);
      fireEvent.click(checkbox2);

      expect(checkbox1.checked).toBe(true);
      expect(checkbox2.checked).toBe(true);
      expect(screen.getByText(/Completed: 2/)).toBeInTheDocument();
    });
  });

  // Test 4: Deleting Todos
  describe('Deleting Todos', () => {
    test('should delete a todo when delete button is clicked', () => {
      render(<TodoList />);
      const deleteButton = screen.getByTestId('delete-todo-1');

      fireEvent.click(deleteButton);

      expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    });

    test('should update total count after deleting a todo', () => {
      render(<TodoList />);
      const deleteButton = screen.getByTestId('delete-todo-1');

      expect(screen.getByText(/Total: 3/)).toBeInTheDocument();
      fireEvent.click(deleteButton);
      expect(screen.getByText(/Total: 2/)).toBeInTheDocument();
    });

    test('should delete the correct todo when multiple exist', () => {
      render(<TodoList />);
      const deleteButton2 = screen.getByTestId('delete-todo-2');

      fireEvent.click(deleteButton2);

      expect(screen.getByText('Learn React')).toBeInTheDocument();
      expect(screen.queryByText('Build a Todo App')).not.toBeInTheDocument();
      expect(screen.getByText('Master Testing')).toBeInTheDocument();
    });

    test('should show empty message when all todos are deleted', () => {
      render(<TodoList />);
      const deleteButtons = screen.getAllByTestId(/delete-todo-/);

      deleteButtons.forEach(button => fireEvent.click(button));

      expect(screen.getByText('No todos yet. Add one to get started!')).toBeInTheDocument();
    });

    test('should not affect completed status when deleting a todo', () => {
      render(<TodoList />);
      const checkbox1 = screen.getByTestId('toggle-todo-1');
      const deleteButton2 = screen.getByTestId('delete-todo-2');

      fireEvent.click(checkbox1);
      fireEvent.click(deleteButton2);

      expect(screen.getByText(/Completed: 1/)).toBeInTheDocument();
      expect(screen.getByText('Learn React')).toBeInTheDocument();
    });
  });

  // Test 5: Integration Tests
  describe('Integration Tests', () => {
    test('should handle add, toggle, and delete operations in sequence', () => {
      render(<TodoList />);
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-button');

      // Add a todo
      fireEvent.change(input, { target: { value: 'Integration test' } });
      fireEvent.click(addButton);
      expect(screen.getByText('Integration test')).toBeInTheDocument();

      // Toggle the new todo
      const newTodoCheckbox = screen.getByTestId(/toggle-todo-\d+/);
      fireEvent.click(newTodoCheckbox);
      expect(newTodoCheckbox.checked).toBe(true);

      // Delete an old todo
      const deleteButton = screen.getByTestId('delete-todo-1');
      fireEvent.click(deleteButton);
      expect(screen.queryByText('Learn React')).not.toBeInTheDocument();

      // Verify final state
      expect(screen.getByText(/Total: 3/)).toBeInTheDocument();
      expect(screen.getByText(/Completed: 1/)).toBeInTheDocument();
    });

    test('should maintain state across multiple operations', () => {
      render(<TodoList />);
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-button');

      // Add multiple todos
      fireEvent.change(input, { target: { value: 'Task 1' } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: 'Task 2' } });
      fireEvent.click(addButton);

      // Toggle first two original todos
      fireEvent.click(screen.getByTestId('toggle-todo-1'));
      fireEvent.click(screen.getByTestId('toggle-todo-2'));

      expect(screen.getByText(/Total: 5/)).toBeInTheDocument();
      expect(screen.getByText(/Completed: 2/)).toBeInTheDocument();
    });
  });
});