import Axios from "axios";
import global from "../global";

const createClient = (firstname, lastname, username, email, cellPhone) =>
  new Promise(async (resolve, reject) => {
    try {
        const token = sessionStorage.getItem("idToken");
      const user = await Axios.request({
        method: "POST",
        url: `${global.BASE_API_URL}/client`,
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json"
        },
        data: {
          email,
          cellPhone,
          name: `${firstname} ${lastname}`,
          
        },
        json: true
      });

      resolve(user.data);
    } catch (error) {
      console.log(error);
      reject(error.message);
    }
  });

const updateClientDetails = (clientId, firstname, lastname, email, cellPhone) =>
  new Promise(async (resolve, reject) => {
    try {
        const token = sessionStorage.getItem("idToken");

      const result = await Axios.request({
        method: "PATCH",
        url: `${global.BASE_API_URL}/client/${clientId}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json"
        },
        data: {
          name: `${firstname} ${lastname}`,
          cellPhone,
          email
        },
        json: true
      });

      resolve(result.data);
    } catch (error) {
      reject(error.message);
    }
  });

const getAllClients = () =>
  new Promise(async (resolve, reject) => {
    try {
        const token = sessionStorage.getItem("idToken");

      const clients = await Axios.request({
        method: "GET",
        url: `${global.BASE_API_URL}/clients`,
        withCredentials: false,
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json"
        },
        json: true
      });
      
      resolve(clients.data);
    } catch (error) {
      reject(error.message);
    }
  });


export default {
  createClient,
  getAllClients,
  updateClientDetails
};
