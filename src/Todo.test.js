const Todo = require("./Todo.js");

describe("Todo factory tests", () => {
  test("Correctly create todo", () => {
    const todo1 = Todo.createTodo("todoTest1");
    expect(todo1.getName()).toBe("todoTest1");
  }),
    test("Correctly update name", () => {
      const todo2 = Todo.createTodo("todoTest2");
      todo2.setName("todoTest2NewName");
      expect(todo2.getName()).toBe("todoTest2NewName");
    });
});
