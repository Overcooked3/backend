const request = require("supertest");
const app = require('../prisma');

describe("Testing routes distribution", () => {
  it("should redirect to the home page /", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(404);
    expect(response.headers.location).toBe("/home");
  });
});