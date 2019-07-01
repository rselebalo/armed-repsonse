import axios from "axios";
import global from "../global";


const getPanicById = panicId =>
  new Promise(async (resolve, reject) => {
    try {
      const token = sessionStorage.getItem("idToken");
      const result = await axios.request({
        method: "GET",
        url: `${global.BASE_API_URL}/panic/${panicId}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json"
        },
        json: true
      });
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });

const getActivePanics = (status, skip, take) =>
  new Promise(async (resolve, reject) => {
    try {
      const headers = {
        Authorization: `Bearer ${sessionStorage.getItem("idToken")}`,
        "content-type": "application/json"
      };
      const result = await axios.get(
        `${
          global.BASE_API_URL
        }/getActivePanics/${status}/${skip}/${take}`,
        { headers }
      );
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });

const getAllPanics = (skip, take) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = sessionStorage.getItem("idToken");
      const result = await axios.request({
        method: "GET",
        url: `${
          global.BASE_API_URL
        }/getAllPanics/${skip}/${take}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json"
        },
        json: true
      });
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });

const updatePanic = panic =>
  new Promise(async (resolve, reject) => {
    try {
      
      const token = sessionStorage.getItem("idToken");
      const result = await axios.request({
        method: "PUT",
        url: `${global.BASE_API_URL}/updatePanic/${panic.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json"
        },
        data: panic,
        json: true
      });
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });

const panicSearch = textSearch =>
  new Promise(async (resolve, reject) => {
    try {
      const token = sessionStorage.getItem("idToken");
      const result = await axios.request({
        method: "GET",
        url: `${
          global.BASE_API_URL
        }/searchPanic/${textSearch}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json"
        },
        json: true
      });
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });

export default {
  getPanicById,
  getActivePanics,
  getAllPanics,
  updatePanic,
  panicSearch
};
