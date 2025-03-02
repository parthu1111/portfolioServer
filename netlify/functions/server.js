const nodemailer = require('nodemailer');
const {getDetails,getDetailsByPublicService} = require('../../Apps/getDetails');
// const app = express();
// const port = 3000;

// // Public GET API
// app.get('/api/hello', (req, res) => {
//     res.json({ message: 'Hello from Node.js server!' });
// });

// // Start server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

exports.handler = async (event, context) => {
    // Extract the path from the event object
    const path = event.path;
    const method=event.httpMethod;
    console.log("Method: ",method);
    console.log("Path: ",path);
    
    

    const allowedOrigins = ['https://localhost:3000','https://localhost:3001', 'https://parthparmar7878.netlify.app','https://imparthparmar.netlify.app'];
    
    // Extract the origin from the event headers
    const origin = event.headers.origin;

    // Check if the origin is in the allowed list
    const corsHeaders = {
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',  // Allow necessary HTTP methods
        'Access-Control-Allow-Headers': 'Content-Type',         // Allow necessary headers
    };

    if (allowedOrigins.includes(origin)) {
        corsHeaders['Access-Control-Allow-Origin'] = origin;  // Dynamically set the allowed origin
    }

    // Route handling
    if (path === '/api/v1/getdetails') {
        //const filePath = path.resolve(__dirname, '../../Data/users.json');
        //const fileData = fs.readFileSync('../../Data/users.json', 'utf-8');
        const users = getDetails();

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
            body: JSON.stringify(users),
        };
    }
    if (path === '/api/v2/getdetails') {
        //const filePath = path.resolve(__dirname, '../../Data/users.json');
        //const fileData = fs.readFileSync('../../Data/users.json', 'utf-8');
        const users = getDetailsByPublicService();

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
            body: JSON.stringify(users),
        };
    }

    if(path == '/api/v1/sendemail'){
        //const data = JSON.parse(event.body);
        console.log(event.body);
        let reqData=JSON.parse(event.body);
        let data='{"message":"Email sent successfully"}';
        //let data=JSON.parse(event.body);
        const { LastName, Email, Description } = JSON.parse(event.body);
         // Create transporter using SMTP (Use Gmail, SendGrid, etc.)
         let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'parthparmar9786@gmail.com', // Your email (store in environment variable)
                pass: 'hmlz zzxb cxnx cosp'  // App password (not your real password)
            }
        });

        // Email Options
        let mailOptions = {
            from: 'Pr@vin7878*',
            to: Email, // Send to the user's email
            subject: `Hello ${LastName}, Your Request Received!`,
            text: `Thank you for reaching out! Your message: "${Description}" has been received.`
        };

        await transporter.sendMail(mailOptions);

        console.log(data);
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
            body: JSON.stringify({ message: "Email sent successfully!" })
        };
    }

    if (path === '/') {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json',...corsHeaders },
            body: JSON.stringify({ message: "Hello from the server!" }),
        };
    }

    // Default response for undefined routes
    return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
        body: JSON.stringify({ error: "Route not found" }),
    };
};