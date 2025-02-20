import mongoose from 'mongoose';
import { IUUIDEntry } from '../types';

const UUIDEntrySchema = new mongoose.Schema<IUUIDEntry>({
  uuid: {
    type: String,
    required: true,
    unique: true
  },
  jsonSchema: {
    type: Object,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  resolvedAt: {
    type: Date,
    default: null
  }
}, { 
  timestamps: true 
});

export default mongoose.model<IUUIDEntry>('UUIDEntry', UUIDEntrySchema);
