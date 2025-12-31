import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    if (mongoose.connection.db) {
        await mongoose.connection.db.dropDatabase();
    }
    await mongoose.connection.close();
    await mongoServer.stop();
});