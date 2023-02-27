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

//-----------------------Update Pending Task-----------------------------

router.route("/updatePendingTask").put(async (req, res) => {
  const Tf = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);

  const artist = await Posts.updateOne(
    { "mobitelDatabasePropertys.Task_Ref": `${Tf}` },
    {
      $set: {
        "mobitelDatabasePropertys.$.Installation_Completed": formattedDate,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//---------------Getting data only in Pending Tasks-----------

router.get("/getPendingTasks", async (req, res, next) => {
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

//----------------Getting Installation data--------------------

router.get("/getInstalling", async (req, res, next, posts) => {
  try {
    const filteredArray = posts.MobitelDatabsPrapertys.filter((object) => {
      return object.propertyName === desiredValue;
    });
  } catch (err) {
    next(err);
  }
});

// function getInstalling(posts) {
//   return posts
//     .filter((post) => post.mobileDatabaseProperties !== undefined)
//     .map((post) =>
//       post.mobileDatabaseProperties.filter(
//         (obj) => obj.Installation_Completed === null
//       )
//     )
//     .flat();
// }

//----------------Getting Commissioning data--------------------
router.get("/getCommissioning", async (req, res, next) => {
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

//----------------Getting Pat data--------------------
router.get("/getPat", async (req, res, next) => {
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

//---------------Getting Sar data--------------------

router.get("/getSar", async (req, res, next) => {
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

//-------------Getting OnAir data-----------------------

router.get("/getOnAir", async (req, res, next) => {
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

//-------------Getting Material Return data-----------------------

router.get("/getMaterialReturn", async (req, res, next) => {
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

//-------------Getting Pr data-----------------------

router.get("/getPr", async (req, res, next) => {
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

//-------------Getting Po data-----------------------
router.get("/getPo", async (req, res, next) => {
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
//-------------Getting Po data-----------------------
router.get("/geInvoice", async (req, res, next) => {
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

//-------------Getting Po data-----------------------
router.get("/gePoClosure", async (req, res, next) => {
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
