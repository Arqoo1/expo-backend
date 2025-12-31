import request from "supertest";
import app from "../index.js";
import User from "../models/User.js";
import "./setup.js";

describe("Auth System Integration", () => {
  const testUser = {
    name: "John",
    surname: "Doe",
    email: "john@test.com",
    phone: "1234567890",
    password: "Password123!",
  };

  let userToken = "";

  it("should register a new user successfully", async () => {
    const res = await request(app).post("/auth/register").send(testUser);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User registered successfully");

    const userInDb = await User.findOne({ email: testUser.email });
    expect(userInDb).not.toBeNull();
    expect(userInDb.password).not.toBe(testUser.password);
  });

  it("should login the user and return a JWT token", async () => {
    const res = await request(app).post("/auth/login").send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe(testUser.email);

    userToken = res.body.token; 
  });

  it("should verify the user using the JWT token", async () => {
    const res = await request(app)
      .get("/auth/verify") 
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe(testUser.email);
  });

  it("should return 400 if registration data is invalid", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ email: "wrong-email" }); 

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
