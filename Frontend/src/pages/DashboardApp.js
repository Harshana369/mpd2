/* eslint-disable */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
  LastUpdatesVendor,
  AppWeeklySales,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWebsiteVisits1
} from '../components/_dashboard/app';
import AppBugReports1 from '../components/_dashboard/app/AppBugReports1';
import { fetchMobitelColumnGraphData, fetchMoitelTilesData } from '../Redux/Action/mobitelAction';

export default function DashboardApp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

  const [MobitelprojectNamesArray, setMobitelprojectNamesArray] = useState([]);
  const [VendorprojectNamesArray, setVendorprojectNamesArray] = useState([]);

  const [MobitelDropdownValue, setMobitelDropdownValue] = useState('All Projects');
  const [VendorDropdownValue, setVendorDropdownValue] = useState('All Vendor Projects');

  const [ChartDataForColumnGraphMobitel, setChartDatForColumnGraphMobitel] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]);
  const [ChartDataForColumnGraphVendor, setChartDatForColumnGraphVendor] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]);

  const [ScopeDataMobitel, setScopeDataMobitel] = useState([]);
  const [HandoverDataMobitel, setHandoverDataMobitel] = useState([]);
  const [PATPassDataMobitel, sePATPassDataMobitel] = useState();
  const [OnAirDataMobitel, setOnAirDataMobitel] = useState();
  const [HoldSitesDataMobitel, setHoldSitesDataMobitel] = useState();
  const [XaxisDataMobitel, setXaxisDataMobitel] = useState([]);
  const [ProjectCompletionMobitel, setProjectCompletionMobitel] = useState([]);
  const [XAxisDaysLabelMobitel, setxAxisDaysLabelMobitel] = useState([]);
  const [WeeklyProgressDataMobitel, setweeklyProgressDataMobitel] = useState([
    { name: 'Completed', type: 'column', data: [0, 0, 0, 0, 0, 0, 0] },
    { name: 'Targeted', type: 'column', data: [0, 0, 0, 0, 0, 0, 0] }
  ]);
  const [CompletedSitesMobitel, setcompletedSitesMobitel] = useState([]);

  const [ScopeDataVendor, setScopeDataVendor] = useState([]);
  const [HandoverDataVendor, setHandoverDataVendor] = useState([]);
  const [PATPassDataVendor, sePATPassDataVendor] = useState();
  const [OnAirDataVendor, setOnAirDataVendor] = useState();
  const [HoldSitesDataVendor, setHoldSitesDataVendor] = useState();
  const [ProjectCompletionVendor, setProjectCompletionVendor] = useState([]);
  const [WeeklyProgressDataVendor, setweeklyProgressDataVendor] = useState([
    { name: 'Completed', type: 'column', data: [0, 0, 0, 0, 0, 0, 0] },
    { name: 'Targeted', type: 'column', data: [0, 0, 0, 0, 0, 0, 0] }
  ]);
  const [CompletedSitesVendor, setcompletedSitesVendor] = useState([]);
  const [MobitelLastUpdates, setMobitelLastUpdates] = useState([]);
  const [VendorLastUpdates, setVendorLastUpdates] = useState([]);
  const [VendorUpdatesIsShown, setVendorUpdatesIsShown] = useState(false);
  const [MobitelUpdatesIsShown, setMobitelUpdatesIsShown] = useState(true);

  const fetchMobitelProjectNames = async () => {
    const req = await axiosInstance
      .get('/mobitelProjectsOverviewTable/ProjectsArray')
      .then((res) => {
        setMobitelprojectNamesArray(res.data.mobitelProjectsNamesArray);
      });
  };

  // const fetchMobitelColumnGraphData = () => {
  //   axiosInstance
  //     .get('/mobitelProjectsDatabasesChartDataColumnChartData', {
  //       params: { Project: MobitelDropdownValue }
  //     })
  //     .then((res) => {
  //       setChartDatForColumnGraphMobitel(res.data.chartDataForFrontEnd);
  //       setXaxisDataMobitel(res.data.XaxisDataForTheGraphs);
  //     });
  // };

  const mobitelTilesDetails = useSelector((state) => state.mobileTilesData);

  const { mobitelTilesDataLoading, error, mobitelTilesData } = mobitelTilesDetails;

  const mobitelColumnChatDetails = useSelector((state) => state.mobitelColumnChartData);

  const { mobitelChartColumnLoading, mobitelChartColumData, mobitelChartColumDataError } =
    mobitelColumnChatDetails;

  // const fetchVendorProjectNames = async () => {
  //   const req = await axiosInstance.get('/vendorProjectsOverviewTableProjectsArray').then((res) => {
  //     setVendorprojectNamesArray(res.data.vendorProjectsNamesArrayForInsights);
  //   });
  // };
  const MobitelprojectNames = MobitelprojectNamesArray.concat({
    value: 'All Projects',
    label: 'All Projects'
  });
  // const VendorprojectNames = VendorprojectNamesArray.concat({
  //   value: '',
  //   label: 'Mobitel Projects Only'
  // });

  useEffect(() => {
    // fetchMobitelData();
    // fetchVendorData();
    // fetchMobitelScopeData();
    // fetchVendorScopeData();
    // fetchVendorColumnGraphData();
    // fetchMobitelProjectsLastUpdates();
    // fetchVendorProjectsLastUpdates();
    fetchMobitelProjectNames();
    // fetchVendorProjectNames();
    dispatch(fetchMobitelColumnGraphData(MobitelDropdownValue));
    dispatch(fetchMoitelTilesData(MobitelDropdownValue));
  }, [dispatch]);

  useEffect(() => {
    // fetchMobitelData();
    fetchMobitelColumnGraphData();
    fetchMobitelProjectNames();
    dispatch(fetchMobitelColumnGraphData(MobitelDropdownValue));
    dispatch(fetchMoitelTilesData(MobitelDropdownValue));
  }, [dispatch, MobitelDropdownValue]);

  // useEffect(() => {
  //   fetchMobitelData();
  //   fetchVendorData();
  //   fetchMobitelScopeData();
  //   fetchVendorScopeData();
  //   fetchMobitelColumnGraphData();
  //   fetchVendorColumnGraphData();
  //   fetchMobitelProjectsLastUpdates();
  //   fetchVendorProjectsLastUpdates();
  //   fetchMobitelProjectNames();
  //   fetchVendorProjectNames();
  // }, [MobitelDropdownValue]);

  // useEffect(() => {
  //   fetchMobitelData();
  //   fetchVendorData();
  //   fetchMobitelScopeData();
  //   fetchVendorScopeData();
  //   fetchMobitelColumnGraphData();
  //   fetchVendorColumnGraphData();
  //   fetchMobitelProjectsLastUpdates();
  //   fetchVendorProjectsLastUpdates();
  //   fetchMobitelProjectNames();
  //   fetchVendorProjectNames();
  // }, [VendorDropdownValue]);

  // const fetchMobitelColumnGraphData = () => {
  //   axiosInstance
  //     .get('/mobitelProjectsDatabasesChartDataColumnChartData', {
  //       params: { Project: MobitelDropdownValue }
  //     })
  //     .then((res) => {
  //       setChartDatForColumnGraphMobitel(res.data.chartDataForFrontEnd);
  //       setXaxisDataMobitel(res.data.XaxisDataForTheGraphs);
  //     });
  // };

  // const fetchMobitelData = () => {
  //   axiosInstance
  //     .get('/mobitelProjectsDatabases', {
  //       params: { Project: MobitelDropdownValue }
  //     })
  //     .then((res) => {
  //       setHandoverDataMobitel(res.data.projectsHandOverDataCount);
  //       sePATPassDataMobitel(res.data.projectsPatDataCount);
  //       //  setHoldSitesDataMobitel(res.data.HoldSitesDataforSquares);
  //       setOnAirDataMobitel(res.data.projectsOnAirDataCount);
  //     });
  // };

  // const fetchMobitelScopeData = () => {
  //   axiosInstance
  //     .get('/mobitelProjectsOverviewTable', {
  //       params: { ProjectName: MobitelDropdownValue }
  //     })
  //     .then((res) => {
  //       setScopeDataMobitel(res.data.scopeDataToTheFrontEnd);
  //     });
  // };

  // const fetchVendorColumnGraphData = () => {
  //   axiosInstance
  //     .get('/vendorProjectsDatabasesChartDataColumnChartData', {
  //       params: { Project: VendorDropdownValue }
  //     })
  //     .then((res) => {
  //       setChartDatForColumnGraphVendor(res.data.chartDataForFrontEnd);
  //     });
  // };

  // const fetchVendorData = () => {
  //   axiosInstance
  //     .get('/vendorProjectsDatabases', {
  //       params: { Project: VendorDropdownValue }
  //     })
  //     .then((res) => {
  //       setHandoverDataVendor(res.data.HandOverDataToSquares);
  //       sePATPassDataVendor(res.data.PatDataForFrontEnd);
  //       setHoldSitesDataVendor(res.data.HoldSitesDataforSquares);
  //       setOnAirDataVendor(res.data.OnAirDataForFrontEnd);
  //       setProjectCompletionVendor(res.data.ProjectCompletionForFrontEnd);
  //       setweeklyProgressDataVendor(res.data.weeklyProgressDataForFrontEnd);
  //       setcompletedSitesVendor(res.data.WeeklyProgressOnAirSitesData);
  //     });
  // };

  // const fetchVendorScopeData = () => {
  //   axiosInstance
  //     .get('/vendorProjectsOverviewTable', {
  //       params: { ProjectName: VendorDropdownValue }
  //     })
  //     .then((res) => {
  //       setScopeDataVendor(res.data.scopeDataToTheFrontEnd);
  //     });
  // };

  // const fetchMobitelProjectsLastUpdates = () => {
  //   axiosInstance
  //     .get('/mobitelProjectsLastUpdates', {
  //       params: { Project: MobitelDropdownValue }
  //     })
  //     .then((res) => {
  //       setMobitelLastUpdates(res.data.existingPosts);
  //     });
  // };

  // const fetchVendorProjectsLastUpdates = () => {
  //   axiosInstance
  //     .get('/vendorProjectsLastUpdates', {
  //       params: { Project: VendorDropdownValue }
  //     })
  //     .then((res) => {
  //       setVendorLastUpdates(res.data.existingPosts);
  //     });
  // };

  const handleMobitelDropdownValue = (event) => {
    setMobitelDropdownValue(event.target.value);
  };

  const handleVendorDropdownValue = (event) => {
    setVendorDropdownValue(event.target.value);
  };

  const showVendorProjectsUpdates = () => {
    setVendorUpdatesIsShown(true);
    setMobitelUpdatesIsShown(false);
  };

  const showMobitelProjectsUpdates = () => {
    setVendorUpdatesIsShown(false);
    setMobitelUpdatesIsShown(true);
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

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
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
            {/* <TextField
              style={{ float: 'right' }}
              sx={{ width: 200 }}
              size="small"
              id="outlined-select-currency"
              select
              value={VendorDropdownValue}
              onChange={handleVendorDropdownValue}
            >
              {VendorprojectNames.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField> */}
          </Stack>
        </Stack>
        <Grid container spacing={1}>
          {mobitelTilesDataLoading ? (
            <Grid item xs={12} sm={6} md={2.4}>
              <CircularProgress color="success" />
            </Grid>
          ) : error ? (
            <h1>error...</h1>
          ) : (
            <Grid item xs={12} sm={6} md={2.4}>
              <AppWeeklySales scopeData={mobitelTilesData.projectsScopeDataCount} />
            </Grid>
          )}

          {mobitelTilesDataLoading ? (
            <Grid item xs={12} sm={6} md={2.4}>
              <CircularProgress color="success" />
            </Grid>
          ) : error ? (
            <h1>error...</h1>
          ) : (
            <Grid item xs={12} sm={6} md={2.4}>
              <AppBugReports1 handoverData={mobitelTilesData.projectsHandOverDataCount} />
            </Grid>
          )}

          {mobitelTilesDataLoading ? (
            <Grid item xs={12} sm={6} md={2.4}>
              <CircularProgress color="success" />
            </Grid>
          ) : error ? (
            <h1>error...</h1>
          ) : (
            <Grid item xs={12} sm={6} md={2.4}>
              <AppItemOrders patData={mobitelTilesData.projectsPatDataCount} />
            </Grid>
          )}

          {mobitelTilesDataLoading ? (
            <Grid item xs={12} sm={6} md={2.4}>
              <CircularProgress color="success" />
            </Grid>
          ) : error ? (
            <h1>error...</h1>
          ) : (
            <Grid item xs={12} sm={6} md={2.4}>
              <AppNewUsers onAirData={mobitelTilesData.projectsOnAirDataCount} />
            </Grid>
          )}

          {mobitelTilesDataLoading ? (
            <Grid item xs={12} sm={6} md={2.4}>
              <CircularProgress color="success" />
            </Grid>
          ) : error ? (
            <h1>error...</h1>
          ) : (
            <Grid item xs={12} sm={6} md={2.4}>
              <AppBugReports holdData={HoldSitesData} />
            </Grid>
          )}

          {mobitelChartColumnLoading ? (
            <Grid item xs={12} sm={6} md={2.4}>
              <CircularProgress color="success" />
            </Grid>
          ) : mobitelChartColumDataError ? (
            <h1>error...</h1>
          ) : (
            <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteVisits
                chartData={mobitelChartColumData.columnChartData}
                xaxisData={mobitelChartColumData.XaxisDataForTheGraphs}
              />
            </Grid>
          )}

          {mobitelChartColumnLoading ? (
            <Grid item xs={12} sm={6} md={2.4}>
              <CircularProgress color="success" />
            </Grid>
          ) : mobitelChartColumDataError ? (
            <h1>error...</h1>
          ) : (
            <Grid item xs={12} md={6} lg={4}>
              <AppCurrentVisits
                projectCompletionMobitel={mobitelChartColumData.ProjectCompletionForFrontEnd}
              />
            </Grid>
          )}

          {/* <Grid item xs={12} md={6} lg={12} mb={0}>
            <AppWebsiteVisits1
              xAxisDaysLabel={XAxisDaysLabelMobitel}
              weeklyProgressDataMobitel={WeeklyProgressDataMobitel}
              weeklyProgressDataVendor={WeeklyProgressDataVendor}
              completedSitesMobitel={CompletedSitesMobitel}
              completedSitesVendor={CompletedSitesVendor}
            />
          </Grid> */}
          {/* <Grid item xs={12} md={6} lg={12} mb={0}>
            <Card style={{ height: '520px' }}>
              <Stack sx={{ p: 2 }} direction="row">
                <Button
                  color="secondary"
                  onClick={() => {
                    // showMobitelProjectsUpdates();
                    // fetchMobitelProjectsLastUpdates();
                    // fetchVendorProjectsLastUpdates();
                  }}
                >
                  Mobitel projects
                </Button>
                <Button
                  color="secondary"
                  onClick={() => {
                    // showVendorProjectsUpdates();
                    // fetchMobitelProjectsLastUpdates();
                    // fetchVendorProjectsLastUpdates();
                  }}
                >
                  Vendor projects
                </Button>
              </Stack>
              {MobitelUpdatesIsShown && (
                <LastUpdatesMobitel mobitelLastUpdates={MobitelLastUpdates} />
              )}
              {VendorUpdatesIsShown && <LastUpdatesVendor vendorLastUpdates={VendorLastUpdates} />}
            </Card>
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
