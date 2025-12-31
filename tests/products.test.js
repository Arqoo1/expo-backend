import request from "supertest";
import app from "../index.js";
import Product from "../models/Product.js";
import "./setup.js";

describe("Product System Integration", () => {
  let token = "";

  const mockProducts = [
    { name: "iPhone 15", type: "electronics", price: 999 },
    { name: "MacBook Pro", type: "electronics", price: 1999 },
    { name: "Coffee Mug", type: "home", price: 15 },
  ];

  beforeAll(async () => {
    await Product.deleteMany({});
    await Product.insertMany(mockProducts);

    const testUser = {
      name: "John",
      surname: "Doe",
      email: "product-tester@test.com",
      phone: "1234567890",
      password: "Password123!",
    };

    await request(app).post("/auth/register").send(testUser);

    const loginRes = await request(app).post("/auth/login").send({
      email: testUser.email,
      password: testUser.password,
    });

    if (loginRes.body.token) {
      token = loginRes.body.token;
    } else {
      console.error("FAILED TO GET TOKEN:", loginRes.body.error);
    }
  });

  it("should fetch products with a valid token", async () => {
    const res = await request(app)
      .get("/products")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(3);
  });
  
  it("should return 401 if token is missing", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(401);
  });
});