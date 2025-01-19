"use strict";

const { format } = require("date-fns");
const IDGenerator = require("./IDGenerator");

class Todo {
  constructor({
    name,
    description = "",
    dueDate = format(
      new Date().setDate(new Date().getDate() + 7),
      "MM-dd-yyyy",
    ),
  }) {
    if (!name) {
      throw new Error("Todo name is required");
    }

    Object.defineProperty(this, "id", {
      value: IDGenerator.newTodoID(),
      writable: false,
      enumerable: true,
    });

    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.completed = false;
  }

  toggleCompleted() {
    this.completed = !this.completed;
    return this.completed;
  }
}

module.exports = Todo;
