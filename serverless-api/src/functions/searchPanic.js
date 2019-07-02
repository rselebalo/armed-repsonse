"use strict";
const db = require("../config/dbConfig");
const Panic = require("../models/Panic");


const handler = async req => {
  try {
    const { searchTerm } = req.pathParameters;
    await db.connectToDatabase();

    // update panic
    
    const panics = await Panic.find({
      $or: [
        { "client.Cellphone": { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
        { streetAddress: { $regex: searchTerm, $options: "i" } },
        { "client.name": { $regex: searchTerm, $options: "i" } } ]
    }).populate("client").exec() 
       

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        success: 1,
        message: panics
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
