import request from 'supertest';
import app from "../src/app";

describe("it should return 200 when home page is requested", () => {
  it("should return 200", done => {
    request(app)
      .get("/")
      .expect(200, done);
  });
});