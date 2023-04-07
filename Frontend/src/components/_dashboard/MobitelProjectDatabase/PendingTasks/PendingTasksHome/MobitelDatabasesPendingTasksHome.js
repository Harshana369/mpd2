// material
import { Container, Select, Stack, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// components
import Page from '../../../../Page';
import CardLists from './CardLists';
import { fetchMobitelPendingTaskData } from '../../../../../Redux/Action/mobitelAction';
// ----------------------------------------------------------------------

export default function MobitelDatabasesPendingTasksHome() {
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  const dispatch = useDispatch();

  const [siteEngineersName, setSiteEngineerName] = useState([]);
  const [SiteEngineerDropdownValue, setSiteEngineerDropdownValue] = useState('All Site Engineers');

  const getSiteEngineersNames = async () => {
    const res = await axiosInstance.get(`/AllSiteEngineersForPendingTask`);
    setSiteEngineerName(res.data.AllSiteEngineersNames);
  };

  const handleSiteEngineersDropdownValue = (event) => {
    setSiteEngineerDropdownValue(event.target.value);
  };

  const AllSiteEngineersNamesArray = siteEngineersName.concat({
    value: 'All Site Engineers',
    label: 'All Site Engineers'
  });

  useEffect(() => {
    getSiteEngineersNames();
  }, []);

  useEffect(() => {
    dispatch(fetchMobitelPendingTaskData(SiteEngineerDropdownValue));
  }, [SiteEngineerDropdownValue, dispatch]);

  return (
    <Page title="Mobitel Projects Databases | Projects Management Database">
      <Container>
        <Typography variant="h6" gutterBottom>
          Mobitel Projects Pending Tasks
        </Typography>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 2 }}
        >
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">Site Engineers</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={SiteEngineerDropdownValue}
              label="Age"
              onChange={handleSiteEngineersDropdownValue}
            >
              {AllSiteEngineersNamesArray.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <CardLists />
      </Container>
    </Page>
  );
}
