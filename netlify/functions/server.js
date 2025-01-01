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
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Hello from Node.js serverless function!' }),
    };
};