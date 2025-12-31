import request from "supertest";
import app from "../index.js";
import User from "../models/User.js";
import "./setup.js";

describe("Profile System Integration", () => {
  let token = "";
  let userId = "";

  const testUser = {
    name: "Giorgi",
    surname: "Arkania",
    email: "giorgi@test.com",
    phone: "555123456",
    password: "Password123!",
  };

  beforeAll(async () => {
    await request(app).post("/auth/register").send(testUser);
    
    const loginRes = await request(app).post("/auth/login").send({
      email: testUser.email,
      password: testUser.password,
    });

    token = loginRes.body.token;
    userId = loginRes.body.user.id;
  });

  describe("GET /profile", () => {
    it("should return the authenticated user's profile info", async () => {
      const res = await request(app)
        .get("/profile")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
     
      expect(res.body.email).toBe(testUser.email);
      expect(res.body.name).toBe(testUser.name);
      expect(res.body).not.toHaveProperty("password"); 
    });

    it("should return 401 if accessing profile without token", async () => {
      const res = await request(app).get("/profile");
      expect(res.statusCode).toBe(401);
    });
  });

  describe("PUT /profile", () => {
    it("should update user profile information", async () => {
      const updatedData = {
        name: "Giorgi-Updated",
        surname: "Arkania-New",
        email: "giorgi@test.com", 
        phone: "999999999"
      };

      const res = await request(app)
        .put("/profile")
        .set("Authorization", `Bearer ${token}`)
        .send(updatedData);

      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe("Giorgi-Updated");
      expect(res.body.phone).toBe("999999999");

      const userInDb = await User.findById(userId);
      expect(userInDb.name).toBe("Giorgi-Updated");
    });
  });
});