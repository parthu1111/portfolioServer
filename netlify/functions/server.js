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
    const path = event.path.replace('/.netlify/functions/server', '');

    // Route handling
    if (path === '/getdetails') {
        const user = {
            id: 1,
            name: "John Doe",
            email: "johndoe@example.com",
        };
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
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