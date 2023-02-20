const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

// const reqDate = {
//   type: Date,
//   require: true,
// };

// const date = {
//   type: Date,
// };

// const subSchemaHeaders = new mongoose.Schema({}, { _id: false });

const subSchemaPropertys = new mongoose.Schema(
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
  // mobitelDatabaseHeaders: {
  //   type: [subSchemaHeaders],
  //   require: true,
  // },
  mobitelDatabasePropertys: {
    type: [subSchemaPropertys],
    require: true,
  },
});

const Boq = mongoose.model("boqsystemdatareturn", dataSchema);

module.exports = Boq;
