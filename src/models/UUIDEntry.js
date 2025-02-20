import mongoose from 'mongoose';

const UUIDEntrySchema = new mongoose.Schema({
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
}, { timestamps: true });

export default mongoose.model('UUIDEntry', UUIDEntrySchema);
