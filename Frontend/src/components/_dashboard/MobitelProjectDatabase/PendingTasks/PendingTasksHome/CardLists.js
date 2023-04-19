/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// material
import { Link as RouterLink } from 'react-router-dom';
import { CircularProgress, Grid, Link } from '@mui/material';
import CommissioningPendingTasks from './CommissioningPendingTasks';
import PatPendingTasks from './PatPendingTasks';
import SarPendingTasks from './SarPendingTasks';
import OnAirPendingTasks from './OnAirPendingTasks';
import MaterialReturnPendingTasks from './MaterialReturnPendingTasks';
import PrPendingTasks from './PrPendingTasks';
import PoPendingTasks from './PoPendingTasks';
import InvoicePendingTasks from './InvoicePendingTasks';
import PoClosurePending from './PoClosurePendingTasks';
import InstallationPendingTasks from './InstallationPendingTasks';
import axios from 'axios';

// -------------------------------------------------------------------
export default function CardLists() {
  const [data, setData] = useState([]);
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

  const mobitelPendingTaskDetails = useSelector((state) => state.mobitelPendingTaskData);

  const { mobitelPendingTaskDataLoading, mobitelPendingTaskData, mobitelPendingTaskDataError } =
    mobitelPendingTaskDetails;

  const access = data;

  const level = localStorage.getItem('adminLevel');

  const getData = async () => {
    await axiosInstance.get('/getUpdatePendingTaskPrivilegeLevel').then((res) => {
      // console.log(res.data.success[0].editor);

      if (level === 'Moderator') {
        setData(res.data.success[0].moderator);
      } else if (level === 'Editor') {
        setData(res.data.success[0].editor);
      } else {
        setData(res.data.success[0].admin);
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Grid container spacing={1}>
      {access.map((item) => (
        <React.Fragment key={item}>
          {mobitelPendingTaskDataLoading ? (
            <Grid item xs={12} sm={6} md={2.4}>
              <CircularProgress color="success" />
            </Grid>
          ) : mobitelPendingTaskDataError ? (
            <h1>error...</h1>
          ) : (
            <Grid item xs={12} sm={6} md={2.4}>
              <Link
                underline="none"
                component={RouterLink}
                to={`/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/${item}`}
              >
                {item === 'Installation' ? (
                  <InstallationPendingTasks
                    Installation={
                      mobitelPendingTaskData.InstallationPendingTasks &&
                      mobitelPendingTaskData.InstallationPendingTasks.length
                    }
                  />
                ) : item === 'Commissioning' ? (
                  <CommissioningPendingTasks
                    Commission={
                      mobitelPendingTaskData.CommissioningPendingTasks &&
                      mobitelPendingTaskData.CommissioningPendingTasks.length
                    }
                  />
                ) : item === 'Pat' ? (
                  <PatPendingTasks
                    Pat={
                      mobitelPendingTaskData.PatPendingTasks &&
                      mobitelPendingTaskData.PatPendingTasks.length
                    }
                  />
                ) : item === 'Sar' ? (
                  <SarPendingTasks
                    Sar={
                      mobitelPendingTaskData.SarPendingTasks &&
                      mobitelPendingTaskData.SarPendingTasks.length
                    }
                  />
                ) : item === 'OnAir' ? (
                  <OnAirPendingTasks
                    OnAir={
                      mobitelPendingTaskData.OnAirPendingTasks &&
                      mobitelPendingTaskData.OnAirPendingTasks.length
                    }
                  />
                ) : item === 'MaterialReturn' ? (
                  <MaterialReturnPendingTasks
                    MaterialReturn={
                      mobitelPendingTaskData.MaterialReturnPendingTasks &&
                      mobitelPendingTaskData.MaterialReturnPendingTasks.length
                    }
                  />
                ) : item === 'Pr' ? (
                  <PrPendingTasks
                    Pr={
                      mobitelPendingTaskData.PrPendingTasks &&
                      mobitelPendingTaskData.PrPendingTasks.length
                    }
                  />
                ) : item === 'Po' ? (
                  <PoPendingTasks
                    Po={
                      mobitelPendingTaskData.PoPendingTasks &&
                      mobitelPendingTaskData.PoPendingTasks.length
                    }
                  />
                ) : item === 'Invoice' ? (
                  <InvoicePendingTasks
                    Invoice={
                      mobitelPendingTaskData.InvoicePendingTasks &&
                      mobitelPendingTaskData.InvoicePendingTasks.lenght
                    }
                  />
                ) : (
                  <PoClosurePending
                    PoClosure={
                      mobitelPendingTaskData.PoClosurePending &&
                      mobitelPendingTaskData.PoClosurePending.lenght
                    }
                  />
                )}
              </Link>
            </Grid>
          )}
        </React.Fragment>
      ))}
    </Grid>
  );
}
