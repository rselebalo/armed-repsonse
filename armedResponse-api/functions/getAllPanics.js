'use strict';
"use strict";
require("dotenv").config();
const db = require("../config/dbConfig");
const Panic = require("../entity/Panic");
const _ = require("lodash");
const moment = require("moment");


const handler = async req => {
  try {

    const connection = await db.connectToDatabase();

    // get all panics
    
    const panics = await connection.getRepository(Panic).createQueryBuilder("panic")
    .leftJoinAndSelect("panic.client", "client")
    .getMany();    

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        success: 1,
        panics
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
