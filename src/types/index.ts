import { Document } from 'mongoose';

export interface IUUIDEntry extends Document {
  uuid: string;
  jsonSchema: Record<string, unknown>;
  expiresAt: Date;
  resolvedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UUIDValidationResponse {
  valid: boolean;
  jsonSchema?: Record<string, unknown>;
  message?: string;
}

export interface CreateUUIDEntryRequest {
  uuid: string;
  jsonSchema: Record<string, unknown>;
  expiresAt: string | Date;
}
