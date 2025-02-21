import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import path from 'path';

import connectDB from './config/database';
import uuidRoutes from './routes/uuidRoutes';
import customerRoutes from './routes/customerRoutes';
import swaggerSpec from './config/swagger';

const app = new Koa();
const router = new Router();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser());

// Swagger JSON route
router.get('/swagger.json', (ctx: Koa.Context) => {
  ctx.body = swaggerSpec;
});

// Serve Swagger UI static files
const swaggerUiDistPath = path.dirname(require.resolve('swagger-ui-dist'));
app.use(serve(swaggerUiDistPath));

// Custom Swagger UI HTML
router.get('/docs', (ctx: Koa.Context) => { // <-- Specify the type of 'ctx' as Koa.Context
  ctx.type = 'html';
  ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Swagger UI</title>
      <link rel="stylesheet" type="text/css" href="/swagger-ui.css">
      <script src="/swagger-ui-bundle.js"></script>
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script>
        window.onload = function() {
          SwaggerUIBundle({
            url: "/swagger.json",
            dom_id: '#swagger-ui',
            presets: [
              SwaggerUIBundle.presets.apis,
              SwaggerUIBundle.SwaggerUIStandalonePreset
            ],
            layout: "BaseLayout"
          });
        }
      </script>
    </body>
    </html>
  `;
});

// API Routes
router.use('/api', uuidRoutes.routes(), uuidRoutes.allowedMethods());
router.use('/api', customerRoutes.routes(), customerRoutes.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
});

export default server;
