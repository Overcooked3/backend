const request = require("supertest");
const app = require("../prisma");

describe("testing routes distribution", () => {
  it("should register the user", async () => {
    const response = await request(app).post("/register").send({});
    expect(response.statusCode).toBe(200);
  });

  it("should login the user", async () => {
    const response = await request(app).post("/login").send({});
    expect(response.statusCode).toBe(200);
  });

  it("should update the user", async () => {
    const response = await request(app).put("/1").send({}); // TO CHECK ?
    expect(response.statusCode).toBe(200);
  });

  it("should delete the user", async () => {
    const response = await request(app).delete("/1"); // TO CHECK ?
    expect(response.statusCode).toBe(200);
  });
});
