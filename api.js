//Contain all CRUD function for managing inventory items

const fs = require('fs');
const path = require('path');

const itemsFilePath = path.join(__dirname, 'items.json');

// Function to read items from items.json safely
function readItemsFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(itemsFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error("Error reading items file:", err);
                return resolve([]); // Return empty array on error
            }
            try {
                const items = JSON.parse(data); // Parse JSON data
                resolve(items);
            } catch (parseErr) {
                console.error("Error parsing items JSON:", parseErr);
                resolve([]); // Return empty array on parse error
            }
        });
    });
}

// Function to write items to items.json safely
function writeItemsFile(items) {
    return new Promise((resolve, reject) => {
        fs.writeFile(itemsFilePath, JSON.stringify(items, null, 2), 'utf8', (err) => {
            if (err) {
                console.error("Error writing to items file:", err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// Get all items
const getAllItems = async (res) => {
    try {
        const items = await readItemsFile();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(items));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server Error' }));
    }
};

// Get a single item by ID
const getItem = async (id, res) => {
    try {
        const items = await readItemsFile();
        const item = items.find(i => i.id === id);
        if (item) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(item));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Item not found' }));
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server Error' }));
    }
};

// Create a new item
const createItem = async (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        try {
            const newItem = JSON.parse(body);
            const items = await readItemsFile();
            const lastIndex = items.length - 1;
            const newIndex = items[lastIndex].id + 1;
            newItem.id = newIndex;
            console.log(newIndex)
            items.push(newItem);
            await writeItemsFile(items);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newItem));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Server Error' }));
        }
    });
};

// Update an item by ID
const updateItem = async (req, id, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        try {
            const updatedItemData = JSON.parse(body);
            const items = await readItemsFile();
            const itemIndex = items.findIndex(i => i.id === id);
            if (itemIndex !== -1) {
                items[itemIndex] = { ...items[itemIndex], ...updatedItemData };
                await writeItemsFile(items);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(items[itemIndex]));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Item not found' }));
            }
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Server Error' }));
        }
    });
};

// Delete an item by ID
const deleteItem = async (id, res) => {
    try {
        const items = await readItemsFile();
        const filteredItems = items.filter(i => i.id !== id);
        if (items.length === filteredItems.length) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Item not found' }));
        } else {
            await writeItemsFile(filteredItems);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Item deleted' }));
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server Error' }));
    }
};

module.exports = { getAllItems, getItem, createItem, updateItem, deleteItem };