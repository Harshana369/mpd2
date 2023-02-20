import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// --Horizontal project milestones bar chart on dashboard----------------------------------------

const CHART_DATA = [{ data: [330, 430, 348, 470, 540, 980] }];

export default function AppConversionRates1() {
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (sites) => fNumber(sites),
        title: {
          formatter: (sites) => `Sites`
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '20%', borderRadius: 4 }
    },
    xaxis: {
      categories: ['On Air', 'PAT', 'SAR', 'Commisioned', 'Installed', 'Mobilized']
    }
  });

  return (
    <Card>
      <CardHeader title="Project Milestone Completions" subheader="(+23%) than last year" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
