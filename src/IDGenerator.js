"use strict";

const IDGenerator = (() => {
  let projectID = 1;
  let todoID = 1;
  const newProjectID = () => projectID++;
  const newTodoID = () => todoID++;
  return {
    newProjectID,
    newTodoID,
  };
})();

module.exports = IDGenerator;
