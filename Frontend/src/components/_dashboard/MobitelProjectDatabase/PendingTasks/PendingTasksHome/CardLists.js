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

  const [Installation, setInstallation] = useState('0');
  const [Commission, setCommission] = useState('0');
  const [Pat, setPat] = useState('0');
  const [Sar, setSar] = useState('0');
  const [OnAir, setOnAir] = useState('0');
  const [MaterialReturn, setMaterialReturn] = useState('0');
  const [Pr, setPr] = useState('0');
  const [Po, setPo] = useState('0');
  const [Invoice, setInvoice] = useState('0');
  const [PoClosure, setPoClosure] = useState('0');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axiosInstance.get(`/mobitelProjectsDatabasesPendingTasks`);
    setInstallation(res.data.InstallationPendingTasks);
    setCommission(res.data.CommissioningPendingTasks);
    setPat(res.data.PatPendingTasks);
    setSar(res.data.SarPendingTasks);
    setOnAir(res.data.OnAirPendingTasks);
    setMaterialReturn(res.data.MaterialReturnPendingTasks);
    setPr(res.data.PrPendingTasks);
    setPo(res.data.PoPendingTasks);
    setInvoice(res.data.InvoicePendingTasks);
    setPoClosure(res.data.PoClosurePendingTasks);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/Installation"
        >
          <InstallationPendingTasks Installation={Installation} />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/Commissioning"
        >
          <CommissioningPendingTasks Commission={Commission} />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/Pat"
        >
          <PatPendingTasks Pat={Pat} />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/Sar"
        >
          <SarPendingTasks Sar={Sar} />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/OnAir"
        >
          <OnAirPendingTasks OnAir={OnAir} />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/MaterialReturn"
        >
          <MaterialReturnPendingTasks MaterialReturn={MaterialReturn} />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/Pr"
        >
          <PrPendingTasks Pr={Pr} />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/Po"
        >
          <PoPendingTasks Po={Po} />
        </Link>
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/Invoice"
        >
          <InvoicePendingTasks Invoice={Invoice} />
        </Link>
      </Grid>

      <Grid item xs={12} sm={6} md={2.4}>
        <Link
          underline="none"
          component={RouterLink}
          to="/dashboard/DatabasesMobitelProjects/PendingMobitelTasks/PoClosure"
        >
          <PoClosurePending PoClosure={PoClosure} />
        </Link>
      </Grid>
    </Grid>
  );
}
