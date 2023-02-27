const router = require("express").Router();
let Posts = require("../../models/columnHide/mobitelDatabaseColumnHide.js");

router.route("/mobitelDatabaseColumnEdit").put(async (req, res) => {
  id = "63f87c8bc846ad5730c44cf8";

  Posts.findByIdAndUpdate(id, req.body)
    .then((Posts) => res.json(Posts))
    .catch((err) => res.status(422).json(err));
});

router.get("/MobitelDatabaseColumnGet", async function (req, res) {
  id = "63f87c8bc846ad5730c44cf8";

  Posts.findById(id)
    .then((Posts) => res.send(Posts))
    .catch((err) => res.status(422).json(err));
});

// add hide column object
// router.post("/mobitelDatabaseColumnAdd", (req, res) => {
//   let newPost = new Posts(req.body);

//   newPost.save((err, posts) => {
//     if (err) {
//       return res.status(400).json({
//         error: err,
//       });
//     }
//     return res.status(200).json({
//       //   success: "Project Details Added Successfully",
//       success: posts,
//     });
//   });
// });
module.exports = router;
