import * as mongoose from 'mongoose';
import config from './heartbeat.schema.config';

export const MetaSchema = new mongoose.Schema({
  foo: { type: String, required: true },
});

export const HeartbeatSchema = new mongoose.Schema({
  id: { type: String, required: true },
  group: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: config.EXPIRY_INTERVAL,
  },
  meta: { type: MetaSchema, required: true },
});
