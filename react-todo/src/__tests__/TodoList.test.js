/* eslint-env jest */
import React from "react";
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
  const addBtn = screen.getByTestId("add-btn");

  fireEvent.change(input, { target: { value: "Test new todo" } });
  fireEvent.click(addBtn);

  expect(screen.getByText("Test new todo")).toBeInTheDocument();
});

test("toggles todo completion", () => {
  render(<TodoList />);
  const todoItem = screen.getByText("Learn React");

  // toggle on
  fireEvent.click(todoItem);
  expect(todoItem).toHaveStyle("text-decoration: line-through");

  // toggle off
  fireEvent.click(todoItem);
  // sometimes style can be "none" or "", safer check:
  // expect(todoItem).toHaveStyle("text-decoration: none");
  expect(todoItem).toHaveStyle("text-decoration: none");
});

test("deletes a todo", () => {
  render(<TodoList />);
  const todoText = "Learn React";
  // delete button matches ID 1 (we initialized with id 1)
  const deleteBtn = screen.getByTestId("delete-btn-1");

  fireEvent.click(deleteBtn);

  expect(screen.queryByText(todoText)).not.toBeInTheDocument();
});
