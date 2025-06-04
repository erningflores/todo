let todos = [];
let nextId = 1;

function addTodo(text){
    if(!text || text.trim() === ""){
        throw new Error("To-do text cannot be empty.");
    }
    const newTodo = {
        id: (nextId++).toString(),
        text: text.trim(),
        completed: false,
    };
    todos.push(newTodo);
    return newTodo;
}

function deleteTodo(id){
    const initialLength = todos.length;
    todos = todos.filter(todo => todo.id !== id);
    return todos.length < initialLength;
}

function getTodos(){
    return [...todos];
}

function clearAllTodos(){
    todos = [];
}

document.addEventListener("DOMContentLoaded", () => {
    const newTodoInput = document.getElementById("new-todo-input");
    const addTodoButton = document.getElementById("add-todo-button");
    const todoList = document.getElementById("todo-list");

    function renderTodos(){
        todoList.innerHTML = "";
        const currentTodos = getTodos();
        currentTodos.forEach(todo => {
            const listItem = document.createElement("li");
            listItem.setAttribute("data-id", todo.id);

            const todoTextSpan = document.createElement("span");
            todoTextSpan.classList.add("todo-text");
            todoTextSpan.textContent = todo.text;
            listItem.appendChild(todoTextSpan);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => {
                deleteTodo(todo.id);
                renderTodos();
                console.log(todos);
            });
            listItem.appendChild(deleteButton);

            todoList.appendChild(listItem);
        });
    }

    addTodoButton.addEventListener("click", () => {
        const todoText = newTodoInput.value.trim();
        if(todoText){
            addTodo(todoText);
            newTodoInput.value = "";
            renderTodos();
        }
    });

    renderTodos();
});

if(typeof module !== "undefined" && module.exports){
    module.exports = {
        addTodo,
        deleteTodo,
        getTodos,
        clearAllTodos,
    };
}