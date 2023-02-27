const router = require("express").Router();
const cron = require("node-cron");
const axios = require("axios");

const Posts = require("../models/mobitelProjectsDatabaseModel.js");
const retrieveData = async () => {
  const A = [];
  const B = [];
  try {
    const resp = await axios.get("http://35.78.68.113:27017/boq/getall");
    const A = resp.data.success[0].mobitelDatabasePropertys;
    const data = await Posts.findOne();

    // console.log(A);
    const B = data.mobitelDatabasePropertys;
    const id = data._id;

    const bIds = new Set(B.map((obj) => obj.Task_Ref));
    const mobitelDatabasePropertys = A.filter((obj) => !bIds.has(obj.Task_Ref));

    console.log(mobitelDatabasePropertys);

    Posts.updateOne(
      {
        $push: {
          mobitelDatabasePropertys: { $each: mobitelDatabasePropertys },
        },
      },
      (err, result) => {}
    );
    // console.log(id);
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

cron.schedule("*/5 * * * *", retrieveData);

// every day -> 0 0 * * *
//one mints -> */1 * * * *

module.exports = router;
