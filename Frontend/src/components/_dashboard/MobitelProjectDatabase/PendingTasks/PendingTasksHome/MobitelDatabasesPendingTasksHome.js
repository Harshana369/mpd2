// material
import { Container, Stack, TextField, Typography } from '@mui/material';
// components
import Page from '../../../../Page';
import CardLists from './CardLists';
// ----------------------------------------------------------------------

export default function MobitelDatabasesPendingTasksHome() {
  return (
    <Page title="Mobitel Projects Databases | Projects Management Database">
      <Container>
        <Typography variant="h6" gutterBottom>
          Mobitel Projects Pending Tasks
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 2 }}
        >
          <TextField
            style={{ float: 'right' }}
            sx={{ width: 200 }}
            size="small"
            id="outlined-select-currency"
            select
            // value={MobitelDropdownValue}
            // onChange={handleMobitelDropdownValue}
          >
            {/* {MobitelprojectNames.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))} */}
          </TextField>
        </Stack>
        <CardLists />
      </Container>
    </Page>
  );
}
