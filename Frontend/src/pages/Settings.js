// material
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Stack, Typography, Grid, Link, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

// components
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Page from '../components/Page';
//

// ----------------------------------------------------------------------

export default function Settings() {
  const [loading, setLoading] = useState(false); // Add loading state

  const getDataFromProjectOnline = async () => {
    setLoading(true); // Set loading state to true

    const res = await axios.post('https://projectonline.mobitel.lk/projonline/login', {
      username: 'BTS_Project_API',
      password: 'BTS_Project_API'
    });

    temp(res.data.accessToken);
  };

  const temp = async (accessToken) => {
    const TasksData = await axios.get('https://projectonline.mobitel.lk/projonline/getmpdsystem', {
      headers: {
        token: `Bearer ${accessToken}`
      }
    });

    console.log(TasksData.data);

    sendBackend(TasksData.data);
  };

  const sendBackend = async (projectOnline) => {
    const axiosInstance = await axios.create({ baseURL: process.env.REACT_APP_API_URL });

    // console.log(projectOnline);

    const config = {
      pOnline: projectOnline,
      headers: {
        'Content-Type': 'application/json' // set content type to JSON
      }
    };

    try {
      // ...
      const response = await axiosInstance.put('/saveProjectOnlineData', config);
      setLoading(false); // Set loading state to false
      console.log(response);
      alert(response.data.success);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Page title="Settings | Projects Management System">
      <Container>
        <Typography variant="h6" gutterBottom>
          Settings
        </Typography>

        <Button variant="contained" onClick={getDataFromProjectOnline} sx={{ ml: 95 }}>
          Get Data From Project Online
        </Button>

        {/* Render response without CircularProgress */}
        {loading === true ? <CircularProgress /> : null}
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 2 }}
        />
        <Grid container spacing={1}>
          {/* <Grid item xs={12} sm={6} md={12}>
            <Link underline="none" component={RouterLink} to="/dashboard/settings/VendorProjects">
              <Accordion
                sx={{
                  backgroundColor: '#011f40',
                  borderRadius: 0.2
                }}
              >
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                  <Typography>Vendor Projects</Typography>
                </AccordionSummary>
              </Accordion>
            </Link>
          </Grid> */}
          <Grid item xs={12} sm={6} md={12}>
            <Link underline="none" component={RouterLink} to="/dashboard/settings/MobitelProjects">
              <Accordion
                sx={{
                  backgroundColor: '#011f40',
                  borderRadius: 0.2
                }}
              >
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                  <Typography>Select Menu Options</Typography>
                </AccordionSummary>
              </Accordion>
            </Link>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} md={12}>
          <Link
            underline="none"
            component={RouterLink}
            to="/dashboard/settings/Givingaccesstopendingtasks"
          >
            <Accordion
              sx={{
                backgroundColor: '#011f40',
                borderRadius: 0.2
              }}
            >
              <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                <Typography>Giving access to pending tasks</Typography>
              </AccordionSummary>
            </Accordion>
          </Link>
        </Grid>
      </Container>
    </Page>
  );
}
