
let message: string = "Ce faci coiutz";

let encoder = new TextEncoder();
let data = encoder.encode(message);

Deno.writeFile("message.txt", data)
    .then(() => {
        console.log("Wrote the file");
    })
