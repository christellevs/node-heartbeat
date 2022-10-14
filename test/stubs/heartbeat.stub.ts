import { Heartbeat } from '../../src/heartbeat/entities/heartbeat.entity';
import { Meta } from '../../src/heartbeat/entities/meta.entity';

export const HeartbeatStub = (): Heartbeat => {
  const meta: Meta = { foo: '1' };
  return {
    id: '123',
    group: 'cool-group',
    createdAt: new Date(),
    updatedAt: new Date(),
    meta: meta,
  };
};
