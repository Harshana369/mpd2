const router = require("express").Router();

const Posts = require("../models/mobitelProjectsDatabaseModel.js");

// ------------------------- Posting sites data to the database  ---------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------

// router.post("/mobitelProjectsDatabases/save", (req, res) => {
//   let newPost = new Posts(req.body);

//   newPost.save((err, posts) => {
//     if (err) {
//       return res.status(400).json({
//         error: err,
//       });
//     }
//     return res.status(200).json({
//       success: "Project Details Added Successfully",
//     });
//   });
// });

//---------------------post mobitelprojectsdatabasHeaders-------------------------------

// router.post("/mobitelProjectsDatabaseHeaders", async (req, res, next) => {
//   const data = req.body;

//   try {
//     Posts.updateOne(
//       {
//         $push: {
//           headerproperties: { $each: data },
//         },
//       },
//       (err, result) => {}
//     );
//   } catch (err) {
//     console.log(err);
//   }
// });

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
//------------------------------------------------------------------------------------------

//----------------Getting Installation Pending Task data--------------------
router.get("/getInstalling", async (req, res, next) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      Installing: getInstalling(posts),
    });
  });
});

function getInstalling(posts) {
  return posts.filter((post) => post.Installation_Completed === null);
}

//-----------------------Update Installing Pending Task-----------------------------

router.route("/updateInstalling").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const date = new Date(formattedDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const yyyyMmDd = `${year}-${month}-${day}`;

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        Installation_Completed: yyyyMmDd,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//------------------------------------------------------------------------------------------

//----------------Getting Commissioning data--------------------
router.get("/getCommissioning", async (req, res, next) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      commissioning: getCommissiioning(posts),
    });
  });
});

function getCommissiioning(posts) {
  return posts.filter((post) => post.Commission === null);
}

//-----------------------Update Commissioning Pending Task-----------------------------
router.route("/updateCommissioning").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const date = new Date(formattedDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const yyyyMmDd = `${year}-${month}-${day}`;

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        Commission: yyyyMmDd,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//------------------------------------------------------------------------------------------

//----------------Getting Pat data--------------------
router.get("/getPat", async (req, res, next) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      Pat: getPat(posts),
    });
  });
});

function getPat(posts) {
  return posts.filter((post) => post.PAT_Pass === null);
}

//-----------------------Update Pat Pending Task-----------------------------

//------------------------Pss--------------------
router.route("/updatePat").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const date = new Date(formattedDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const yyyyMmDd = `${year}-${month}-${day}`;

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        PAT_Pass: yyyyMmDd,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//---------------------- Submitted--------------------

router.route("/updatePatSubmitted").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const date = new Date(formattedDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const yyyyMmDd = `${year}-${month}-${day}`;

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        Submit_PAT: yyyyMmDd,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//------------------------------------------------------------------------------------------

//---------------Getting Sar data--------------------
router.get("/getSar", async (req, res, next) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      Sar: getSar(posts),
    });
  });
});

function getSar(posts) {
  return posts.filter((post) => post.SAR_Pass === null);
}

//---------------------- Update Sar Submitted  Task--------------------

router.route("/updateSarSubmitted").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const formattedDate = today.toLocaleDateString("en-US", options);
  const date = new Date(formattedDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const yyyyMmDd = `${year}-${month}-${day}`;
  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        Submit_SAR: yyyyMmDd,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//-----------------------Update Sar Pass Task-----------------------------
router.route("/updateSarPass").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const date = new Date(formattedDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const yyyyMmDd = `${year}-${month}-${day}`;

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        SAR_Pass: yyyyMmDd,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//------------------------------------------------------------------------------------------

//-------------Getting OnAir data-----------------------

router.get("/getOnAir", async (req, res, next) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      OnAir: getOnAir(posts),
    });
  });
});

function getOnAir(posts) {
  return posts.filter((post) => post.On_air === null);
}

//-----------------------Update OnAir Pending Task-----------------------------
router.route("/updateOnAir").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const date = new Date(formattedDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const yyyyMmDd = `${year}-${month}-${day}`;

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        On_air: yyyyMmDd,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//------------------------------------------------------------------------------------------

//-------------Getting Material Return data-----------------------

router.get("/getMaterialReturn", async (req, res, next) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      MaterialReturn: getMaterialReturn(posts),
    });
  });
});

function getMaterialReturn(posts) {
  return posts.filter((post) => post.Material_Return === null);
}

//-----------------------Update MaterialReturn Pending Task-----------------------------
router.route("/updateMaterialReturn").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const date = new Date(formattedDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const yyyyMmDd = `${year}-${month}-${day}`;

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        Material_Return: yyyyMmDd,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//------------------------------------------------------------------------------------------

//-------------Getting Pr data-----------------------

router.get("/getPr", async (req, res, next) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      Pr: getPr(posts),
    });
  });
});

function getPr(posts) {
  return posts.filter((post) => post.PR_Raise === null);
}
//-----------------------Update Pr Pending Task-----------------------------
router.route("/updatePr").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const date = new Date(formattedDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const yyyyMmDd = `${year}-${month}-${day}`;

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        PR_Raise: yyyyMmDd,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//------------------------------------------------------------------------------------------

//-------------Getting Po data-----------------------
router.get("/getPo", async (req, res, next) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      Po: getPo(posts),
    });
  });
});

function getPo(posts) {
  return posts.filter((post) => post.PO_issue === null);
}

//-----------------------Update Po Pending Task-----------------------------
router.route("/updatePo").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const date = new Date(formattedDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const yyyyMmDd = `${year}-${month}-${day}`;

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        PO_issue: yyyyMmDd,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//------------------------------------------------------------------------------------------

//-------------Getting Invoice data-----------------------
router.get("/geInvoice", async (req, res, next) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      Invoice: getInvoice(posts),
    });
  });
});

function getInvoice(posts) {
  return posts.filter((post) => post.Submit_Invoice === null);
}

router.route("/updateInvoice").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const date = new Date(formattedDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const yyyyMmDd = `${year}-${month}-${day}`;

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        Submit_Invoice: yyyyMmDd,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//------------------------------------------------------------------------------------------

//-------------Getting Po Closure data-----------------------
router.get("/gePoClosure", async (req, res, next) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      PoClosure: getPoClosure(posts),
    });
  });
});

function getPoClosure(posts) {
  return posts.filter((post) => post.PO_closure === null);
}

router.route("/updatePoClosure").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const date = new Date(formattedDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const yyyyMmDd = `${year}-${month}-${day}`;

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        PO_closure: yyyyMmDd,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

router.get("/mobitelProjectsDatabasesPendingTasks", async (req, res, next) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      InstallationPendingTasks: getInstallationPendingTasks(posts),
      CommissioningPendingTasks: getCommissioningPendingTasks(posts),
      PatPendingTasks: getPatPendingTasks(posts),
      SarPendingTasks: getSarPendingTasks(posts),
      OnAirPendingTasks: getOnAirPendingTasks(posts),
      MaterialReturnPendingTasks: getMaterialReturnPendingTask(posts),
      PrPendingTasks: getPrPendingTasks(posts),
      PoPendingTasks: getPoPendingTasks(posts),
      InvoicePendingTasks: getInvoicePendingTasks(posts),
      PoClosurePendingTasks: getPoClosurePendingTasks(posts),
    });
  });
});

function getInstallationPendingTasks(posts) {
  let InstallationPendingTasks = [];

  InstallationPendingTasks = posts.filter(
    (post) => post.Installation_Completed === null
  );

  return InstallationPendingTasks.length;
}

function getCommissioningPendingTasks(posts) {
  let CommissioningPendingTasks = [];

  CommissioningPendingTasks = posts.filter((post) => post.Commission === null);

  return CommissioningPendingTasks.length;
}
function getPatPendingTasks(posts) {
  let PatPendingTasks = [];

  PatPendingTasks = posts.filter((post) => post.PAT_Pass === null);

  return PatPendingTasks.length;
}

function getSarPendingTasks(posts) {
  let SarPendingTasks = [];

  SarPendingTasks = posts.filter((post) => post.SAR_Pass === null);

  return SarPendingTasks.length;
}

function getOnAirPendingTasks(posts) {
  let OnAirPendingTasks = [];
  OnAirPendingTasks = posts.filter((post) => post.On_air === null);
  return OnAirPendingTasks.length;
}

function getMaterialReturnPendingTask(posts) {
  let MaterialReturnPendingTasks = [];

  MaterialReturnPendingTasks = posts.filter(
    (post) => post.Material_Return === null
  );
  return MaterialReturnPendingTasks.length;
}

function getPrPendingTasks(posts) {
  let PrPendingTasks = [];

  PrPendingTasks = posts.filter((post) => post.PR_Raise === null);

  return PrPendingTasks.length;
}

function getPoPendingTasks(posts) {
  let PoPendingTasks = [];

  PoPendingTasks = posts.filter((post) => post.PO_issue === null);

  return PoPendingTasks.length;
}

function getInvoicePendingTasks(posts) {
  let InvoicePendingTasks = [];

  InvoicePendingTasks = posts.filter((post) => post.Submit_Invoice === null);

  return InvoicePendingTasks.length;
}

function getPoClosurePendingTasks(posts) {
  let PoClosurePendingTasks = [];

  PoClosurePendingTasks = posts.filter((post) => post.PO_closure === null);

  return PoClosurePendingTasks.length;
}

//--------------------------------------------

router.get("/mobitelProjectsDatabases", async (req, res, next) => {
  const projectName = req.query.Project;

  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    return res.status(200).json({
      success: true,
      projectsScopeDataCount: getProjectsScopeDataCount(posts, projectName),
      projectsHandOverDataCount: getProjectsHandOverDataCount(
        posts,
        projectName
      ),
      projectsPatDataCount: getProjectsPatDataCount(posts, projectName),
      projectsOnAirDataCount: getProjectsOnAirDataCount(posts, projectName),
      //   HoldSitesDataforSquares: getHoldSitesData(posts),
      projectScopeData: getProjectScopeData(posts, projectName),
      projectHandOverData: getProjectsHandOverData(posts, projectName),
      projectsPatData: getProjectsPatData(posts, projectName),
      projectsOnAirData: getProjectsOnAirData(posts, projectName),
    });
  });
});

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for Getting Get Scope Data to the Front End Squares of Mobitel Projects ---------------------
//---------------------------------------------------------------------------------------------------------------------------

function getProjectsScopeDataCount(posts, projectName) {
  var ScopeDataCount = [];

  if (projectName === "All Projects") {
    ScopeDataCount.push(posts.filter((obj) => obj.Scope !== null).length);
    return ScopeDataCount;
  } else {
    ScopeDataCount.push(
      posts
        .filter((obj) => obj.Project === projectName)
        .filter((obj) => obj.Scope !== null).length
    );
  }

  //   console.log(ScopeDataCount);
  return ScopeDataCount;
}

function getProjectScopeData(posts, projectName) {
  var scopeData = [];

  if (projectName === "All Projects") {
    scopeData.push(...posts.filter((obj) => obj.Scope !== null));

    return scopeData;
  } else {
    scopeData.push(
      ...posts
        .filter((obj) => obj.Project === projectName)
        .filter((obj) => obj.Scope !== null)
    );
  }

  //   console.log(scopeData);
  return scopeData;
}

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for Getting Handover Data to the Front End Squares of Mobitel Projects ---------------------
//---------------------------------------------------------------------------------------------------------------------------

function getProjectsHandOverDataCount(posts, projectName) {
  var handOverDataCount = [];

  if (projectName === "All Projects") {
    handOverDataCount.push(posts.filter((obj) => obj.Handover !== null).length);

    return handOverDataCount;
  } else {
    handOverDataCount.push(
      posts
        .filter((obj) => obj.Project === projectName)
        .filter((obj) => obj.Handover !== null).length
    );
  }

  //   console.log(handOverDataCount);
  return handOverDataCount;
}

function getProjectsHandOverData(posts, projectName) {
  var handOverData = [];

  if (projectName === "All Projects") {
    handOverData.push(...posts.filter((obj) => obj.Handover !== null));

    return handOverData;
  } else {
    handOverData.push(
      ...posts
        .filter((obj) => obj.Project === projectName)
        .filter((obj) => obj.Handover !== null)
    );
  }

  //   console.log(handOverData);
  return handOverData;
}

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for Getting Pat Pass Data to the Front End Squares of Mobitel Projects ---------------------
//---------------------------------------------------------------------------------------------------------------------------

function getProjectsPatDataCount(posts, projectName) {
  var patPassDataCount = [];

  if (projectName === "All Projects") {
    patPassDataCount.push(posts.filter((obj) => obj.PAT_Pass !== null).length);

    return patPassDataCount;
  } else {
    patPassDataCount.push(
      posts
        .filter((obj) => obj.Project === projectName)
        .filter((obj) => obj.PAT_Pass !== null).length
    );
  }
  //   console.log(patPassDataCount);
  return patPassDataCount;
}

function getProjectsPatData(posts, projectName) {
  var patPassData = [];

  if (projectName === "All Projects") {
    patPassData.push(...posts.filter((obj) => obj.PAT_Pass !== null));

    return patPassData;
  } else {
    patPassData.push(
      ...posts
        .filter((obj) => obj.Project === projectName)
        .filter((obj) => obj.PAT_Pass !== null)
    );
  }

  //   console.log(patPassData);
  return patPassData;
}

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for Getting Get On Air Data to the Front End Squares of Mobitel Projects ---------------------
//---------------------------------------------------------------------------------------------------------------------------

function getProjectsOnAirDataCount(posts, projectName) {
  var OnAirDataCount = [];

  if (projectName === "All Projects") {
    OnAirDataCount.push(posts.filter((obj) => obj.On_air !== null).length);

    return OnAirDataCount;
  } else {
    OnAirDataCount.push(
      posts
        .filter((obj) => obj.Project === projectName)
        .filter((obj) => obj.On_air !== null).length
    );
  }
  //   console.log(OnAirDataCount);
  return OnAirDataCount;
}

function getProjectsOnAirData(posts, projectName) {
  var onAirData = [];

  if (projectName === "All Projects") {
    onAirData.push(...posts.filter((obj) => obj.On_air !== null));

    return onAirData;
  } else {
    onAirData.push(
      ...posts
        .filter((obj) => obj.Project === projectName)
        .filter((obj) => obj.On_air !== null)
    );
  }

  //   console.log(onAirData);
  return onAirData;
}

// ------------------------------------------------------------------------------------------------------------------
// --------------------------  Get projects name array  -------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------

router.get("/mobitelProjectsOverviewTable/ProjectsArray", (req, res) => {
  Posts.find().exec((err, mobitelProjects) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      mobitelProjectsNamesArray: getProjectsNamesArray(mobitelProjects),
    });
  });
});

function getProjectsNamesArray(mobitelProjects) {
  var projectsNamesArray = [];

  const uniqueProjects = mobitelProjects
    .map((project) => project.Project)
    .filter((project, index, projects) => projects.indexOf(project) === index);

  for (let i = 0; i < uniqueProjects.length; i++) {
    projectsNamesArray.push({
      value: uniqueProjects[i],
      label: uniqueProjects[i],
    });
  }
  return projectsNamesArray;
}

//------------------------------------------------Mobitel Projects Database Excell Upload ---------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

router.post("/mobitelProjectsDatabasesExcell/upload", (req, res) => {
  const newPost = req.body;
  async function run() {
    try {
      const options = { ordered: true };
      const result = await Posts.insertMany(newPost, options);
      return res.status(200).json({
        success: `${newPost.length} Projects Added Successfully !`,
      });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({
          error: "Planning ID must be a unique value !",
        });
      } else {
        return res.status(400).json({
          error: err,
        });
      }
    }
  }
  run();
});

//------------------------------------------------------Get Site Data to The ColumnChart---------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

router.get(
  "/mobitelProjectsDatabasesChartDataColumnChartData",
  async (req, res, next) => {
    let reqQuery = [];
    if (req.query.Project === "All Projects") {
      reqQuery = {};
    } else {
      reqQuery = { ...req.query };
    }

    let queryStr = JSON.stringify(reqQuery);
    Posts.find(JSON.parse(queryStr)).exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }

      return res.status(200).json({
        success: true,
        columnChartData: getchartData(posts), // Graph data of number of sites Mobilized in each month sending to front end Appwebsitevisits.
        XaxisDataForTheGraphs: getXaxisData(), // x axis data labels array sending to the Column graghs front end.
        ProjectCompletionForFrontEnd: getProjectCompletionData(posts), // Data for Front end Mobitel Projects Insights project Completion Donut Graph.
        // weeklyProgressDataForFrontEnd: getWeeklyProgressData(posts), // Data for Front end Mobitel Projects Insights Weekly Progress Graph.
        // WeeklyProgressOnAirSitesData: getWeeklyProgressOnAirSitesData(posts), // Data for Front end Mobitel Projects Insights Weekly Progress Graph Tool tip.
      });
    });
  }
);

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for X Axis Labels to the Front End of Vendor Project Databases ---------------------------
//---------------------------------------------------------------------------------------------------------------------------

function getXaxisData() {
  var theMonths = new Array(
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  );

  var monthsArray = [];
  var d = new Date();
  d.setDate(1);
  for (i = 0; i <= 11; i++) {
    monthsArray.push(theMonths[d.getMonth()] + "/01/" + d.getFullYear());
    d.setMonth(d.getMonth() - 1);
  }

  monthsArray.reverse();

  var XaxisMonths = monthsArray;

  //   console.log(monthsArray);
  return XaxisMonths;
}

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Functions for Getting Graph Data to the Front End of Mobitel Project Databases ----------------------
//---------------------------------------------------------------------------------------------------------------------------

function getchartData(posts) {
  var installedData = [];
  var commissioned = [];
  var sarData = [];
  var patData = [];
  var onairData = [];

  var theMonths = new Array(
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  );
  var now = new Date();

  for (var i = 0; i < 12; i++) {
    var future = new Date(now.getFullYear(), now.getMonth() - i, 1);
    var month = theMonths[future.getMonth()];
    var year = future.getFullYear();
    var monthsArrayReversed = [];
    var monthsCountFrom2015 = (year - 2014) * 12;

    for (var i = 0; i < monthsCountFrom2015; i++) {
      monthsArrayReversed.push(
        now.getFullYear().toString() + "-" + theMonths[now.getMonth()]
      );
      now.setMonth(now.getMonth() - 1);
    }
    monthsArrayReversed.reverse();
  }

  let monthsArray = monthsArrayReversed;
  // console.log(monthsArray);
  // monthsArray = ['2021-02', '2021-03','2021-04', '2021-05','2021-06', '2021-07','2021-08', '2021-09','2021-10', '2021-11','2021-12', '2022-01']
  // console.log(monthsCountFrom2015);
  for (var i = 0; i < monthsCountFrom2015; i++) {
    (installedData[i] = posts
      .filter((obj) => obj.Installation_Completed !== null)
      .filter(
        (obj) => obj.Installation_Completed.slice(0, 7) === monthsArray[i]
      ).length),
      (commissioned[i] = posts
        .filter((obj) => obj.Commission !== null)
        .filter((obj) => obj.Commission.slice(0, 7) === monthsArray[i]).length),
      (sarData[i] = posts
        .filter((obj) => obj.SAR_Pass !== null)
        .filter((obj) => obj.SAR_Pass.slice(0, 7) === monthsArray[i]).length),
      (patData[i] = posts
        .filter((obj) => obj.PAT_Pass !== null)
        .filter((obj) => obj.PAT_Pass.slice(0, 7) === monthsArray[i]).length),
      (onairData[i] = posts
        .filter((obj) => obj.On_air !== null)
        .filter((obj) => obj.On_air.slice(0, 7) === monthsArray[i]).length);
  }
  // ----------------------------------------------------------------------------------------------------------------------------------------------

  let myarray2 = installedData,
    cumilative2 = [];
  let myarray3 = commissioned,
    cumilative3 = [];
  let myarray4 = sarData,
    cumilative4 = [];
  let myarray5 = patData,
    cumilative5 = [];
  let myarray6 = onairData,
    cumilative6 = [];

  for (let i = 0, s = myarray2[0]; i < myarray2.length; i++, s += myarray2[i])
    cumilative2.push(s);
  for (let i = 0, s = myarray3[0]; i < myarray3.length; i++, s += myarray3[i])
    cumilative3.push(s);
  for (let i = 0, s = myarray4[0]; i < myarray4.length; i++, s += myarray4[i])
    cumilative4.push(s);
  for (let i = 0, s = myarray5[0]; i < myarray5.length; i++, s += myarray5[i])
    cumilative5.push(s);
  for (let i = 0, s = myarray6[0]; i < myarray6.length; i++, s += myarray6[i])
    cumilative6.push(s);

  let chartData = [];
  let LastYearCum6 = cumilative6.slice(
    cumilative6.length - 13,
    cumilative6.length - 1
  ); // On air
  let LastYearCum5 = cumilative5.slice(
    cumilative5.length - 13,
    cumilative5.length - 1
  );
  let LastYearCum4 = cumilative4.slice(
    cumilative4.length - 13,
    cumilative4.length - 1
  );
  let LastYearCum3 = cumilative3.slice(
    cumilative3.length - 13,
    cumilative3.length - 1
  );
  let LastYearCum2 = cumilative2.slice(
    cumilative2.length - 13,
    cumilative2.length - 1
  );

  chartData.push(
    { name: "On Air", type: "column", data: LastYearCum6 },
    { name: "PAT", type: "column", data: LastYearCum5 },
    { name: "SAR", type: "column", data: LastYearCum4 },
    { name: "Commisioned", type: "column", data: LastYearCum3 },
    { name: "Installed", type: "column", data: LastYearCum2 }
  );

  //console.log(chartData);
  return chartData;
}

//---------------------------------------------------------------------------------------------------------------------------
//--------Function for Getting Project Cpmpletion Data to the Front End Mobitel Projects Insights Project Completion Donut---
//---------------------------------------------------------------------------------------------------------------------------

function getProjectCompletionData(posts) {
  (onAirSites = getOnAirData(posts)), (handOverSites = getHandOverData(posts));

  const projectCompletionChartData = [];
  const completed = onAirSites;
  const pending = handOverSites - onAirSites;
  const hold = 0;

  projectCompletionChartData.push(completed, pending, hold);

  //console.log(projectCompletionChartData);
  return projectCompletionChartData;
}

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for Getting Get On Air Data to the Front End Squares of Mobitel Projects ---------------------
//---------------------------------------------------------------------------------------------------------------------------

function getOnAirData(posts) {
  var OnAirData = [];

  OnAirData = posts.filter((obj) => obj.On_air !== null).length;
  //console.log(OnAirData);
  return OnAirData;
}

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for Getting Handover Data to the Front End Squares of Mobitel Projects ---------------------
//---------------------------------------------------------------------------------------------------------------------------

function getHandOverData(posts) {
  var handOverData = [];

  handOverData.push(posts.filter((obj) => obj.Handover !== null).length);

  //console.log(handOverData);
  return handOverData;
}

module.exports = router;

//---------------------------------------------------------------------------------------------------------------------------
//---------- Functions for Getting Last Week Progress Graph Data to the Front End of Mobitel Project Databases Insights------
//---------------------------------------------------------------------------------------------------------------------------

function getWeeklyProgressData(posts) {
  var onairData = [];
  var onairTargetData = [];

  var lastWeekDates = [];
  var yesterdayDate = [];
  var yesterdayMonth = [];
  var yesterdayYear = [];

  for (var i = 0; i < 7; i++) {
    yesterdayDate[i] = new Date(
      new Date().setDate(new Date().getDate() - i)
    ).getDate();
    yesterdayMonth[i] = (
      "0" +
      (new Date(new Date().setDate(new Date().getDate() - i)).getMonth() + 1)
    ).slice(-2);
    yesterdayYear[i] = new Date(
      new Date().setDate(new Date().getDate() - i)
    ).getFullYear();

    lastWeekDates[i] =
      yesterdayYear[i] + "-" + yesterdayMonth[i] + "-" + yesterdayDate[i];
  }
  lastWeekDates.reverse();

  // console.log(lastWeekDates);
  // lastWeekDates = ['2022-01-10','2022-01-11','2022-01-12','2022-01-13','2022-01-14','2022-01-15','2022-01-16']

  for (var i = 0; i < 7; i++) {
    onairData[i] = posts.filter(
      (obj) => obj.On_air === lastWeekDates[i]
    ).length;
    onairTargetData[i] = posts.filter(
      (obj) => obj.On_Air_Target === lastWeekDates[i]
    ).length;
  }
  // ----------------------------------------------------------------------------------------------------------------------------------------------
  // console.log(onairData);

  let onAirArray = onairData;
  let onAirTargetArray = onairTargetData;
  // console.log(onAirArray);

  let weeklyProgressData = [];
  weeklyProgressData.push(
    { name: "Completed", type: "column", data: onAirArray },
    { name: "Targeted", type: "column", data: onAirTargetArray }
  );

  // console.log(weeklyProgressData);
  return weeklyProgressData;
}

//---------------------------------------------------------------------------------------------------------------------------
//---------- Functions for Last Week Progress On Air Sites Data to the Front End of Mobitel Project Databases Insights-------
//---------------------------------------------------------------------------------------------------------------------------

function getWeeklyProgressOnAirSitesData(posts) {
  var lastWeekDates = [];
  var yesterdayDate = [];
  var yesterdayMonth = [];
  var yesterdayYear = [];

  for (var i = 0; i < 7; i++) {
    yesterdayDate[i] = new Date(
      new Date().setDate(new Date().getDate() - i)
    ).getDate();
    yesterdayMonth[i] = (
      "0" +
      (new Date(new Date().setDate(new Date().getDate() - i)).getMonth() + 1)
    ).slice(-2);
    yesterdayYear[i] = new Date(
      new Date().setDate(new Date().getDate() - i)
    ).getFullYear();

    lastWeekDates[i] =
      yesterdayYear[i] + "-" + yesterdayMonth[i] + "-" + yesterdayDate[i];
  }
  lastWeekDates.reverse();
  // console.log(lastWeekDates);
  // lastWeekDates = ['2022-01-10','2022-01-11','2022-01-12','2022-01-13','2022-01-14','2022-01-15','2022-01-16']

  var onairData = [];
  var weeklyOnAirSitesID = [];
  var onairSitesId1 = [];
  var onairSitesId2 = [];
  var onairSitesId3 = [];
  var onairSitesId4 = [];
  var onairSitesId5 = [];
  var onairSitesId6 = [];
  var onairSitesId7 = [];

  if (projectName === "All Projects") {
    for (var i = 0; i < 7; i++) {
      onairData[i] = posts.filter(
        (obj) => obj.On_air === lastWeekDates[i]
      ).length;
    }
    // console.log(onairData);
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    for (var j = 0; j < onairData[0]; j++) {
      onairSitesId1.push(
        posts
          .filter((obj) => obj.On_air === lastWeekDates[0])
          .filter((obj) => obj.Site_Id)[j].Site_Id
      );
    }
    for (var j = 0; j < onairData[1]; j++) {
      onairSitesId2.push(
        posts
          .filter((obj) => obj.On_air === lastWeekDates[1])
          .filter((obj) => obj.Site_Id)[j].Site_Id
      );
    }
    for (var j = 0; j < onairData[2]; j++) {
      onairSitesId3.push(
        posts
          .filter((obj) => obj.On_air === lastWeekDates[2])
          .filter((obj) => obj.Site_Id)[j].Site_Id
      );
    }
    for (var j = 0; j < onairData[3]; j++) {
      onairSitesId4.push(
        posts
          .filter((obj) => obj.On_air === lastWeekDates[3])
          .filter((obj) => obj.Site_Id)[j].Site_Id
      );
    }
    for (var j = 0; j < onairData[4]; j++) {
      onairSitesId5.push(
        posts
          .filter((obj) => obj.On_air === lastWeekDates[4])
          .filter((obj) => obj.Site_Id)[j].Site_Id
      );
    }
    for (var j = 0; j < onairData[5]; j++) {
      onairSitesId6.push(
        posts
          .filter((obj) => obj.On_air === lastWeekDates[5])
          .filter((obj) => obj.Site_Id)[j].Site_Id
      );
    }
    for (var j = 0; j < onairData[6]; j++) {
      onairSitesId7.push(
        posts
          .filter((obj) => obj.On_air === lastWeekDates[6])
          .filter((obj) => obj.Site_Id)[j].Site_Id
      );
    }
  }
  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  weeklyOnAirSitesID.push(
    onairSitesId1,
    onairSitesId2,
    onairSitesId3,
    onairSitesId4,
    onairSitesId5,
    onairSitesId6,
    onairSitesId7
  );

  //console.log(projectName);
  return weeklyOnAirSitesID;
}
