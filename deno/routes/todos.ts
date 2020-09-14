import { HttpError, Router } from 'https://deno.land/x/oak/mod.ts';

const router = new Router();

interface Todo {
  id: string;
  text: string;
}

let todos: Todo[] = [];

router.get('/todos', (ctx) => {
  // if you set the body to an object
  // it will be automatically parsed to json
  ctx.response.body = { todos: todos };
});

router.post('/todos', async (ctx) => {
  // have to do all this checking because TS has compile errors for undeffined values
  if (!ctx.request.hasBody) {
    throw new HttpError("Body not found");
  }

  // we get our data in here because body() returns a promise
  // Oak does it for us
  const data = ctx.request.body();
  const result = await data.value;

  const newTodo: Todo = {
    id: new Date().toISOString(),
    // use the ! coerce operator to throw away the errors of undefined
    text: result.text,
  };

  todos.push(newTodo);
  // response
  ctx.response.body = { message: 'Created todo!', todo: newTodo };
});

router.put('/todos/:todoId', async (ctx) => {
  const tid = ctx.params.todoId;
  const data = ctx.request.body();
  const result = await data.value;
  const todoIndex = todos.findIndex((todo) => {
    return todo.id === tid;
  });
  todos[todoIndex] = { id: todos[todoIndex].id, text: result.text };
  ctx.response.body = { message: 'Updated todo' };
});

router.delete('/todos/:todoId', (ctx) => {
  const tid = ctx.params.todoId;
  todos = todos.filter((todo) => todo.id !== tid);
  ctx.response.body = { message: 'Deleted todo' };
});

export default router;
