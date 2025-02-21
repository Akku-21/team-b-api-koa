"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomerById = exports.getAllCustomers = exports.getCustomerById = exports.createCustomer = void 0;
const Customer_1 = __importDefault(require("../models/Customer"));
const createCustomer = async (ctx) => {
    try {
        const customer = new Customer_1.default(ctx.request.body);
        await customer.save();
        ctx.status = 201;
        ctx.body = { success: true, message: 'Data saved successfully' };
    }
    catch (error) {
        ctx.status = 500;
        ctx.body = { success: false, message: error.message };
    }
};
exports.createCustomer = createCustomer;
const getCustomerById = async (ctx) => {
    try {
        const customer = await Customer_1.default.findOne({ customerId: ctx.params.customerId });
        if (!customer) {
            ctx.status = 404;
            ctx.body = { success: false, message: 'Customer not found' };
            return;
        }
        ctx.status = 200;
        ctx.body = { success: true, data: customer };
    }
    catch (error) {
        ctx.status = 500;
        ctx.body = { success: false, message: error.message };
    }
};
exports.getCustomerById = getCustomerById;
const getAllCustomers = async (ctx) => {
    try {
        const customers = await Customer_1.default.find({});
        ctx.status = 200;
        ctx.body = { success: true, data: customers };
    }
    catch (error) {
        ctx.status = 500;
        ctx.body = { success: false, message: error.message };
    }
};
exports.getAllCustomers = getAllCustomers;
const deleteCustomerById = async (ctx) => {
    try {
        const customer = await Customer_1.default.findOneAndDelete({ customerId: ctx.params.customerId });
        if (!customer) {
            ctx.status = 404;
            ctx.body = { success: false, message: 'Customer not found' };
            return;
        }
        ctx.status = 200;
        ctx.body = { success: true, message: 'Customer data deleted successfully' };
    }
    catch (error) {
        ctx.status = 500;
        ctx.body = { success: false, message: error.message };
    }
};
exports.deleteCustomerById = deleteCustomerById;
