"use strict";

const IDGenerator = require("./IDGenerator");

class Project {
  constructor({ name, todo = [] }) {
    if (!name) {
      throw new Error("Project name is required");
    }

    Object.defineProperty(this, "id", {
      value: IDGenerator.newProjectID(),
      writable: false,
      enumerable: true,
    });

    this.name = name;
    this.todo = todo;
  }

  addTodo(todo) {
    this.todo.push(todo);
  }

  removeTodo(todoID) {
    this.todo = this.todo.filter((todo) => todo.id != todoID);
  }
}

module.exports = Project;
