import react, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'react-native-crypto-js';
import { Link as RouterLink, useNavigate, Navigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Icon } from '@iconify/react';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import { Grid, Button, Card, Container, Stack, Typography, Chip } from '@mui/material';
import ExcellTemplate from '../../../../_mocks_/SampleExcellTemplate.xlsx';
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable global-require */
/* eslint-disable valid-typeof */

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 10,
    fontWeight: 0.5,
    backgroundColor: '#000000',
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,
    fontWeight: 0.4,
    color: theme.palette.common.white
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#161747'
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#161747'
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const Input = styled('input')({
  display: 'none'
});

function UploadExcellData() {
  const navigate = useNavigate();
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

  const [items, setItems] = useState([]);
  const [file, setFile] = useState([]);

  const [currentUser, setcurrentUser] = useState('');

  const [validationErrorMessage, setvalidationErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [validationError, setvalidationError] = useState('');
  const [dateValidationError, setDateValidationError] = useState('');
  const [tablecelColor, settablecelColor] = useState('#ffffff');

  // const [projectNameValidation, setProjectNameValidation] = useState();
  // const [projectNamevalidationError, setProjectNamevalidationError] = useState('');

  const [mobilizationStatusError, setMobilizationStatusError] = useState('');
  const [installationStatusError, setInstallationStatusError] = useState('');
  const [commissioningStatusError, setCommissioningStatusError] = useState('');
  const [sarStatusError, setSARStatusError] = useState('');
  const [patStatusError, setPATStatusError] = useState('');
  const [onAirStatusError, setOnAirStatusError] = useState('');

  const changeFileHandler = () => {
    setItems([]);
  };

  const errorHandler = () => {
    for (let i = 0; i < items.length; i += 1) {
      if (
        !items[i].Task_Ref ||
        !items[i].Site_Id ||
        !items[i].Site_Name ||
        !items[i].Handover ||
        !items[i].Project ||
        !items[i].Scope ||
        !items[i].Site_Engineer ||
        !items[i].Sub_Contractor ||
        !items[i].Task_Category ||
        !items[i].Task_Assigned ||
        !items[i].Task_Commenced ||
        !items[i].Installation_Completed ||
        !items[i].Commission ||
        !items[i].Submit_PAT ||
        !items[i].PAT_Pass ||
        !items[i].Submit_SAR ||
        !items[i].SAR_Pass ||
        !items[i].On_air ||
        !items[i].BOQ_Submit ||
        !items[i].BOQ_Approve ||
        !items[i].PR_Raise ||
        !items[i].Material_Return ||
        !items[i].PO_issue ||
        !items[i].Submit_Invoice ||
        !items[i].Approve_Invoice ||
        !items[i].Payment ||
        !items[i].PO_closure
      ) {
        setvalidationError('Validation Error!');
        setvalidationErrorMessage(
          'Please fill all the mandatorily required fields before submit !'
        );
        settablecelColor('#FF0000');
        setTimeout(() => {
          setvalidationErrorMessage('');
        }, 10000);
      } else if (!validationError) {
        // console.log('No validation err!');
      }
    }
  };

  const Formatter = () => {
    // Date validation
    for (let i = 0; i < items.length; i += 1) {
      // ------------------------- Task_Ref -------------------------------
      if (items[i].Task_Ref) {
        if (items[i].Task_Ref !== null) {
          setSuccessMessage('Your Excell is ready to upload !');
        }
      } else {
        setDateValidationError('Task_Ref is empty !');
        setvalidationErrorMessage('Task_Ref input is empty.');
        setTimeout(() => {
          setvalidationErrorMessage('');
        }, 8000);
      }

      if (items[i].Site_Id) {
        if (items[i].Site_Id !== null) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else {
          setDateValidationError('Site_Id is empty !');
          setvalidationErrorMessage('Site_Id input is empty.');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      }

      if (items[i].Site_Name) {
        if (items[i].Site_Name !== null) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else {
          setDateValidationError('Site_Name is empty !');
          setvalidationErrorMessage('Site_Name input is empty.');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      }

      // ------------------------- Handover --------------------------------------
      if (items[i].Handover) {
        if (
          Number.isNaN(Number(items[i].Handover.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Handover.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Handover.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Handover.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Handover.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Handover.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Handover Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      if (items[i].Project) {
        if (items[i].Project !== null) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else {
          setDateValidationError('Project is empty !');
          setvalidationErrorMessage('Project input is empty.');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      }

      if (items[i].Scope) {
        if (items[i].Scope !== null) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else {
          setDateValidationError('Scope is empty !');
          setvalidationErrorMessage('Scope input is empty.');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      }

      if (items[i].Site_Engineer) {
        if (items[i].Site_Engineer !== null) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else {
          setDateValidationError('Site_Engineer is empty !');
          setvalidationErrorMessage('Site_Engineer input is empty.');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      }

      if (items[i].Sub_Contractor) {
        if (items[i].Sub_Contractor !== null) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else {
          setDateValidationError('Sub_Contractor is empty !');
          setvalidationErrorMessage('Sub_Contractor input is empty.');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      }

      // ------------------------- Installation_Completed -----------------------------
      if (items[i].Installation_Completed) {
        if (
          Number.isNaN(Number(items[i].Installation_Completed.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Installation_Completed.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Installation_Completed.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Installation_Completed.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Installation_Completed.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Installation_Completed.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Installation_Completed Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Commission -------------------------------
      if (items[i].Commission) {
        if (
          Number.isNaN(Number(items[i].Commission.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Commission.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Commission.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Commission.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Commission.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Commission.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Commission Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Submit_PAT -------------------------------
      if (items[i].Submit_PAT) {
        if (
          Number.isNaN(Number(items[i].Submit_PAT.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Submit_PAT.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Submit_PAT.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Submit_PAT.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Submit_PAT.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Submit_PAT.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Submit_PAT format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- PAT_Pass -------------------------------
      if (items[i].PAT_Pass) {
        if (
          Number.isNaN(Number(items[i].PAT_Pass.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].PAT_Pass.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].PAT_Pass.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].PAT_Pass.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].PAT_Pass.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].PAT_Pass.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid PAT_Pass Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Submit_SAR -------------------------------
      if (items[i].Submit_SAR) {
        if (
          Number.isNaN(Number(items[i].Submit_SAR.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Submit_SAR.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Submit_SAR.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Submit_SAR.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Submit_SAR.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Submit_SAR.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Submit_SAR Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- SAR_Pass -------------------------------
      if (items[i].SAR_Pass) {
        if (
          Number.isNaN(Number(items[i].SAR_Pass.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].SAR_Pass.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].SAR_Pass.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].SAR_Pass.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].SAR_Pass.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].SAR_Pass.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid SAR_Pass Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- On_air -------------------------------
      if (items[i].On_air) {
        if (
          Number.isNaN(Number(items[i].On_air.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].On_air.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].On_air.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].On_air.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].On_air.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].On_air.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid On_air Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      if (items[i].BOQ_Submit) {
        if (items[i].BOQ_Submit !== null) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else {
          setDateValidationError('BOQ_Submit is empty !');
          setvalidationErrorMessage('BOQ_Submit input is empty.');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      }

      if (items[i].BOQ_Approve) {
        if (items[i].BOQ_Approve !== null) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else {
          setDateValidationError('BOQ_Approve is empty !');
          setvalidationErrorMessage('BOQ_Approve input is empty.');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      }

      if (items[i].PR_Raise) {
        if (items[i].PR_Raise !== null) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else {
          setDateValidationError('PR_Raise is empty !');
          setvalidationErrorMessage('PR_Raise input is empty.');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      }

      // ------------------------- Material_Return -------------------------------
      if (items[i].Material_Return) {
        if (
          Number.isNaN(Number(items[i].Material_Return.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Material_Return.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Material_Return.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Material_Return.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Material_Return.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Material_Return.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Material_Return Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- PO_issue -------------------------------
      if (items[i].PO_issue) {
        if (
          Number.isNaN(Number(items[i].PO_issue.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].PO_issue.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].PO_issue.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].PO_issue.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].PO_issue.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].PO_issue.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid PO_issue Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Submit_Invoice -------------------------------
      if (items[i].Submit_Invoice) {
        if (
          Number.isNaN(Number(items[i].Submit_Invoice.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Submit_Invoice.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Submit_Invoice.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Submit_Invoice.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Submit_Invoice.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Submit_Invoice.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Submit_Invoice Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Approve_Invoice -------------------------------
      if (items[i].Approve_Invoice) {
        if (
          Number.isNaN(Number(items[i].Approve_Invoice.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Approve_Invoice.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Approve_Invoice.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Approve_Invoice.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Approve_Invoice.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Approve_Invoice.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Approve_Invoice Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Payment -------------------------------
      if (items[i].Payment) {
        if (
          Number.isNaN(Number(items[i].Payment.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Payment.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Payment.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Payment.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Payment.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Payment.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Payment Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- PO_closure -------------------------------
      if (items[i].PO_closure) {
        if (
          Number.isNaN(Number(items[i].PO_closure.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].PO_closure.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].PO_closure.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].PO_closure.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].PO_closure.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].PO_closure.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid PO_closure Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }
    }
  };

  // paramaeters change with change of items
  useEffect(() => {
    setMobilizationStatusError('');
    setInstallationStatusError('');
    setCommissioningStatusError('');
    setSARStatusError('');
    setPATStatusError('');
    setOnAirStatusError('');
    setvalidationError('');
    settablecelColor('');
    setDateValidationError('');
    setvalidationErrorMessage('');
    setSuccessMessage('');
    errorHandler();
    Formatter();
  }, [items]);

  // uploading excell data to the database
  const uplaodHandler = async (e) => {
    e.preventDefault();
    const newPost = items;

    if (validationError) {
      errorHandler();
      setvalidationErrorMessage('Please fill all the mandatorily required fields before submit !');
    } else if (dateValidationError === 'Date format error !') {
      Formatter();
      setvalidationErrorMessage(
        'Please change date format of fields with invalid date to yyyy-mm-dd format before submit !'
      );
    } else if (dateValidationError === 'Implementation_By format error !') {
      Formatter();
      setvalidationErrorMessage(
        'Invalid Implementation_By input. Please fill with "Mobitel Direct" before submit !'
      );
    } else if (dateValidationError === 'Implementation_By is empty !') {
      Formatter();
      setvalidationErrorMessage(
        'Please fill Implementation_By field with "Mobitel Direct" before submit !'
      );
    } else {
      axiosInstance
        .post('/mobitelProjectsDatabasesExcell/upload', newPost)
        .then((res) => {
          alert(`${res.data.success}`);
          // console.log(newPost);
          // const confirmBox = window.confirm('Do you want to upload more documents ?');
          // if (confirmBox === true) {
          //   navigate('/dashboard/DatabasesUploadProjectFiles', { replace: true });
          // } else {
          //   navigate('/dashboard/DatabasesVendorProjects', { replace: true });
          // }
        })
        .catch((error) => {
          if (error && error.response.data.error === 'Task_Ref must be a unique value !') {
            alert('Planning ID must be a unique value !');
            // console.log(error);
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
          } else if (error && error.response.data.error === 'request entity too large') {
            alert('Too large file. Please split the file and upload !');
          }
        });
    }
  };

  // inpit excell reading
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: 'buffer' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, {
          raw: false
        });
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      setItems(d);
    });
  };

  return (
    <div>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        {items.length > 0 ? (
          <Chip icon={<AttachmentIcon />} label={file.name} color="success" variant="outlined" />
        ) : null}
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          {items.length > 0 ? (
            <Button size="medium" variant="outlined" component="span" onClick={changeFileHandler}>
              Change File
            </Button>
          ) : null}
          {items.length > 0 ? (
            <Button size="small" variant="contained" component="span" onClick={uplaodHandler}>
              Upload file
            </Button>
          ) : (
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <label htmlFor="contained-button-file">
                <Input
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  id="contained-button-file"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    readExcel(file);
                    setFile(file);
                  }}
                />
                <Button size="medium" variant="outlined" component="span">
                  Choose File
                </Button>
              </label>
              <a href={ExcellTemplate} download="SampleExcellTemplate.xlsx">
                Download Sample Excell Sheet
              </a>
            </Stack>
          )}
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        {validationErrorMessage && (
          <Grid item xs={12} sm={6} md={12}>
            <Accordion
              sx={{
                backgroundColor: '#c20202',
                borderRadius: 0.2,
                alignItems: 'center'
              }}
            >
              <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                <Typography variant="h8" justifyContent="space-between">
                  <span className="error-message">{validationErrorMessage}</span>
                </Typography>
              </AccordionSummary>
            </Accordion>
          </Grid>
        )}
      </Stack>
      {items.length > 0 ? (
        <TableContainer component={Paper} style={{ maxHeight: '380px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Index</StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>Task_Ref</StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>Site_Id</StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Site_Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Handover&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Project&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Scope&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell>Site_Engineer</StyledTableCell>
                <StyledTableCell>
                  Sub_Contractor&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Task_Category&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Task_Assigned&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Task_Commenced&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Installation_Completed&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Commission&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Submit_PAT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  PAT_Pass&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Submit_SAR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  SAR_Pass&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  On_air&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  BOQ_Submit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>BOQ_Approve</StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>PR_Raise</StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Material_Return&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>PO_issue</StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Submit_Invoice&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>Approve_Invoice</StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>Payment</StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>PO_closure</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <StyledTableRow key={item.Task_Ref}>
                  <StyledTableCell align="left">{index + 1}</StyledTableCell>
                  <StyledTableCell align="left">{item.Task_Ref}</StyledTableCell>
                  <StyledTableCell align="left">{item.Site_Id}</StyledTableCell>
                  <StyledTableCell align="left">{item.Site_Name}</StyledTableCell>
                  <StyledTableCell align="left">{item.Handover}</StyledTableCell>
                  <StyledTableCell align="left">{item.Project}</StyledTableCell>
                  <StyledTableCell align="left">{item.Scope}</StyledTableCell>
                  <StyledTableCell align="left">{item.Site_Engineer}</StyledTableCell>
                  <StyledTableCell align="left">{item.Sub_Contractor}</StyledTableCell>
                  <StyledTableCell align="left">{item.Task_Category}</StyledTableCell>
                  <StyledTableCell align="left">{item.Task_Assigned}</StyledTableCell>
                  <StyledTableCell align="left">{item.Task_Commenced}</StyledTableCell>
                  <StyledTableCell align="left">{item.Installation_Completed}</StyledTableCell>
                  <StyledTableCell align="left">{item.Commission}</StyledTableCell>
                  <StyledTableCell align="left">{item.Submit_PAT}</StyledTableCell>
                  <StyledTableCell align="left">{item.PAT_Pass}</StyledTableCell>
                  <StyledTableCell align="left">{item.Submit_SAR}</StyledTableCell>
                  <StyledTableCell align="left">{item.SAR_Pass}</StyledTableCell>
                  <StyledTableCell align="left">{item.On_air}</StyledTableCell>
                  <StyledTableCell align="left">{item.BOQ_Submit}</StyledTableCell>
                  <StyledTableCell align="left">{item.BOQ_Approve}</StyledTableCell>
                  <StyledTableCell align="left">{item.PR_Raise}</StyledTableCell>
                  <StyledTableCell align="left">{item.Material_Return}</StyledTableCell>
                  <StyledTableCell align="left">{item.PO_issue}</StyledTableCell>
                  <StyledTableCell align="left">{item.Submit_Invoice}</StyledTableCell>
                  <StyledTableCell align="left">{item.Approve_Invoice}</StyledTableCell>
                  <StyledTableCell align="left">{item.Payment}</StyledTableCell>
                  <StyledTableCell align="left">{item.PO_closure}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </div>
  );
}

export default UploadExcellData;
