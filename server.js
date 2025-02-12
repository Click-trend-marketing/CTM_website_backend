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
      { url: "http://62.72.30.215:8000", description: "Live server" }, // Live server on port 8000
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
  apis: ['./routes/*.js'], 
};

const openapiSpecification = swaggerJsdoc(options);

// Serve Swagger UI\

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/api/', require('./routes/users.route'));
app.use('/api/', require('./routes/admin.route'));
app.use('/api/', require('./routes/career.route'));
app.use('/api/', require('./routes/applicants.route'));
app.use('/api/', require('./routes/blog.routes'));
// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
