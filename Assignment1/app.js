const http = require('http')

const server = http.createServer((req,res)=>{
    res.write("HELLO BHAI");
    
});

server.listen(3000, 'localhost', () => {
    console.log("server running at localhost:3000")
})
