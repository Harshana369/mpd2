// material
import { Grid, Button, Card, Typography, Stack, Container, Link } from '@mui/material';
// components
import Page from '../../../Page';
import EditDatabase from './DataEditFormNew';
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------

export default function EditAllVendorProjectsDatabase() {
  return (
    <Page title="Vendor Projects Databases | Project Management Database system">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
        <Typography variant="h6" gutterBottom>
          All Vendor Projects Database - Edit Project
        </Typography>
      </Stack>
      <br />
      <Card>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="top" mb={1} />
          <Grid item xs={12} sm={12} md={12}>
            <EditDatabase />
          </Grid>
        </Container>
      </Card>
    </Page>
  );
}
