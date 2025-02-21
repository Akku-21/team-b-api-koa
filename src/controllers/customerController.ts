import { Context } from 'koa';
import Customer from '../models/Customer';

export const createCustomer = async (ctx: Context) => {
  try {
    const customer = new Customer(ctx.request.body as any);
    await customer.save();
    ctx.status = 201;
    ctx.body = { success: true, message: 'Data saved successfully' };
  } catch (error: any) {
    ctx.status = 500;
    ctx.body = { success: false, message: error.message };
  }
};

export const getCustomerById = async (ctx: Context) => {
  try {
    const customer = await Customer.findOne({ customerId: ctx.params.customerId });
    if (!customer) {
      ctx.status = 404;
      ctx.body = { success: false, message: 'Customer not found' };
      return;
    }
    ctx.status = 200;
    ctx.body = { success: true, data: customer };
  } catch (error: any) {
    ctx.status = 500;
    ctx.body = { success: false, message: error.message };
  }
};

export const getAllCustomers = async (ctx: Context) => {
  console.log('getAllCusetomen ')
  try {
    const customers = await Customer.find({});
    ctx.status = 200;
    ctx.body = { success: true, data: customers };
  } catch (error: any) {
    ctx.status = 500;
    ctx.body = { success: false, message: error.message };
  }
};

export const deleteCustomerById = async (ctx: Context) => {
  try {
    const customer = await Customer.findOneAndDelete({ customerId: ctx.params.customerId });
    if (!customer) {
      ctx.status = 404;
      ctx.body = { success: false, message: 'Customer not found' };
      return;
    }
    ctx.status = 200;
    ctx.body = { success: true, message: 'Customer data deleted successfully' };
  } catch (error: any) {
    ctx.status = 500;
    ctx.body = { success: false, message: error.message };
  }
};
