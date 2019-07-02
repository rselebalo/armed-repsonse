// require("dotenv").config();
const db = require("../config/dbConfig");
const Panic  = require("../models/Panic");

const handler = async req => {
  try {

    await db.connectToDatabase();

    // get all panics    
    const panics = await Panic.find().populate('client'); 

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        success: 1,
        message: { Panics: panics }
      })
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        success: 0,
        message: error.message
      })
    };
  }
};
module.exports = { handler };
