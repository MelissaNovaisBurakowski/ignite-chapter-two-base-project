import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("Create Category Controller", async () => {
  it("should be able to create a new category", async () => {
    await request(app).get("cars");
  });
});
