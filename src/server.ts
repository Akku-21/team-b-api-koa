import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import connectDB from './config/database';
import uuidRoutes from './routes/uuidRoutes';

const app = new Koa();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser());

// Routes
app.use(uuidRoutes.routes()).use(uuidRoutes.allowedMethods());

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default server;
