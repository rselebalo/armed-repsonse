"use strict";
require("dotenv").config();
const db = require("../config/dbConfig");
const Client = require("../entity/Client");
const Panic = require("../entity/Panic");
const _ = require("lodash");
const moment = require("moment");


const handler = async req => {
  try {
    const data = JSON.parse(req.body);
    const connection = await db.connectToDatabase();

    // create new client
    const client = new Client();
    client.name = data.name;
    client.cellPhone = data.cellPhone;
    // client.dateRegistered = new Date();
    await connection.manager.save(client);    

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        success: 1,
        message: trans.id
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
