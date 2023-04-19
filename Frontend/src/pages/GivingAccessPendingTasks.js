import { Container, Stack, Typography } from '@mui/material';
import React from 'react';
import Page from '../components/Page';
import AccessPendingTask from './AccessPendingTask';

function GivingAccessPendingTasks() {
  return (
    <Page title="Settings - Select Menu Options | Projects Management Database">
      <Container>
        <Typography variant="h6" gutterBottom>
          Grant permission to relevant users
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 2 }}
        />

        <AccessPendingTask />
      </Container>
    </Page>
  );
}

export default GivingAccessPendingTasks;
