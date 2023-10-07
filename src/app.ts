import express from 'express';
import bodyParser from 'body-parser';

import todosRoutes from './routes/todos';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(todosRoutes);

console.log('Server is running...');
app.listen(3000);