import { Router } from 'express';

import { Todo } from '../models/todos';

const todos: Todo[] = [];

type RequestBody = { text: string, id: string };

const router = Router();

// Get all the todos
router.get('/', (req, res) => {
    res.status(200).json({ todos: todos });
});

// Add new todo
router.post('/todo', (req, res) => {
    const body = req.body as RequestBody;
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text,
    };

    todos.push(newTodo);
    res.status(200).json({message: 'Todo Added', todos: todos, newlyTodo: newTodo });
});

// Update the todo based upon id
router.put('/update-todo', (req, res) => {
    const body = req.body as RequestBody;
    const index = todos.findIndex((todo) => todo.id === body.id);
    if(index === -1){
        return res.status(404).json({ message: 'Item not found' });
    }
    todos[index].text = body.text;
    res.status(200).json({ message: 'Todo updated successfully', todos: todos });
});

// Delete todo based upon id
router.delete('/delete-todo', (req, res) => {
    const body = req.body as RequestBody;
    const updatedTodo = todos.filter((todo) => { 
        if(todo.id !== body.id){
            return todo;
    } 
});
    const deletedTodo = todos.find(todo => todo.id === body.id);
    if(!deletedTodo){
        return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({message: 'Todo deleted successfully', todos: updatedTodo, deletedTodos: deletedTodo});
})

export default router;