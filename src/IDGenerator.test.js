const IDGenerator = require("./IDGenerator");

describe("ID Generator tests", () => {
  test("should increment project ID correctly", () => {
    expect(IDGenerator.newProjectID()).toBe(1);
    expect(IDGenerator.newProjectID()).toBe(2);
  });

  test("should increment project ID correctly", () => {
    expect(IDGenerator.newTodoID()).toBe(1);
    expect(IDGenerator.newTodoID()).toBe(2);
  });
  test("project ID and todo ID should not interfere with each other", () => {
    const projectID = IDGenerator.newProjectID();
    const todoID = IDGenerator.newTodoID();
    expect(projectID).toBe(3);
    expect(todoID).toBe(3);
  });
});
