import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import Router from '@koa/router';
import { koaSwagger } from 'koa2-swagger-ui';

import connectDB from './config/database';
import customerRoutes from './routes/customerRoutes';
import uuidRoutes from './routes/uuidRoutes';
import otherRoutes from './routes/otherRoutes';
import swaggerSpec from './config/swagger';

interface SwaggerOptions {
  [key: string]: any;
}

const app = new Koa();
const router = new Router();

// Connect to MongoDB
connectDB();
// const mongoURI = 'mongodb://localhost:27017/your-database-name';

// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser());

// Swagger JSON route
router.get('/swagger.json', (ctx: Koa.Context) => {
  ctx.body = swaggerSpec;
});
router.use('/api', customerRoutes.routes(), customerRoutes.allowedMethods());
router.use('/api', uuidRoutes.routes(), uuidRoutes.allowedMethods());
router.use('/api', otherRoutes.routes(), otherRoutes.allowedMethods());

const swaggerOptions: SwaggerOptions = {
  spec: swaggerSpec
};

app.use(
  koaSwagger({
    routePrefix: '/docs', // host at /swagger instead of default /docs
    swaggerOptions: {
      url: '/swagger.json', // example path to json
    },
  }),
);

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
