const Todo = require('./Todo');
const { format } = require('date-fns');
const IDGenerator = require('./IDGenerator');

// Mock the IDGenerator
jest.mock('./IDGenerator', () => ({
  newTodoID: jest.fn(),
}));

describe('Todo', () => {
  beforeEach(() => {
    IDGenerator.newTodoID.mockClear();
  });

  test('should create a Todo with default values', () => {
    IDGenerator.newTodoID.mockReturnValue('test-id');
    const defaultDueDate = format(
      new Date().setDate(new Date().getDate() + 7),
      'MM-dd-yyyy'
    );

    const todo = Todo.createTodo('Test Todo');

    expect(todo.getID()).toBe('test-id');
    expect(todo.getName()).toBe('Test Todo');
    expect(todo.getDescription()).toBe('');
    expect(todo.getDueDate()).toBe(defaultDueDate);
    expect(todo.getCompleted()).toBe(false);
  });

  test('should create a Todo with custom values', () => {
    IDGenerator.newTodoID.mockReturnValue('test-id-2');
    const customDueDate = format(new Date("2025-01-16"), 'MM-dd-yyyy');
    const todo = Todo.createTodo('Custom Todo', 'A test description', customDueDate);

    expect(todo.getID()).toBe('test-id-2');
    expect(todo.getName()).toBe('Custom Todo');
    expect(todo.getDescription()).toBe('A test description');
    expect(todo.getDueDate()).toBe(customDueDate);
    expect(todo.getCompleted()).toBe(false);
  });

  test('should allow updating the name', () => {
    const todo = Todo.createTodo('Initial Name');
    todo.setName('Updated Name');
    expect(todo.getName()).toBe('Updated Name');
  });

  test('should allow updating the description', () => {
    const todo = Todo.createTodo('Todo', 'Initial Description');
    todo.setDescription('Updated Description');
    expect(todo.getDescription()).toBe('Updated Description');
  });

  test('should allow updating the due date', () => {
    const todo = Todo.createTodo('Todo', '', '01-01-2025');
    todo.setDueDate('12-31-2025');
    expect(todo.getDueDate()).toBe('12-31-2025');
  });

  test('should toggle the completed status', () => {
    const todo = Todo.createTodo('Todo');
    expect(todo.getCompleted()).toBe(false);

    todo.toggleCompleted();
    expect(todo.getCompleted()).toBe(true);

    todo.toggleCompleted();
    expect(todo.getCompleted()).toBe(false);
  });
});
