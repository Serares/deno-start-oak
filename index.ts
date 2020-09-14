
import { serve } from "https://deno.land/std/http/server.ts";


// it's an async iterable
// like an array of promises
const server = serve({
    port: 3000
})

for await (const req of server) {
    req.respond({ body: "Hello Mo fo\n" });
}

