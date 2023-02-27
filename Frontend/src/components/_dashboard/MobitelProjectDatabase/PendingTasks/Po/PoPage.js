import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// material
import { Typography, Stack, Link } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import UploadIcon from '@mui/icons-material/Upload';
import EditIcon from '@mui/icons-material/Edit';
// components
import Page from '../../../../Page';
import Datagrid from './Datagrid';

// ----------------------------------------------------------------------
// ---------------------------------------------------------------------
export default function AcceptancePage() {
  const navigate = useNavigate();
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

  const [projectNamesArray, setprojectNamesArray] = useState([]);
  const [siteEngineerNamesList, setSiteEngineerNamesList] = useState([]);

  const [dropdownValue, setDropdownValue] = useState('All Site Engineers');
  const [projectNameDropdownValue, setProjectNameDropdownValue] = useState('All Mobitel Projects');

  // useEffect(() => {
  //   fetchProjectNames();
  //   fetchSiteEngineerNames();
  // }, []);

  const handleChangeSiteEngineers = (event) => {
    setDropdownValue(event.target.value);
  };

  const handleChangeProjectName = (event) => {
    setProjectNameDropdownValue(event.target.value);
  };

  const fetchProjectNames = async () => {
    const req = await axiosInstance
      .get('/mobitelProjectsOverviewTable/ProjectsArray')
      .then((res) => {
        setprojectNamesArray(res.data.mobitelProjectsNamesArrayForInsights);
      });
  };
  const projectNames = projectNamesArray;

  const fetchSiteEngineerNames = async () => {
    const req = await axiosInstance.get('/siteEngineersNamesList').then((res) => {
      setSiteEngineerNamesList(res.data.siteEngineersNamesArray);
    });
  };

  const siteEngineerNamesObjectsArray = [];
  const AllSiteEngineerNamesArray = [
    {
      value: 'All Site Engineers',
      label: 'All Site Engineers'
    }
  ];

  for (let i = 0; i < siteEngineerNamesList.length; i += 1) {
    siteEngineerNamesObjectsArray[i] = {
      value: siteEngineerNamesList[i],
      label: siteEngineerNamesList[i]
    };
  }
  const siteEngineerNamesObject = AllSiteEngineerNamesArray.concat(siteEngineerNamesObjectsArray);

  return (
    <Page title="Mobitel Projects Database | Projects Management Database System">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h6" gutterBottom>
          Po Pending
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Datagrid
          DropDownValue={dropdownValue}
          ProjectNameDropdownValue={projectNameDropdownValue}
        />
      </Stack>
    </Page>
  );
}
