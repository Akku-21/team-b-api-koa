import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:PeeIiQrVuAgsqXVgYJnwYupVAabxmSAg@crossover.proxy.rlwy.net:17477';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, {
      // @ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.log(MONGO_URI)
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
