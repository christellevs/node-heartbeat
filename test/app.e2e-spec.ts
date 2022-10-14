import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppService } from './../src/app.service';
import { HeartbeatModule } from './../src/heartbeat/heartbeat.module';
import { CreateHeartbeatDto } from './../src/heartbeat/dto/create-hearbeat.dto';
import { HeartbeatStub } from './stubs/heartbeat.stub';
import { Heartbeat } from './../src/heartbeat/entities/heartbeat.entity';

jest.setTimeout(30000);
describe('AppController (e2e)', () => {
  let app: INestApplication;
  let dbConnection: Connection;
  let heartbeatStub: Heartbeat = HeartbeatStub();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.TEST_DB_URL),
        HeartbeatModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dbConnection = moduleFixture.get<AppService>(AppService).getDbHandle();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.collection('Heartbeat').deleteMany({});
  });

  it('/ (GET) groups summary', async () => {
    const createHeartbeatDto: CreateHeartbeatDto = {
      meta: { foo: '1' },
    };
    // add to db
    await request(app.getHttpServer())
      .post('/:group/:id')
      .query({ group: heartbeatStub.group, id: heartbeatStub.id })
      .send(createHeartbeatDto);

    const response = await request(app.getHttpServer()).get('/');

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body.length).toEqual(1);
  });

  it('(GET) should return an array of hearbeats within a group', async () => {
    const createHeartbeatDto: CreateHeartbeatDto = {
      meta: { foo: '1' },
    };
    // add to db
    await request(app.getHttpServer())
      .post('/:group/:id')
      .query({ group: heartbeatStub.group, id: heartbeatStub.id })
      .send(createHeartbeatDto);

    const response = await request(app.getHttpServer())
      .get('/:group')
      .query({ group: heartbeatStub.group });

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body.length).toEqual(1);
  });

  it('(POST) should create a heartbeat', async () => {
    const createHeartbeatDto: CreateHeartbeatDto = {
      meta: { foo: '1' },
    };

    const response = await request(app.getHttpServer())
      .post('/:group/:id')
      .query({ group: heartbeatStub.group, id: heartbeatStub.id })
      .send(createHeartbeatDto);

    expect(response.status).toBe(201);
    expect(response.type).toBe('application/json');
    expect(response.body).toMatchObject(createHeartbeatDto);
  });

  it(' (DELETE) should delete a hearbeat by group and id', async () => {
    await dbConnection.collection('Heartbeat').insertOne(HeartbeatStub());
    const response = await request(app.getHttpServer())
      .delete('/:group/:id')
      .query({ group: heartbeatStub.group, id: heartbeatStub.id });

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toMatchObject({
      acknowledged: true,
      deletedCount: 1,
    });
  });
});
