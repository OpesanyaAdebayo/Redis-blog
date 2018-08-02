import request from "supertest";
import app from "../../src/app";

describe("GET Pages", () => {
  it("should return 404 when unregistered route requested", done => {
    request(app)
      .get("/random")
      .expect(404, done);
  });
});
