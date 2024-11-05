import request from "supertest";
import { faker } from "@faker-js/faker"

import app from "../src/index";

describe("App", () => {
  it("should return 200", async () => {
    const response = await request(app).get("/ping");
    expect(response.status).toEqual(200);
  });

  it("should return 404", async () => {
    const response = await request(app).get("/not-found");
    expect(response.status).toEqual(404);
  });

  it("should list all clients", async () => {
    const response = await request(app).get("/clients");
    expect(response.status).toEqual(200);
  });

  it("should get one client", async () => {
    const response = await request(app).get("/clients?id=8");
    expect(response.status).toEqual(200);
  });

  it("should update a client", async () => {
    const response = await request(app).put("/clients/update").send({
      id: 1,
      name: faker.person.firstName(),
      email: faker.internet.email(),
      telephone: faker.phone.number(),
      document: faker.phone.number(),
      status: "active",
    });
    expect(response.status).toEqual(200);
  });
})
