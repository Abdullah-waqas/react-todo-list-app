import React from "react";
import { render, fireEvent, screen, getByText } from "@testing-library/react";
import AddTaskForm from "./AddTaskForm";

describe("Add task form", () => {
  it("render prefilled todo items", () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(<AddTaskForm addTask={handleSubmit} />);
    const input = getByTestId("input-box");

    expect(input.value).toBe("");
    fireEvent.change(input, { target: { value: "Subscribe" } });
    // Should set the input values
    expect(input.value).toBe("Subscribe");
    const submitBtn = getByTestId("submit-btn");
    fireEvent.click(submitBtn);
    // Submit button should be called
    expect(handleSubmit).toHaveBeenCalled();
    expect(input.value).toBe("");
  });
});
