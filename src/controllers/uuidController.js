import UUIDEntry from '../models/UUIDEntry.js';

export const validateUUID = async (ctx) => {
  const { uuid } = ctx.params;

  try {
    const entry = await UUIDEntry.findOne({ 
      uuid, 
      expiresAt: { $gt: new Date() },
      resolvedAt: null 
    });

    if (!entry) {
      ctx.status = 404;
      ctx.body = { 
        valid: false, 
        message: 'UUID is invalid, expired, or already resolved' 
      };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      valid: true,
      jsonSchema: entry.jsonSchema
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { 
      error: 'Internal server error', 
      details: error.message 
    };
  }
};

export const createUUIDEntry = async (ctx) => {
  const { uuid, jsonSchema, expiresAt } = ctx.request.body;

  try {
    const newEntry = new UUIDEntry({
      uuid,
      jsonSchema,
      expiresAt: new Date(expiresAt)
    });

    await newEntry.save();

    ctx.status = 201;
    ctx.body = { 
      message: 'UUID entry created successfully', 
      uuid: newEntry.uuid 
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { 
      error: 'Could not create UUID entry', 
      details: error.message 
    };
  }
};
