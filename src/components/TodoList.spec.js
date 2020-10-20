import React from "react";
import { render, fireEvent, screen, getByText } from "@testing-library/react";
import ToDoList from "./TodoList";

describe("Todo List", () => {
  it("render prefilled todo items", () => {
    const { getAllByTestId } = render(<ToDoList />);
    const items = getAllByTestId("todo-item");
    expect(items).toHaveLength(2);
  });

  it("complete item", () => {
    const { getAllByTestId } = render(<ToDoList />);
    const items = getAllByTestId("todo-item");
    expect(
      items[0].firstElementChild.classList.contains("todo-completed")
    ).toBe(false);
    fireEvent.click(items[0].firstElementChild);
    expect(
      items[0].firstElementChild.classList.contains("todo-completed")
    ).toBe(true);
  });
  it("delete item", () => {
    const { getAllByTestId } = render(<ToDoList />);
    const items = getAllByTestId("todo-item");
    expect(items).toHaveLength(2);
    fireEvent.click(items[0].lastChild);
    expect(getAllByTestId("todo-item")).toHaveLength(1);
  });
  it("input box should change with the values", () => {
    const { getByTestId } = render(<ToDoList />);
    const input = getByTestId("input-box");
    expect(input.value).toBe("");
    fireEvent.change(input, { target: { value: "Subscribe" } });
    expect(input.value).toBe("Subscribe");
  });
  it("should add new item on press add button", () => {
    const { getByTestId, getAllByTestId, getByText } = render(<ToDoList />);
    const input = getByTestId("input-box");
    expect(input.value).toBe("");
    fireEvent.change(input, { target: { value: "Subscribe" } });
    expect(input.value).toBe("Subscribe");
    const submitBtn = getByTestId("submit-btn");
    fireEvent.click(submitBtn);
    expect(getByText("Subscribe")).toBeInTheDocument();
  });
  it("should add new item on Enter", () => {
    const { getByTestId, getAllByTestId, getByText } = render(<ToDoList />);
    const input = getByTestId("input-box");
    expect(input.value).toBe("");
    fireEvent.change(input, { target: { value: "Subscribe" } });
    fireEvent.submit(input);
    expect(getByText("Subscribe")).toBeInTheDocument();
  });
});
