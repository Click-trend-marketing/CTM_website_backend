const app = require('./app');
const { PORT = 4000 } = process.env; // Use environment variable for port, default to 4000 if not set
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const http = require('http');

// Create the HTTP server and bind it with the Express app
const server = http.createServer(app);

// Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Click-Trend-Marketing API',
      version: '1.0.0',
      description: 'CRUD API with MongoDB documentation',
    },
    servers: [
      { url: "https://clicktrendmarketing.com", description: "Live server" }, // Updated live server URL
      { url: "http://localhost:4000", description: "Local server" }, // Local server on port 4000
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'], // Path to your API docs
};

const openapiSpecification = swaggerJsdoc(options);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Import your routes (already handled in app.js)
app.use('/api/', require('./routes/users.route'));

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
