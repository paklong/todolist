const { format } = require("date-fns");
const IDGenerator = require("./IDGenerator");

class Todo {
  constructor(
    name,
    description = "",
    dueDate = format(
      new Date().setDate(new Date().getDate() + 7),
      "MM-dd-yyyy",
    ),
  ) {
    this.id = IDGenerator.newTodoID();
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
