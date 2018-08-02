
import request from "supertest";
import app from "../../src/app";

describe("GET Pages", () => {
    it("should return 200 when home page is requested", (done) => {
        request(app)
            .get("/")
            .expect(200, done);
    });
});