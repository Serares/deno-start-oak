import { Application } from "https://deno.land/x/oak/mod.ts";

import todosRoutes from './routes/todos.ts';

const app = new Application();

app.use(async (ctx, next) => {
  console.log('Middleware!');
  // you have to use next function if you want to run middleware
  // you send a response too early if you don't use async await
  await next();
});

// you have to use both methods to register routes in deno
app.use(todosRoutes.routes());
app.use(todosRoutes.allowedMethods());

await app.listen({ port: 3000 });