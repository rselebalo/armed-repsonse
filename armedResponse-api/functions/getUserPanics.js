'use strict';
require("dotenv").config();
const db = require("../config/dbConfig");
const Client = require("../entity/Client");
const Panic = require("../entity/Panic");
const _ = require("lodash");
const moment = require("moment");


const handler = async req => {
  try {

    const userId = req.pathParameters.userId;
    const connection = await db.connectToDatabase();

    // get all panics
    
    // const panics = await connection.getRepository(Panic)
    // .createQueryBuilder("panic")
    // .leftJoinAndSelect("panic.client", "client")
    // .getMany();    

    const panics = await connection.getRespository(Panic).find({ client: { id: userId } });

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
