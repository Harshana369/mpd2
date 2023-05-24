import react, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import site from '@iconify/icons-eva/radio-outline';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  width: theme.spacing(25),
  height: theme.spacing(27),
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------
export default function AppNewUsers({ onAirData }) {
  const [TOTAL, setTOTAL] = useState('0');

  const mobitelTilesDetails = useSelector((state) => state.mobileTilesData);

  const { loading, error, mobitelTilesData } = mobitelTilesDetails;

  const handleClickOpen = () => {
    const newWindow = window.open(
      'https://projectonline.mobitel.lk/mpd/DatabasesMobitelProjects/AllMobitelOnAirData',
      'Scope Details',
      'width=1000px,height=400px'
    );
    newWindow.arrayData = mobitelTilesData.projectsOnAirData;
  };

  useEffect(() => {
    if (Number.isNaN(Number(onAirData)) === false) {
      setTOTAL(onAirData);
    }
  }, [onAirData]);

  return (
    <RootStyle>
      <IconWrapperStyle onClick={handleClickOpen}>
        <Icon icon={site} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{TOTAL}</Typography>
      <Typography variant="subtitle1" sx={{ opacity: 1 }}>
        On Air
      </Typography>
    </RootStyle>
  );
}
