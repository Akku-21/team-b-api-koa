import { Context } from 'koa';
import Customer from '../models/Customer';
import UUIDEntry from '../models/UUIDEntry';

const brokerPassword = 'your-secure-password';

export const login = async (ctx: Context) => {
  const { password } = ctx.request.body as any;
  if (password === brokerPassword) {
    ctx.status = 200;
    ctx.body = { success: true, message: 'Login successful' };
  } else {
    ctx.status = 401;
    ctx.body = { success: false, message: 'Invalid credentials' };
  }
};

export const clearAllData = async (ctx: Context) => {
  try {
    await Customer.deleteMany({});
    await UUIDEntry.deleteMany({});
    ctx.status = 200;
    ctx.body = { success: true, message: 'All data cleared successfully' };
  } catch (error: any) {
    ctx.status = 500;
    ctx.body = { success: false, message: error.message };
  }
};
