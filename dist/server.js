"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const router_1 = __importDefault(require("@koa/router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_static_1 = __importDefault(require("koa-static"));
const path_1 = __importDefault(require("path"));
const database_1 = __importDefault(require("./config/database"));
const uuidRoutes_1 = __importDefault(require("./routes/uuidRoutes"));
const customerRoutes_1 = __importDefault(require("./routes/customerRoutes"));
const swagger_1 = __importDefault(require("./config/swagger"));
const app = new koa_1.default();
const router = new router_1.default();
const PORT = process.env.PORT || 3000;
// Connect to MongoDB
(0, database_1.default)();
// Middleware
app.use((0, koa_bodyparser_1.default)());
// Swagger JSON route
router.get('/swagger.json', (ctx) => {
    ctx.body = swagger_1.default;
});
// Serve Swagger UI static files
const swaggerUiDistPath = path_1.default.dirname(require.resolve('swagger-ui-dist'));
app.use((0, koa_static_1.default)(swaggerUiDistPath));
// Custom Swagger UI HTML
router.get('/docs', (ctx) => {
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
router.use('/api', uuidRoutes_1.default.routes(), uuidRoutes_1.default.allowedMethods());
router.use('/api', customerRoutes_1.default.routes(), customerRoutes_1.default.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
});
exports.default = server;
