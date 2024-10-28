//Main file to handle server creation, routing, and calling the API functions

const http = require('http');
const { serveFile, handleApiRequest } = require('./fileUtils');

const server = http.createServer((req, res) => {
    if (req.url === '/index.html') {
        serveFile(res, 'index.html', 'text/html');
    } else if (req.url.endsWith('.html')) {
        serveFile(res, '404.html', 'text/html', 404);
    } else if (req.url.startsWith('/api/')) {
        handleApiRequest(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});