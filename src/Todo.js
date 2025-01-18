const { format } = require("date-fns");
const IDGenerator = require("./IDGenerator");

const Todo = (function () {
  function createTodo(
    name,
    description = "",
    dueDate = format(
      new Date().setDate(new Date().getDate() + 7),
      "MM-dd-yyyy",
    ),
  ) {
    let _id = IDGenerator.newTodoID();
    let _name = name;
    let _description = description;
    let _dueDate = dueDate;
    let _completed = false;

    const getID = () => _id;

    const getName = () => _name;
    const setName = (newName) => {
      _name = newName;
    };
    const getDescription = () => _description;
    const setDescription = (newDescription) => {
      _description = newDescription;
    };
    const getDueDate = () => _dueDate;
    const setDueDate = (newDueDate) => {
      _dueDate = newDueDate;
    };

    const getCompleted = () => _completed;
    const toggleCompleted = () => {
      _completed = !_completed;
    };

    return {
      getID,
      getName,
      setName,
      getDescription,
      setDescription,
      getDueDate,
      setDueDate,
      getCompleted,
      toggleCompleted,
    };
  }

  return { createTodo };
})();

module.exports = Todo;
