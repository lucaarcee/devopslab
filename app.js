const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hola desde tu pipeline DevOps 🚀\n');
});

server.listen(3000, '0.0.0.0');
console.log('App corriendo en puerto 3000');