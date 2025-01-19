"use strict";

const Todo = require("./Todo");
const { format } = require("date-fns");
const IDGenerator = require("./IDGenerator");

// Mock the IDGenerator
jest.mock("./IDGenerator", () => ({
  newTodoID: jest.fn(),
}));

describe("Todo", () => {
  beforeEach(() => {
    IDGenerator.newTodoID.mockClear();
  });

  test("should create a Todo with default values", () => {
    IDGenerator.newTodoID.mockReturnValue("test-id");
    const defaultDueDate = format(
      new Date().setDate(new Date().getDate() + 7),
      "MM-dd-yyyy",
    );

    const todo = new Todo({ name: "Test Todo" });

    expect(todo.id).toBe("test-id");
    expect(todo.name).toBe("Test Todo");
    expect(todo.description).toBe("");
    expect(todo.dueDate).toBe(defaultDueDate);
    expect(todo.completed).toBe(false);
  });

  test("should create a Todo with custom values", () => {
    IDGenerator.newTodoID.mockReturnValue("test-id-2");
    const customDueDate = format(new Date("2025-01-16"), "MM-dd-yyyy");
    const todo = new Todo({
      name: "Custom Todo",
      description: "A test description",
      dueDate: customDueDate,
    });

    expect(todo.id).toBe("test-id-2");
    expect(todo.name).toBe("Custom Todo");
    expect(todo.description).toBe("A test description");
    expect(todo.dueDate).toBe(customDueDate);
    expect(todo.completed).toBe(false);
  });

  test("should allow updating the name", () => {
    const todo = new Todo({ name: "Initial Name" });
    todo.name = "Updated Name";
    expect(todo.name).toBe("Updated Name");
  });

  test("should allow updating the description", () => {
    const todo = new Todo({ name: "Todo", description: "Initial Description" });
    todo.description = "Updated Description";
    expect(todo.description).toBe("Updated Description");
  });

  test("should allow updating the due date", () => {
    const todo = new Todo({ name: "Todo", dueDate: "01-01-2025" });
    todo.dueDate = "12-31-2025";
    expect(todo.dueDate).toBe("12-31-2025");
  });

  test("should toggle the completed status", () => {
    const todo = new Todo({ name: "Todo" });
    expect(todo.completed).toBe(false);

    todo.toggleCompleted();
    expect(todo.completed).toBe(true);

    todo.toggleCompleted();
    expect(todo.completed).toBe(false);
  });

  test("should throw an error if name is not provided", () => {
    expect(() => {
      new Todo({});
    }).toThrow("Todo name is required");
  });

  test("should not allow id to be changed", () => {
    const todo = new Todo({ name: "Immutable ID Test" });
    expect(() => {
      todo.id = "new-id";
    }).toThrow(TypeError);
  });
});
