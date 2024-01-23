// Assuming you have set up Jest and Supertest
const request = require('supertest');
const app = require('../src/index'); // Replace with the correct path to your app

// Mock Prisma
const { PrismaClient } = require('@prisma/client');
const prismaMock = new PrismaClient();
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => prismaMock),
}));

describe('Testing routes distribution with Prisma', () => {
  test('should register the user', async () => {
    // Mock the Prisma user.create method
    prismaMock.user.create.mockResolvedValueOnce({
      id: 1,
      username: 'Bernardette',
      email: 'barmandu92@hotmail.com',
      password: 'hashedpassword', // Assuming your real implementation hashes the password
    });

    const response = await request(app)
      .post('/register')
      .send({
        username: 'Bernardette',
        email: 'barmandu92@hotmail.com',
        password: 'labise123456',
      });

    // Assert the status code
    expect(response.statusCode).toBe(201);

    // Assert the response body
    expect(response.body).toEqual({
      id: 1,
      username: 'Bernardette',
      email: 'barmandu92@hotmail.com',
      password: 'hashedpassword',
    });

    // Ensure the Prisma method was called with the correct arguments
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: {
        username: 'Bernardette',
        email: 'barmandu92@hotmail.com',
        password: 'labise123456',
      },
    });

    // Reset mocks after the test
    jest.clearAllMocks();
  });
});
