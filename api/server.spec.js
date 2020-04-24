const request = require("supertest");
const server = require('./server.js');

describe("server.js", () => {
    describe("GET /", () => {
        it('Should return a 200', () => {
            return request(server)
            .get('/')
            .then(res => {
                expect(res.status).toBe(200);
            });
        });
        it("Should return a JSON", () => {
            return request(server)
            .get('/')
            .then(res => {
                expect(res.type).toMatch(/json/i);
            });
        });
        it("Should get a response with {up}", () => {
            return request(server)
            .get('/')
            .then(res => {
                expect(res.body.api).toBe('up')
            });
        });
    });
});

describe("POST /register", () => {
    it('return an error if username is not unique', () => {
        return request(server)
        .post("/api/auth/register")
        .send({
            username: "Ricky",
            password: "bobby"
        })
        .expect(500);
    });
});

describe("POST /register", () => {
    it('retrun error because username is not unique', () => {
        return request(server)
        .post("/api/auth/register")
        .send({
            username: "Ricky",
            password: "bobby"
        })
        .expect(500);
    });
});

describe("POST /register", () => {
    it('retrun error because username is not unique', () => {
        return request(server)
        .post("/api/auth/register")
        .send({
            username: "Becks",
            password: "bobby"
        })
        .expect(201);
    });
});

describe("POST /login", () => {
    it("should return error", () => {
        return request(server)
        .post('/api/auth/login')
        .send({
            name: "Jimmy",
            password: "jams"
        })
        .expect(500)
    });
});

describe("POST /login", () => {
    it("should return login message", () => {
        return request(server)
        .post('/api/auth/login')
        .send({
            username: "Ricky",
            password: "bobby"
        })
        .expect(200)
    });
});
