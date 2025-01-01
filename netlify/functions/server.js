const express = require('express');
const app = express();
const port = 3000;

// Public GET API
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Node.js server!' });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

exports.handler = async (event, context) => {
    // Extract the path from the event object
    const path = event.path;

    // Route handling
    if (path === '/api/v1/getdetails') {
        const filePath = path.resolve(__dirname, '../../Data/users.json');
        const fileData = fs.readFileSync(filePath, 'utf-8');
        const users = JSON.parse(fileData);

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(users),
        };
    }

    if (path === '/hello') {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: "Hello from the server!" }),
        };
    }

    // Default response for undefined routes
    return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: "Route not found" }),
    };
};