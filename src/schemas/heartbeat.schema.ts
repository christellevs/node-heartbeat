import * as mongoose from 'mongoose';

export const MetaSchema = new mongoose.Schema({
  foo: String,
});

export const HeartbeatSchema = new mongoose.Schema({
  id: String,
  group: String,
  createdAt: Date,
  updatedAt: Date,
  meta: MetaSchema,
});
