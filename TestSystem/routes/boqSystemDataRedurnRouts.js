const router = require("express").Router();
const Posts = require("../models/boqSystemDataRedurnModel");

router.post("/", (req, res) => {
  let newPost = new Posts(req.body);

  newPost.save((err) => {
    console.log(err);
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: Posts,
    });
  });
});

router.get("/getall", async (req, res, next) => {
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

module.exports = router;
