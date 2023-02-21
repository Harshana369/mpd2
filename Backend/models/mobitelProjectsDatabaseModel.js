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
    Task_Ref: {
      type: String,
      unique: true,
    },
    Site_Id: String,
    Site_Name: String,
    Handover: String,
    Project: String,
    Scope: String,
    Site_Engineer: String,
    Sub_Contractor: String,
    Task_Assigned: String,
    Task_Commenced: String,
    BOQ_Submit: String,
    BOQ_Approve: String,
    PR_Raise: String,
    //--------------------
    Task_Completed: {
      type: String,
      default: null,
    },
    Commission: {
      type: String,
      default: null,
    },
    Submit_PAT: {
      type: String,
      default: null,
    },
    PAT_Pass: {
      type: String,
      default: null,
    },
    Submit_SAR: {
      type: String,
      default: null,
    },
    SAR_Pass: {
      type: String,
      default: null,
    },
    On_air: {
      type: String,
      default: null,
    },
    Task_Category: {
      type: String,
      default: null,
    },
    Material_Return: {
      type: String,
      default: null,
    },
    PO_issue: {
      type: String,
      default: null,
    },
    Submit_Invoice: {
      type: String,
      default: null,
    },
    Approve_Invoice: {
      type: String,
      default: null,
    },
    Payment: {
      type: String,
      default: null,
    },
    PO_closure: {
      type: String,
      default: null,
    },
  },
  { _id: false }
);

const dataSchema = new mongoose.Schema({
  // headerproperties: [subSchemaheaderproperties],
  mobitelDatabasePropertys: [subSchemaproperties],
});

module.exports = mongoose.model("mobitelprojectsdatabase", dataSchema);
