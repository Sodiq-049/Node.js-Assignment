Node.js Inventory and Web Server Assignment 🎉

Welcome to the Node.js Assignment! This project showcases a foundational server setup using Node.js, without any frameworks, to demonstrate pure JavaScript skills in managing HTTP requests and file system interactions. Dive in to see how we can build a server from scratch and manage an inventory system through custom APIs!

Project Overview 📜

This project consists of two primary functionalities:

Simple HTML Server:

When you navigate to /index.html, a webpage with a minimal design appears.
Any other route like /{random}.html will return a custom 404 page for an improved user experience.
Inventory API:

A RESTful API to manage an inventory system.
You can Create, Read, Update, and Delete items in the inventory through the following endpoints:
GET /api/items: Retrieves all items.
GET /api/items/{id}: Retrieves a single item by ID.
POST /api/items: Adds a new item to the inventory.
PUT /api/items/{id}: Updates an existing item by ID.
DELETE /api/items/{id}: Removes an item by ID.
Key Features 💡
No Frameworks: Built entirely on vanilla Node.js, this project reinforces core knowledge of HTTP handling and file operations.
File-Based Data Persistence: Data is stored in items.json, showcasing a lightweight approach to persistence without needing a database.
Modular Design: The code is organized to ensure each function is clean and easy to maintain.
Technologies Used 🛠️
Node.js for server and API functionality
File System (fs) for data storage in items.json
HTML for the simple webpage display

Getting Started 🚀

Clone this repository:
git clone https://github.com/Sodiq-049/Node.js-Assignment.git
cd Nodejs-Inventory-Server

Run the Server:
node server.js

Access the Server:
HTML Page: http://localhost:3000/index.html
API Endpoints: e.g., http://localhost:3000/api/items

Enjoy exploring the project and feel free to contribute or reach out with any questions!
