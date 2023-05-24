import react, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import bugFilled from '@iconify/icons-eva/radio-outline';
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
  color: theme.palette.secondary.darker,
  backgroundColor: theme.palette.secondary.lighter
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
  color: theme.palette.secondary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.secondary.dark, 0)} 0%, ${alpha(
    theme.palette.secondary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------
export default function AppBugReports1({ handoverData }) {
  const [TOTAL, setTOTAL] = useState('0');

  const mobitelTilesDetails = useSelector((state) => state.mobileTilesData);

  const { loading, error, mobitelTilesData } = mobitelTilesDetails;

  useEffect(() => {
    if (Number.isNaN(Number(handoverData)) === false) {
      setTOTAL(handoverData);
    }
  }, [handoverData]);

  const handleClickOpen = () => {
    const newWindow = window.open(
      'https://projectonline.mobitel.lk/mpd/DatabasesMobitelProjects/AllMobitelHandoverData',
      'Scope Details',
      'width=1000px,height=400px'
    );
    newWindow.arrayData = mobitelTilesData.projectHandOverData;
  };

  return (
    <RootStyle>
      <IconWrapperStyle onClick={handleClickOpen}>
        <Icon icon={bugFilled} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{TOTAL}</Typography>
      <Typography variant="subtitle1" sx={{ opacity: 1 }}>
        Handover
      </Typography>
    </RootStyle>
  );
}
