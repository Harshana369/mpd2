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
// -------------------------------------------------------------------
export default function CardLists() {
  const mobitelPendingTaskDetails = useSelector((state) => state.mobitelPendingTaskData);

  const { mobitelPendingTaskDataLoading, mobitelPendingTaskData, mobitelPendingTaskDataError } =
    mobitelPendingTaskDetails;

  const access = ['Installation', 'Commissioning', 'Pat'];

  return (
    <Grid container spacing={1}>
      {/* Installation */}
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
            to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/Installation"
          >
            <InstallationPendingTasks
              Installation={
                mobitelPendingTaskData.InstallationPendingTasks &&
                mobitelPendingTaskData.InstallationPendingTasks.length
              }
            />
          </Link>
        </Grid>
      )}
      {/* Commissioning */}
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
            to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/Commissioning"
          >
            <CommissioningPendingTasks
              Commission={
                mobitelPendingTaskData.CommissioningPendingTasks &&
                mobitelPendingTaskData.CommissioningPendingTasks.length
              }
            />
          </Link>
        </Grid>
      )}
      {/* Pat */}
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
            to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/Pat"
          >
            <PatPendingTasks
              Pat={
                mobitelPendingTaskData.PatPendingTasks &&
                mobitelPendingTaskData.PatPendingTasks.length
              }
            />
          </Link>
        </Grid>
      )}
      {/* Sar */}
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
            to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/Sar"
          >
            <SarPendingTasks
              Sar={
                mobitelPendingTaskData.SarPendingTasks &&
                mobitelPendingTaskData.SarPendingTasks.length
              }
            />
          </Link>
        </Grid>
      )}
      {/* OnAir */}
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
            to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/OnAir"
          >
            <OnAirPendingTasks
              OnAir={
                mobitelPendingTaskData.OnAirPendingTasks &&
                mobitelPendingTaskData.OnAirPendingTasks.length
              }
            />
          </Link>
        </Grid>
      )}
      {/* MaterialReturn */}
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
            to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/MaterialReturn"
          >
            <MaterialReturnPendingTasks
              MaterialReturn={
                mobitelPendingTaskData.MaterialReturnPendingTasks &&
                mobitelPendingTaskData.MaterialReturnPendingTasks.length
              }
            />
          </Link>
        </Grid>
      )}
      {/* Pr */}
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
            to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/Pr"
          >
            <PrPendingTasks
              Pr={
                mobitelPendingTaskData.PrPendingTasks &&
                mobitelPendingTaskData.PrPendingTasks.length
              }
            />
          </Link>
        </Grid>
      )}
      {/* Po */}
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
            to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/Po"
          >
            <PoPendingTasks
              Po={
                mobitelPendingTaskData.PoPendingTasks &&
                mobitelPendingTaskData.PoPendingTasks.length
              }
            />
          </Link>
        </Grid>
      )}
      {/* Invoice */}
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
            to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/Invoice"
          >
            <InvoicePendingTasks
              Invoice={
                mobitelPendingTaskData.InvoicePendingTasks &&
                mobitelPendingTaskData.InvoicePendingTasks.length
              }
            />
          </Link>
        </Grid>
      )}
      {/* PoClosure */}
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
            to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/PoClosure"
          >
            <PoClosurePending
              PoClosure={
                mobitelPendingTaskData.PoClosurePendingTasks &&
                mobitelPendingTaskData.PoClosurePendingTasks.length
              }
            />
          </Link>
        </Grid>
      )}
    </Grid>
  );
}
