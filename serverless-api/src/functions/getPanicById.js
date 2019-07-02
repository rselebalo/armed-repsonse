'use strict';
const mongoose = require('mongoose');
const db = require("../config/dbConfig");
const Panic = require("../models/Panic");

const handler = async req => {
  try {

    const { id } = req.pathParameters;
    await db.connectToDatabase();

    const panic = await Panic.findById(mongoose.Types.ObjectId(id)).populate("client");
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        success: 1,
        message: panic
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
