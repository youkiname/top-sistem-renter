const jsonServer = require("json-server");

const server = jsonServer.create();
const bodyParser = jsonServer.bodyParser;
const jsonServerMiddleware = jsonServer.defaults();

const PORT = 8000;
const DELAY = 1000;

server.use(bodyParser);
server.use(jsonServerMiddleware);

server.listen(PORT, () =>{
    console.log(`JSON server is running on port ${PORT},`);
})
