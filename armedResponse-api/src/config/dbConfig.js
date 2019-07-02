require('reflect-metadata');
const { createConnection } = require('typeorm');

let isConnected;
const connectToDatabase = async () => {
  try {
    if (isConnected) {
      console.log("=> using existing database connection");
      return Promise.resolve();
    }

    console.log("=> using new database connection");
    const dbConnection = await createConnection();
    isConnected = dbConnection.isConnected;
    console.log("Connected...");

    return Promise.resolve(dbConnection);
  } catch (error) {
    return error.message;
  }
};
module.exports = { connectToDatabase };
