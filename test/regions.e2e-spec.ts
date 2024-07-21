import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';

describe('RegionMaster (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should register a new admin', async () => {
    const adminData = {
      username: 'admin1',
      email: 'admin1@example.com',
      password: 'password',
      role: 'admin',
    };

    const response = await request(app.getHttpServer())
      .post('/admin/register')
      .send(adminData)
      .expect(201);

    expect(response.body.status_code).toBe(201);
    expect(response.body.message).toBe('Admin registered successfully');
  });

  it('should login as admin', async () => {
    const loginData = {
      email: 'admin1@example.com',
      password: 'password',
    };

    const response = await request(app.getHttpServer())
      .post('/admin/login')
      .send(loginData)
      .expect(200);

    expect(response.body.message).toBe('Login successful');
    jwtToken = response.body.access_token;
    expect(jwtToken).toBeDefined();
  });

  it('should create a new region', async () => {
    const regionData = {
      RegionCode: 'NA',
      RegionName: 'North America',
      Status: 'active',
    };

    const response = await request(app.getHttpServer())
      .post('/v1/api/regions')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(regionData)
      .expect(200);

    expect(response.body.status_code).toBe(200);
    expect(response.body.message).toBe('Operation was successful');
  });

  it('should retrieve all regions', async () => {
    const response = await request(app.getHttpServer())
      .get('/v1/api/regions')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should update an existing region', async () => {
    const regionUpdateData = {
      RegionName: 'North America Updated',
      Status: 'inactive',
    };

    const response = await request(app.getHttpServer())
      .put('/v1/api/regions/NA')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(regionUpdateData)
      .expect(200);

    expect(response.body.status_code).toBe(200);
    expect(response.body.message).toBe('Operation was successful');
  });

  it('should delete a region', async () => {
    const response = await request(app.getHttpServer())
      .delete('/v1/api/regions/NA')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(response.body.status_code).toBe(200);
    expect(response.body.message).toBe('Operation was successful');
  });

  afterAll(async () => {
    await app.close();
  });
});
