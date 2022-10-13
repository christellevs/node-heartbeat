import * as mongoose from 'mongoose';

export const MetaSchema = new mongoose.Schema({
  foo: { type: String, required: true },
});

export const HeartbeatSchema = new mongoose.Schema({
  id: { type: String, required: true },
  group: { type: String, required: true },
  createdAt: { type: Date, required: true, default: new Date() },
  updatedAt: { type: Date, required: true, default: new Date() },
  meta: { type: MetaSchema, required: true },
});
