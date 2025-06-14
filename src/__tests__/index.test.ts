import app from "../index";
import request from "supertest";

describe("GET /api/words get some words", () => {
  it('test getting all words', async () => {
    const response = await request(app).get("/api/words");
    expect(response.status).toBe(200);
    expect(response.body.type).toEqual("application/json");
    expect(response.body.words.length).toEqual(6);
  });
  it('test getting two words', async () => {
    const response = await request(app).get("/api/words?count=2");
    expect(response.status).toBe(200);
    expect(response.body.type).toEqual("application/json");
    expect(response.body.words.length).toEqual(2);
  });
  it('test getting more words than available', async () => {
    const response = await request(app).get("/api/words?count=25");
    expect(response.status).toBe(200);
    expect(response.body.type).toEqual("application/json");
    expect(response.body.words.length).toEqual(6);
  });
});

describe("GET /api/words error handling", () => {
  it('test invalid non-numeric count', async () => {
    const response = await request(app).get("/api/words?count=invalid");
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("Invalid count provided, non numeric: invalid");
  });
  it('test invalid non-integer count', async () => {
    const response = await request(app).get("/api/words?count=2.35");
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("Invalid count provided, non integer: 2.35");
  });
  it('test invalid count zero', async () => {
    const response = await request(app).get("/api/words?count=0");
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("Invalid count provided, must be positive: 0");
  });
  it('test invalid count negative', async () => {
    const response = await request(app).get("/api/words?count=-1");
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("Invalid count provided, must be positive: -1");
  });
  it('test invalid count greater than max', async () => {
    const response = await request(app).get("/api/words?count=35");
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual(
      "Invalid count provided, must not be more than 25 but was: 35"
    );
  });
});
