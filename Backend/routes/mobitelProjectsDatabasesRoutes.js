const router = require("express").Router();

const Posts = require("../models/mobitelProjectsDatabaseModel.js");

// ------------------get Deta for mobitelProjectDatabase-------------------------

router.get("/mobitelProjectsDatabasesSiteData", async (req, res, next) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: posts,
    });
  });
});

//---------------------post mobitelprojectsdatabasHeaders-------------------------------

router.post("/mobitelProjectsDatabaseHeaders", async (req, res, next) => {
  const data = req.body;

  try {
    Posts.updateOne(
      {
        $push: {
          headerproperties: { $each: data },
        },
      },
      (err, result) => {}
    );
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
