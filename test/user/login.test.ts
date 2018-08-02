import request from "supertest";
import app from "../../src/app";

describe("GET /login", () => {
    it("should return 200 OK", (done) => {
        return request(app).get("/login")
            .expect(200, done);
    });
});

describe("POST /login", () => {
    it("should give an error if invalid email is supplied", (done) => {
        return request(app)
            .post("/login")
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
            .post("/login")
            .send({ email: "meetme@xyz.com" })
            .send({ password: "dz" })
            .expect(401)
            .end(function (err, res) {
                expect(res.body.error).not.toBe(undefined);
                done();
            });
    });

});