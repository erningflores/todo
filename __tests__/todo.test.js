let addTodo;
let deleteTodo;
let getTodos;
let clearAllTodos;

describe("To-do list core logic", () => {
    beforeEach(() => {
        jest.resetModules();
        ({ addTodo, deleteTodo, getTodos, clearAllTodos } = require("../js/script"));
        clearAllTodos();
    });

    test("should add a new to-do item", () => {
        const newTodo = addTodo("Learn Jest Testing");
        expect(newTodo).toBeDefined();
        expect(newTodo.text).toBe("Learn Jest Testing");
        expect(newTodo.completed).toBe(false);
        expect(getTodos()).toHaveLength(1);
    });

    test("should not add an empty to-do item", () => {
        expect(() => addTodo("").toThrow("To-do text cannot be empty."));
        expect(() => addTodo("  ").toThrow("To-do text cannot be empty."));
        expect(getTodos()).toHaveLength(0);
    });

    test("should delete a to-do item by id", () => {
        const todo1 = addTodo("First Task");
        const todo2 = addTodo("Second Task");

        console.log("Debugging IDs:");
        console.log("todo1.id:", todo1.id);
        console.log("todo2.id:", todo2.id);
        console.log("Are IDs the same?", todo1.id === todo2.id); 

        deleteTodo(todo1.id);
        const currentTodos = getTodos();
       
        expect(currentTodos).toHaveLength(1);
        expect(currentTodos[0].text).toBe("Second Task");
        expect(currentTodos.some(todo => todo.id === todo1.id)).toBe(false);
    });

    test("should return false if trying to delete a non-existent to-do", () => {
        addTodo("Task 1")
        const deleted = deleteTodo("nonExistentId");
        expect(deleted).toBe(false);
        expect(getTodos()).toHaveLength(1);
    });

    test("should return all current to-do items", () => {
        addTodo("Buy groceries");
        addTodo("Pay bills");
        const todos = getTodos();
        expect(todos).toHaveLength(2);
        expect(todos[0].text).toBe("Buy groceries");
        expect(todos[1].text).toBe("Pay bills");
    });

    test("should clear all to-do items", () => {
        addTodo("Item A");
        addTodo("Item B");
        expect(getTodos()).toHaveLength(2);
        clearAllTodos()
        expect(getTodos()).toHaveLength(0);
    });
});