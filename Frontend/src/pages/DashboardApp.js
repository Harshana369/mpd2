/* eslint-disable */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

// material
import { Grid, Container, Typography, Stack, Card, Button, CircularProgress } from '@mui/material';
// components
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Page from '../components/Page';
import {
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  LastUpdatesMobitel,
  AppWeeklySales,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWebsiteVisits1
} from '../components/_dashboard/app';
import AppBugReports1 from '../components/_dashboard/app/AppBugReports1';
import { fetchMobitelColumnGraphData, fetchMoitelTilesData } from '../Redux/Action/mobitelAction';

export default function DashboardApp() {
  // const dispatch = useDispatch();

  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

  // mobitel
  const [MobitelprojectNamesArray, setMobitelprojectNamesArray] = useState([]);
  const [MobitelDropdownValue, setMobitelDropdownValue] = useState('All Projects');
  const [MobitelLastUpdates, setMobitelLastUpdates] = useState([]);

  // site engineer
  const [siteEngineersName, setSiteEngineersName] = useState([]);
  const [siteEngineerName, setSelectedSiteEngineer] = useState('All siteEngineers');

  // get all mobitel projects names
  const fetchMobitelProjectNames = async () => {
    const req = await axiosInstance
      .get('/mobitelProjectsOverviewTable/ProjectsArray')
      .then((res) => {
        setMobitelprojectNamesArray(res.data.mobitelProjectsNamesArray);
      });
  };

  // mobitel projects last update
  const fetchMobitelProjectsLastUpdates = () => {
    axiosInstance
      .get('/mobitelProjectsLastUpdates', {
        params: { Engineer: siteEngineerName, Project: MobitelDropdownValue }
      })
      .then((res) => {
        setMobitelLastUpdates(res.data.existingPosts);

        // console.log(res.data.existingPosts);
      });
  };

  // get all site engineers names
  const getSiteEngineersNames = async () => {
    const res = await axiosInstance.get(`/AllSiteEngineersNames`);
    setSiteEngineersName(res.data.siteEngineersNamesArray);
  };

  // const mobitelTilesDetails = useSelector((state) => state.mobileTilesData);
  // const { mobitelTilesDataLoading, error, mobitelTilesData } = mobitelTilesDetails;

  // const mobitelColumnChatDetails = useSelector((state) => state.mobitelColumnChartData);
  // const { mobitelChartColumnLoading, mobitelChartColumData, mobitelChartColumDataError } =
  //   mobitelColumnChatDetails;

  // console.log(mobitelChartColumData);

  const MobitelprojectNames = MobitelprojectNamesArray.concat({
    value: 'All Projects',
    label: 'All Projects'
  });
  const allSiteEngineersName = siteEngineersName.concat({
    value: 'All siteEngineers',
    label: 'All siteEngineers'
  });

  // useEffect(() => {
  //   // call mobitel name and site engineer name
  //   fetchMobitelProjectNames();
  //   getSiteEngineersNames();

  //   // call Tiles data and other chart
  //   dispatch(fetchMoitelTilesData(MobitelDropdownValue, siteEngineerName));
  //   dispatch(fetchMobitelColumnGraphData(MobitelDropdownValue, siteEngineerName));

  //   // call last update data
  //   fetchMobitelProjectsLastUpdates();
  // }, [dispatch, siteEngineerName]);

  // useEffect(() => {
  //   // call mobitel name and site engineer name
  //   fetchMobitelProjectNames();
  //   getSiteEngineersNames();

  //   // call Tiles data and other chart
  //   dispatch(fetchMoitelTilesData(MobitelDropdownValue, siteEngineerName));
  //   dispatch(fetchMobitelColumnGraphData(MobitelDropdownValue, siteEngineerName));

  //   // call last update data
  //   fetchMobitelProjectsLastUpdates();
  // }, [dispatch, MobitelDropdownValue]);

  const handleMobitelDropdownValue = (event) => {
    setMobitelDropdownValue(event.target.value);
  };

  const handleSiteEngineerDropdownValue = (event) => {
    setSelectedSiteEngineer(event.target.value);
  };

  const HoldSitesData = 0;
  return (
    <Page title="Dashboard | Mobitel Projects Dashboard">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" gutterBottom>
            All Projects Overview
          </Typography>
        </Stack>

        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="caption1">Select Options</Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
            mb={0}
          >
            <TextField
              style={{ float: 'right' }}
              sx={{ width: 200 }}
              size="small"
              id="outlined-select-currency"
              select
              value={MobitelDropdownValue}
              onChange={handleMobitelDropdownValue}
            >
              {MobitelprojectNames.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              style={{ float: 'right' }}
              sx={{ width: 200 }}
              size="small"
              id="outlined-select-currency"
              select
              value={siteEngineerName}
              onChange={handleSiteEngineerDropdownValue}
            >
              {allSiteEngineersName.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Stack> */}
      </Container>
    </Page>
  );
}

// <Grid container spacing={1}>
//   {mobitelTilesDataLoading ? (
//     <Grid item xs={12} sm={6} md={2.4}>
//       <CircularProgress color="success" />
//     </Grid>
//   ) : error ? (
//     <h1>error...</h1>
//   ) : (
//     <Grid item xs={12} sm={6} md={2.4}>
//       <AppWeeklySales scopeData={mobitelTilesData?.projectsScopeDataCount ?? []} />
//     </Grid>
//   )}
//   {mobitelTilesDataLoading ? (
//     <Grid item xs={12} sm={6} md={2.4}>
//       <CircularProgress color="success" />
//     </Grid>
//   ) : error ? (
//     <h1>error...</h1>
//   ) : (
//     <Grid item xs={12} sm={6} md={2.4}>
//       <AppBugReports1 handoverData={mobitelTilesData?.projectsHandOverDataCount ?? []} />
//     </Grid>
//   )}
//   {mobitelTilesDataLoading ? (
//     <Grid item xs={12} sm={6} md={2.4}>
//       <CircularProgress color="success" />
//     </Grid>
//   ) : error ? (
//     <h1>error...</h1>
//   ) : (
//     <Grid item xs={12} sm={6} md={2.4}>
//       <AppItemOrders patData={mobitelTilesData?.projectsPatDataCount ?? []} />
//     </Grid>
//   )}
//   {mobitelTilesDataLoading ? (
//     <Grid item xs={12} sm={6} md={2.4}>
//       <CircularProgress color="success" />
//     </Grid>
//   ) : error ? (
//     <h1>error...</h1>
//   ) : (
//     <Grid item xs={12} sm={6} md={2.4}>
//       <AppNewUsers onAirData={mobitelTilesData?.projectsOnAirDataCount ?? []} />
//     </Grid>
//   )}

//   {mobitelTilesDataLoading ? (
//     <Grid item xs={12} sm={6} md={2.4}>
//       <CircularProgress color="success" />
//     </Grid>
//   ) : error ? (
//     <h1>error...</h1>
//   ) : (
//     <Grid item xs={12} sm={6} md={2.4}>
//       <AppBugReports holdData={HoldSitesData ?? []} />
//     </Grid>
//   )}

//   {/* All Sites Completed */}
//   {mobitelChartColumnLoading ? (
//     <Grid item xs={12} sm={6} md={2.4}>
//       <CircularProgress color="success" />
//     </Grid>
//   ) : mobitelChartColumDataError ? (
//     <h1>error...</h1>
//   ) : (
//     <Grid item xs={12} md={6} lg={8}>
//       <AppWebsiteVisits
//         chartData={mobitelChartColumData?.columnChartData ?? []}
//         xaxisData={mobitelChartColumData?.XaxisDataForTheGraphs ?? []}
//       />
//     </Grid>
//   )}
//   {/* Completed,Pending,Hold */}
//   {mobitelChartColumnLoading ? (
//     <Grid item xs={12} sm={6} md={2.4}>
//       <CircularProgress color="success" />
//     </Grid>
//   ) : mobitelChartColumDataError ? (
//     <h1>error...</h1>
//   ) : (
//     <Grid item xs={12} md={6} lg={4}>
//       <AppCurrentVisits
//         projectCompletionMobitel={mobitelChartColumData?.ProjectCompletionForFrontEnd ?? []}
//       />
//     </Grid>
//   )}

//   {/* Daily Work Progress */}
//   {mobitelChartColumnLoading ? (
//     <Grid item xs={12} sm={6} md={2.4}>
//       <CircularProgress color="success" />
//     </Grid>
//   ) : mobitelChartColumDataError ? (
//     <h1>error...</h1>
//   ) : (
//     <Grid item xs={12} md={6} lg={12} mb={0}>
//       <AppWebsiteVisits1
//         xAxisDaysLabel={mobitelChartColumData?.SevenDaysOfWeek ?? []}
//         completedSitesMobitel={mobitelChartColumData?.weeklyProgressDataForFrontEnd ?? []}
//       />
//     </Grid>
//   )}
//   <Grid item xs={12} md={6} lg={12} mb={0}>
//     <Card style={{ height: '520px' }}>
//       <Stack sx={{ p: 2 }} direction="row">
//         <Button
//           color="secondary"
//           onClick={() => {
//             fetchMobitelProjectsLastUpdates();
//           }}
//         >
//           Mobitel projects
//         </Button>
//       </Stack>

//       <LastUpdatesMobitel mobitelLastUpdates={MobitelLastUpdates} />
//     </Card>
//   </Grid>
// </Grid>;
