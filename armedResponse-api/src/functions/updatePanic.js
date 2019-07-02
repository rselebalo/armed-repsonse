"use strict";
require("dotenv").config();
const db = require("../config/dbConfig");
const Panic = require("../entity/Panic");
const _ = require("lodash");


const handler = async req => {
  try {
    const data = JSON.parse(req.body);
    const connection = await db.connectToDatabase();

    // update panic
    
    const panic = await connection.getRepository(Panic).findOne(data.id);
    panic.streetAddress = data.streetAddress;
    panic.longitude = data.longitude;
    panic.latitude = data.latitude;
    panic.active = data.active;
    panic.confirmed = data.confirmed;
    await connection.manager.save(panic);  
       

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
