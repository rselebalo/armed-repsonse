import 'reflect-metadata';
import { createConnection } from 'typeorm';

let isConnected;

const connectToDatabase = async () => {
  try {
    if (isConnected) {
      console.log("=> using existing database connection");
      return Promise.resolve();
    }

    console.log("=> using new database connection");
    const dbConnection = await createConnection();
    isConnected = db.connections[0].readyState;
    console.log("Connected...");

    return Promise.resolve(dbConnection);
  } catch (error) {
    return error.message;
  }
};
module.exports = { connectToDatabase };
