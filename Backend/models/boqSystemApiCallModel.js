const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const reqDate = {
  type: Date,
  require: true,
};

// const subSchemaheaderproperties = new mongoose.Schema({
//   title: reqString,
//   field: reqString,
// });

const subSchemaproperties = new mongoose.Schema(
  {
    Task_Ref: reqString,
    Site_Id: reqString,
    Site_Name: reqString,
    Handover: reqString,
    Project: reqString,
    Scope: reqString,
    Site_Engineer: reqString,
    Sub_Contractor: reqString,
    Task_Assigned: reqString,
    Task_Commenced: reqString,
    BOQ_Submit: reqString,
    BOQ_Approve: reqString,
    PR_Raise: reqString,
  },
  { _id: false }
);

const dataSchema = new mongoose.Schema({
  // headerproperties: [subSchemaheaderproperties],
  mobitelDatabasePropertys: [subSchemaproperties],
});

module.exports = mongoose.model("boqdatacollection", dataSchema);
