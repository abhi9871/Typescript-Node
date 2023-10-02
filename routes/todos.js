"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos = [];
const router = (0, express_1.Router)();
// Get all the todos
router.get('/', (req, res) => {
    res.status(200).json({ todos: todos });
});
// Add new todo
router.post('/todo', (req, res) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text,
    };
    todos.push(newTodo);
    res.status(200).json({ message: 'Todo Added', todos: todos, newlyTodo: newTodo });
});
// Update the todo based upon id
router.put('/update-todo', (req, res) => {
    const index = todos.findIndex((todo) => todo.id === req.body.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }
    todos[index].text = req.body.text;
    res.status(200).json({ message: 'Todo updated successfully', todos: todos });
});
// Delete todo based upon id
router.delete('/delete-todo', (req, res) => {
    const updatedTodo = todos.filter((todo) => {
        if (todo.id !== req.body.id) {
            return todo;
        }
    });
    console.log(updatedTodo);
    const deletedTodo = todos.find(todo => todo.id === req.body.id);
    console.log(deletedTodo);
    if (!deletedTodo) {
        return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Todo deleted successfully', todos: updatedTodo, deletedTodos: deletedTodo });
});
exports.default = router;
