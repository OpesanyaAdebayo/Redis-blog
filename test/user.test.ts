import request from 'supertest';
import app from "../src/app";

describe("GET Pages", () => {
  it("should return 200 when home page is requested", (done) => {
    request(app)
      .get("/")
      .expect(200, done);
  });

  it("should return 200 OK when signup page is requested", (done) => {
    request(app)
      .get("/signup")
      .expect(200, done);
  });
});

describe("POST signup", () => {

  it("should give an error if invalid email is supplied", (done) => {
    return request(app)
      .post("/signup")
      .send({ email: "meetme.com" })
      .send({ password: "zbgcc" })
      .expect(401)
      .end(function (err, res) {
        expect(res.body.error).not.toBe(undefined);
        done();
      });
  });

  it("should return error when password is less than 4 characters.", done => {
    return request(app)
      .post("/signup")
      .send({ email: "meetme@xyz.com" })
      .send({ password: "dz" })
      .expect(401)
      .end(function (err, res) {
        console.log(res.body)
        expect(res.body.error).not.toBe(undefined);
        done();
      });
  });
});