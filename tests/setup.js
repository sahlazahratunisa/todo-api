const mongoose = require('mongoose');
require('dotenv').config();

beforeAll(async () => {
  // Langsung terhubung ke MongoDB dari file .env (MongoDB Atlas)
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI tidak ditemukan di file .env');
  }
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  // Membersihkan data di database setelah setiap test selesai
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});