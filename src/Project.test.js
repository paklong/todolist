"use strict";

const Project = require('./Project');
const IDGenerator = require('./IDGenerator');

// Mock the IDGenerator
jest.mock('./IDGenerator', () => ({
  newProjectID: jest.fn(),
}));

describe('Project Class', () => {
  beforeEach(() => {
    IDGenerator.newProjectID.mockClear();
  });

  test('should create a Project with default values', () => {
    IDGenerator.newProjectID.mockReturnValue('project-id-1');

    const project = new Project({ name: 'Test Project' });

    expect(project.id).toBe('project-id-1');
    expect(project.name).toBe('Test Project');
    expect(project.todo).toEqual([]); // Default empty todo list
  });

  test('should throw an error if name is not provided', () => {
    expect(() => {
      new Project({});
    }).toThrow('Project name is required');
  });

  test('should ensure id is enumerable', () => {
    IDGenerator.newProjectID.mockReturnValue('project-id-2');
    const project = new Project({ name: 'Enumerable Test' });

    const keys = Object.keys(project);
    expect(keys).toContain('id');
    expect(project.propertyIsEnumerable('id')).toBe(true);
  });

  test('should add a todo to the project', () => {
    const project = new Project({ name: 'Add Todo Test' });
    const todo = { id: 'todo-1', name: 'Test Todo' };

    project.addTodo(todo);

    expect(project.todo).toHaveLength(1);
    expect(project.todo[0]).toEqual(todo);
  });

  test('should remove a todo from the project by id', () => {
    const project = new Project({ name: 'Remove Todo Test' });
    const todo1 = { id: 'todo-1', name: 'Todo 1' };
    const todo2 = { id: 'todo-2', name: 'Todo 2' };

    project.addTodo(todo1);
    project.addTodo(todo2);

    project.removeTodo('todo-1');

    expect(project.todo).toHaveLength(1);
    expect(project.todo[0]).toEqual(todo2);
  });

  test('should not remove a todo if id does not match', () => {
    const project = new Project({ name: 'No Match Test' });
    const todo = { id: 'todo-1', name: 'Test Todo' };

    project.addTodo(todo);

    project.removeTodo('non-existent-id');

    expect(project.todo).toHaveLength(1);
    expect(project.todo[0]).toEqual(todo);
  });
});
