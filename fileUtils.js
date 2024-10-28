// Helper function for reading and writing to items.json

const fs = require('fs');
const path = require('path');
const { getAllItems, createItem, getItem, updateItem, deleteItem } = require('./api');

const serveFile = (res, filePath, contentType, statusCode = 200) => {
    fs.readFile(path.join(__dirname, filePath), (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Server Error');
        } else {
            res.writeHead(statusCode, { 'Content-Type': contentType });
            res.end(data);
        }
    });
};

const handleApiRequest = (req, res) => {
    const [_, api, action, id] = req.url.split('/');
    const itemId = id ? parseInt(id) : null;
    if (api === 'api' && action === 'items') {
        if (req.method === 'GET' && !id) getAllItems(res);
        else if (req.method === 'POST') createItem(req, res);
        else if (req.method === 'GET' && id) getItem(itemId, res);
        else if (req.method === 'PUT' && id) updateItem(req, itemId, res);
        else if (req.method === 'DELETE' && id) deleteItem(itemId, res);
        else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'API route not found' }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid endpoint' }));
    }
};

module.exports = { serveFile, handleApiRequest };