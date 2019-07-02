"use strict";
require("dotenv").config();
const db = require("../config/dbConfig");
const Client = require("../models/Client");
const Panic = require("../models/Panic");
// const _ = require("lodash");
// const moment = require("moment");


const handler = async req => {
  try {
    const data = JSON.parse(req.body);
    const connection = await db.connectToDatabase();

    // create panic
    
    const client = await Client.findOne({ id: data.id });
    const panic = new Panic();
    panic.streetAddress = data.streetAddress;
    panic.longitude = data.longitude;
    panic.latitude = data.latitude;
    panic.client = client;
    await connection.manager.save(panic);  
    
    client.panics.push(panic);
    await connection.manager.save(client);    

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
