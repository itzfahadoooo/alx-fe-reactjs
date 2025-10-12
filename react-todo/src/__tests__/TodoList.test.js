/* eslint-env jest */
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";


test("renders initial todos", () => {
  render(<TodoList />);
  expect(screen.getByText("Learn React")).toBeInTheDocument();
  expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
});

test("adds a new todo", () => {
  render(<TodoList />);
  const input = screen.getByTestId("todo-input");
  const button = screen.getByTestId("add-btn");
  fireEvent.change(input, { target: { value: "Test new todo" } });
  fireEvent.click(button);
  expect(screen.getByText("Test new todo")).toBeInTheDocument();
});

test("toggles todo completion", () => {
  render(<TodoList />);
  const todo = screen.getByText("Learn React");
  fireEvent.click(todo);
  expect(todo).toHaveStyle("text-decoration: line-through");
});

test("deletes a todo", () => {
  render(<TodoList />);
  const todo = screen.getByText("Learn React");
  const deleteButton = screen.getByTestId(/delete-/i);
  fireEvent.click(deleteButton);
  expect(todo).not.toBeInTheDocument();
});
