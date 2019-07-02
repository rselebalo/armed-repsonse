// const mongoose = require("mongoose-sql");
const GLOBAL = require("./global");
const mongoose = require("mongoose");
const Client = require("../models/Client");
const Panic = require("../models/Panic");
const Respondent = require("../models/Respondent");
let isConnected;

const connectToDatabase = async () => {
  try {
    if (isConnected) {
      console.log("=> using existing database connection");
      return Promise.resolve(isConnected);
    }

    console.log("=> using new database connection");
    // const db = await mongoose.connect({
    //   client: "pg",
    //   connection: {
    //     host: GLOBAL.db_host,
    //     user: GLOBAL.db_user,
    //     password: GLOBAL.db_password,
    //     database: GLOBAL.database
    //   }
    // });
    // isConnected = db.connection;
    const db = await mongoose.connect(GLOBAL.MONGO_URI, { useNewUrlParser: true });
    isConnected = db.connections[0].readyState;
    console.log("Connected...");    
    
    //seed database    
    const panic = await Panic.find();
    const client = await Client.find();
    const respondent = await Respondent.find();
    let clientList = [];

    if(client.length === 0 ){
      const clients = [{
        name: "Rethabile",
        email: "rethabileselebal@gmail.com ",
        cellPhone: "0664556577"
      },
      {
        name: "Stephanie",
        email: "steph_a@gmail.com ",
        cellPhone: "0839995465"
      },
      {
        name: "Kevin",
        email: "kevin@armedresponse.co.za ",
        cellPhone: "0782454656"
      },
      {
        name: "Mandre",
        email: "mand_re@gmail.com ",
        cellPhone: "06645565788"
      }];
      clientList = await Client.insertMany(clients);
    } else 
    clientList = client;

    if(respondent.length === 0 ){
      const respondents = [];
      await Respondent.insertMany(respondents);
    }
    if(panic.length === 0 ){
      const panics = [{
        streetAddress : "4 Grant Ave",
        longitude : 21.5268,
        latitude : -25.893,
        active : true,
        confirmed : true,
        client: clientList[0]._id
      },
      {
        streetAddress : "78 Houghton Drive",
        longitude : 21.5268,
        latitude : -25.567,
        active : true,
        confirmed : true,
        client: clientList[0]._id
      },
      {
        streetAddress : "8 Highfield Beacon Bay",
        longitude : 23.678787,
        latitude : -20.6767,
        active : true,
        confirmed : true,
        client: clientList[1]._id
      },
      {
        streetAddress : "12 Rivonia Ave",
        longitude : 26.456,
        latitude : -25.7890,
        active : true,
        confirmed : false,
        client: clientList[2]._id
      }];
      await Panic.insertMany(panics);
    }
    return Promise.resolve(isConnected);
  } catch (error) {
    return error.message;
  }
};
module.exports = { connectToDatabase };
