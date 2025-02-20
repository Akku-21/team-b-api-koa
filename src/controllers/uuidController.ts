import { Context } from 'koa';
import UUIDEntry from '../models/UUIDEntry';
import {
  UUIDValidationResponse,
  CreateUUIDEntryRequest
} from '../types';

export const validateUUID = async (ctx: Context): Promise<void> => {
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
      } as UUIDValidationResponse;
      return;
    }

    ctx.status = 200;
    ctx.body = {
      valid: true,
      jsonSchema: entry.jsonSchema
    } as UUIDValidationResponse;
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

export const createUUIDEntry = async (ctx: Context): Promise<void> => {
  const { uuid, jsonSchema, expiresAt } = ctx.request.body as CreateUUIDEntryRequest;

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
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
