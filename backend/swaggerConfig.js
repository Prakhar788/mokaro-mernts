

export const swaggerDefinition = {
  openapi: '3.0.0', // Use the appropriate version
  info: {
    title: 'Your API Documentation',
    
    description: 'API documentation for your application.',
  },
  servers: [
    {
      url: 'http://localhost:3002', // Replace with your server URL
      description: 'Development server',
    },
  ],
};

export const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Specify the path to your route files
};
