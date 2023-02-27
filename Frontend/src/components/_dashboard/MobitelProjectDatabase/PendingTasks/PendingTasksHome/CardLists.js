import React, { useEffect, useState } from 'react';
import axios from 'axios';
// material
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Link } from '@mui/material';
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
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

  const [Handover, setHODetailsNotifications] = useState('0');
  const [Assign, setWorkAllocationNotifications] = useState('0');
  const [TeamAllocation, setTeamAllocationNotifications] = useState('0');
  const [Dependencies, setDependenciesNotifications] = useState('0');
  const [PRPOProgress, setPRPOProgressNotifications] = useState('0');
  const [Logistics, setLogisticsNotifications] = useState('0');
  const [Implementations, setImplementationsNotifications] = useState('0');
  const [Acceptance, setAcceptanceNotifications] = useState('0');
  const [Payment, setPaymentNotifications] = useState('0');

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchData = async () => {
    const res = await axiosInstance.get(`/mobitelProjectsDatabasesPendingTasks`);
    setHODetailsNotifications(res.data.HOPendingTasks.length);
    setWorkAllocationNotifications(res.data.AssignPendingTasks.length);
    setTeamAllocationNotifications(res.data.TeamAllocationPendingTasks.length);
    setDependenciesNotifications(res.data.DependenciesPendingTasks.length);
    setPRPOProgressNotifications(res.data.PRPOProgressPendingTasks.length);
    setLogisticsNotifications(res.data.LogisticsPendingTasks.length);
    setImplementationsNotifications(res.data.ImplementationPendingTasks.length);
    setAcceptanceNotifications(res.data.AcceptancePendingTasks.length);
    setPaymentNotifications(res.data.PaymentPendingTasks.length);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/Installation"
        >
          <InstallationPendingTasks />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/Commissioning"
        >
          <CommissioningPendingTasks assign={Assign} />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/Pat"
        >
          <PatPendingTasks teamAllocation={TeamAllocation} />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/Sar"
        >
          <SarPendingTasks dependencies={Dependencies} />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/OnAir"
        >
          <OnAirPendingTasks pRPOProgress={PRPOProgress} />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/MaterialReturn"
        >
          <MaterialReturnPendingTasks logistics={Logistics} />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/Pr"
        >
          <PrPendingTasks implementations={Implementations} />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/Po"
        >
          <PoPendingTasks acceptance={Acceptance} />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/Invoice"
        >
          <InvoicePendingTasks payment={Payment} />
        </Link>
      </Grid>

      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/PoClosure"
        >
          <PoClosurePending />
        </Link>
      </Grid>
    </Grid>
  );
}
