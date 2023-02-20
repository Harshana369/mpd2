const router = require("express").Router();
const cron = require("node-cron");
const { response } = require("express");
const axios = require("axios");

const DataModel = require("../models/boqSystemApiCallModel.js");

// cron.schedule("*/2 * * * *", () => boqCall());

// function boqCall() {
//   axios.get("http://localhost:3500/boq/getall").then((response) => {
//     // console.log(response.data.success[0].mobitelDatabasePropertys);
//     const data = response.data.success[0].mobitelDatabasePropertys;
//     // console.log(response.data.success[0].mobitelDatabasePropertys);

//     console.log(data);
//   });
// }

// const boqCall = async () => {
//   try {
//     const resp = await axios.get("http://localhost:3500/boq/getall");
//     // const data = resp.data.success[0];
//     resp.save();
//   } catch (err) {
//     // Handle Error Here
//     console.error(err);
//   }
// };

// const mobitelDatabasePropertys = [];

const retrieveData = async () => {
  try {
    const resp = await axios.get("http://localhost:3500/boq/getall");
    const mobitelDatabasePropertys =
      resp.data.success[0].mobitelDatabasePropertys;
    // console.log(data);
    await DataModel.deleteMany({});

    const newData = new DataModel({ mobitelDatabasePropertys });
    await newData.save();
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

cron.schedule("0 0 * * *", retrieveData);

// every day -> 0 0 * * *
//one mints -> */1 * * * *

module.exports = router;
