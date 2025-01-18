const { format } = require("date-fns");

const Todo = (function () {
  function createTodo(name) {
    let toDoName = name;
    
    const getName = () => toDoName;
    const setName = (newName) => {
      toDoName = newName;
    };

    return { getName, setName };
  }

  return { createTodo };
})();

module.exports = Todo;
