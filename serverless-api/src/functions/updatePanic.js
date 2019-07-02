"use strict";
const mongoose = require("mongoose");
const db = require("../config/dbConfig");
const Panic = require("../models/Panic");


const handler = async req => {
  try {
    const { id } = req.pathParameters;
    const data = JSON.parse(req.body);
    const connection = await db.connectToDatabase();

    // update panic
    
    const panic = await Panic.findByIdAndUpdate(mongoose.Types.ObjectId(id),
                    {
                      streetAddress:  data.streetAddress,
                      longitude: data.long,
                      latitude:  data.lat,
                      active:  data.active,
                      confirmed: data.confirmed
                  }).exec() 
       

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        success: 1,
        message: panic.id
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
