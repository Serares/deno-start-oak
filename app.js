const http = require('http');

const server = http.createServer((req,res)=>{
    res.end("Hello Mo Fo");
})

server.listen(3000);
