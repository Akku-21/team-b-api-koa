import mongoose, { Schema, Document } from 'mongoose';

export interface IUUIDEntry extends Document {
  guid: string;
  timestamp: number;
  name: string;
  email: string;
}

const UUIDEntrySchema: Schema = new Schema({
  guid: { type: String, required: true, unique: true },
  timestamp: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true }
});

export default mongoose.model<IUUIDEntry>('UUIDEntry', UUIDEntrySchema);
