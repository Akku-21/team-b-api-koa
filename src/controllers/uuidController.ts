import { Context } from 'koa';
import UUIDEntry from '../models/UUIDEntry';
import Customer from '../models/Customer';

export const getAllGuids = async (ctx: Context) => {
  try {
    const uuidEntries = await UUIDEntry.find({});
    ctx.status = 200;
    ctx.body = { success: true, data: uuidEntries };
  } catch (error: any) {
    ctx.status = 500;
    ctx.body = { success: false, message: error.message };
  }
};

export const saveAllGuids = async (ctx: Context) => {
  try {
    const uuidEntries = ctx.request.body as typeof UUIDEntry[];
    await UUIDEntry.insertMany(uuidEntries);
    ctx.status = 200;
    ctx.body = { success: true, message: 'GUIDs saved successfully' };
  } catch (error: any) {
    ctx.status = 500;
    ctx.body = { success: false, message: error.message };
  }
};

export const getAllInvitationLinks = async (ctx: Context) => {
  try {
    const customers = await Customer.find({}, { customerId: 1, 'formData.guid': 1 });
    const invitationLinks: Record<string, string> = {};
    customers.forEach((customer) => {
      invitationLinks[customer.customerId] = customer.formData.guid;
    });
    ctx.status = 200;
    ctx.body = { success: true, data: invitationLinks };
  } catch (error: any) {
    ctx.status = 500;
    ctx.body = { success: false, message: error.message };
  }
};

export const saveAllInvitationLinks = async (ctx: Context) => {
  try {
    const invitationLinks = ctx.request.body;
    const bulkUpdates = Object.entries(invitationLinks as any ).map(([customerId, guid]) => ({
      updateOne: {
        filter: { customerId },
        update: { 'formData.guid': guid }
      }
    }));
    await Customer.bulkWrite(bulkUpdates);
    ctx.status = 200;
    ctx.body = { success: true, message: 'Invitation links saved successfully' };
  } catch (error: any) {
    ctx.status = 500;
    ctx.body = { success: false, message: error.message };
  }
};
