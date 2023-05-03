/* eslint-disable */

import React from 'react';
import axios from 'axios';

import {
  DataGrid,
  GridToolbarDensitySelector,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
  gridPaginatedVisibleSortedGridRowIdsSelector,
  gridSortedRowIdsSelector,
  gridVisibleSortedRowIdsSelector,
  useGridApiContext,
  useGridApiRef,
  GridColDef,
  GridApi,
  GridCellValue
} from '@mui/x-data-grid';
import { createSvgIcon } from '@mui/material/utils';
import { Box, CircularProgress, Grid, Stack } from '@mui/material';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useSelector } from 'react-redux';
import { fetchMobitelPendingTaskData } from '../../../../../Redux/Action/mobitelAction';
import { useDispatch } from 'react-redux';

/* eslint-disable camelcase */

const ExportIcon = createSvgIcon(
  <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
  'SaveAlt'
);

const useDummyMutation = () =>
  React.useCallback(
    (post) =>
      new Promise((resolve) =>
        setTimeout(() => {
          resolve(post);
        }, 500)
      ),
    []
  );

export default function Datagrid({ DropDownValue, ProjectNameDropdownValue }) {
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  const apiRef = useGridApiRef();
  const [pageSize, setPageSize] = React.useState(10);
  const [snackbar, setSnackbar] = React.useState(null);
  const [column, setColumn] = React.useState([]);

  const dispatch = useDispatch();

  let storedFullName = localStorage.getItem('fullName');
  if (storedFullName === 'Admin Name') {
    storedFullName = 'All Site Engineers';
  }

  // ----------
  const [tableReplace, setTableReplace] = React.useState(false);
  const [tablePass, setTablePass] = React.useState([]);
  const [objId, setObjId] = React.useState();

  const handleCloseSnackbar = () => setSnackbar(null);

  const mobitelPendingTaskDetails = useSelector((state) => state.mobitelPendingTaskData);

  const { mobitelPendingTaskDataLoading, mobitelPendingTaskData, mobitelPendingTaskDataError } =
    mobitelPendingTaskDetails;

  // ---------------------------------------------------------

  const getRowsFromCurrentPage = ({ apiRef }) =>
    gridPaginatedVisibleSortedGridRowIdsSelector(apiRef);

  const getUnfilteredRows = ({ apiRef }) => gridSortedRowIdsSelector(apiRef);

  const getFilteredRows = ({ apiRef }) => gridVisibleSortedRowIdsSelector(apiRef);

  const ExportIcon = createSvgIcon(
    <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
    'SaveAlt'
  );

  const Columns = [
    {
      field: 'Task_Ref',
      headerName: 'Task Ref',
      headerClassName: 'super-app-theme--header',
      align: 'left',
      width: 200,
      editable: true,
      hide: true,
      cellClassName: 'super-app-theme--cell'
    },
    {
      field: 'Site_Id',
      headerName: 'Site Id',
      headerClassName: 'super-app-theme--header',
      align: 'left',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell'
    },
    {
      field: 'Site_Name',
      headerName: 'Site Name',
      headerClassName: 'super-app-theme--header',
      align: 'left',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell'
    },
    {
      field: 'Handover',
      headerName: 'Handover',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell'
    },
    {
      field: 'Project',
      headerName: 'Project',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell'
    },
    {
      field: 'Scope',
      headerName: 'Scope',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell'
    },
    {
      field: 'Site_Engineer',
      headerName: 'Site Engineer',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell'
    },
    {
      field: 'Sub_Contractor',
      headerName: 'Sub Contractor',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell'
    },
    {
      field: 'Task_Category',
      headerName: 'Task Category',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell'
    },
    {
      field: 'Task_Assigned',
      headerName: 'Task Assigned',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell'
    },
    {
      field: 'Task_Commenced',
      headerName: 'Task Commenced',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell'
    },
    {
      field: 'Installation_Completed',
      headerName: 'Installation Completed',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell'
    },

    {
      field: 'Commission',
      headerName: 'Commission',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell'
    },
    {
      field: 'Submit_PAT',
      headerName: 'Submit PAT',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell'
    },

    {
      field: 'PAT_Pass',
      headerName: 'PAT Pass',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell'
    },
    {
      field: 'Submit_SAR',
      headerName: 'Submit SAR',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell'
    },
    {
      field: 'SAR_Pass',
      headerName: 'SAR Pass',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell'
    },
    {
      field: 'On_air',
      headerName: 'On air',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell'
    },
    {
      field: 'BOQ_Submit',
      headerName: 'BOQ Submit',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell'
    },
    {
      field: 'BOQ_Approve',
      headerName: 'BOQ Approve',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell'
    },
    {
      field: 'PR_Raise',
      headerName: 'PR Raise',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell'
    },

    {
      field: 'Material_Return',
      headerName: 'Material Return',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell'
    },
    {
      field: 'PO_issue',
      headerName: 'PO issue',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell'
    },
    {
      field: 'Submit_Invoice',
      headerName: 'Submit Invoice',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell'
    },
    {
      field: 'Approve_Invoice',
      headerName: 'Approve Invoice',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell'
    },
    {
      field: 'Payment',
      headerName: 'Payment',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      editable: true,
      cellClassName: 'super-app-theme--cell'
    },
    {
      field: 'PO_closure',
      headerName: 'PO closure',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      editable: true
    },
    {
      field: 'action',
      headerName: 'Action',
      headerClassName: 'super-app-theme--header',
      sortable: false,
      width: 250,
      renderCell: ({ api, getValue, id }) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const thisRow = {};
          api
            .getAllColumns()
            .filter(({ field }) => field !== '__check__' && !!field)
            .forEach(({ field }) => (thisRow[field] = getValue(id, field)));

          setTablePass(thisRow);
          setTableReplace(true);
        };

        return (
          <Button onClick={onClick} variant="contained" color="primary">
            To Complete
          </Button>
        );
      }
    }
  ];

  // -------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------

  const CustomToolbar = () => {
    const apiRef = useGridApiContext();

    const handleExport = (options) => apiRef.current.exportDataAsCsv(options);

    const buttonBaseProps = {
      color: 'primary',
      size: 'small',
      startIcon: <ExportIcon />
    };

    return (
      <GridToolbarContainer>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
            mb={0}
          >
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <Button
              {...buttonBaseProps}
              onClick={() => handleExport({ getRowsToExport: getUnfilteredRows })}
            >
              All Database
            </Button>
            <Button
              {...buttonBaseProps}
              onClick={() => handleExport({ getRowsToExport: getFilteredRows })}
            >
              Filtered
            </Button>
            <Button
              {...buttonBaseProps}
              onClick={() => handleExport({ getRowsToExport: getRowsFromCurrentPage })}
            >
              Current page
            </Button>
          </Stack>
        </Stack>
      </GridToolbarContainer>
    );
  };

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({});

  const handleChange = (event) => {
    setColumnVisibilityModel({
      ...columnVisibilityModel,
      [event.target.name]: event.target.checked
    });
  };

  const getData = async () => {
    await axiosInstance.get('/installationPendingColumnGet').then((res) => {
      setColumnVisibilityModel(res.data);
    });
  };

  const updateColumn = async () => {
    await axiosInstance.put('/installationPendingColumnEdit', columnVisibilityModel);
  };

  const updateInstallation = async () => {
    await axiosInstance.put('/updateInstalling', tablePass);
  };

  React.useEffect(() => {
    dispatch(fetchMobitelPendingTaskData(storedFullName));
    getData();
  }, [dispatch]);

  React.useEffect(() => {
    updateColumn();
  }, [columnVisibilityModel]);

  React.useEffect(() => {
    updateInstallation();
  }, [tablePass, dispatch]);

  React.useEffect(() => {
    // dispatch(fetchMobitelPendingTaskData(storedFullName));
    setTableReplace(false);
  }, [tableReplace]);

  return (
    <>
      <Grid container style={{ height: '100%', overflow: 'auto' }}>
        <Grid item xs={12}>
          {mobitelPendingTaskDataLoading ? (
            <CircularProgress color="success" />
          ) : mobitelPendingTaskDataError ? (
            <h1>error...</h1>
          ) : (
            <Box
              sx={{
                height: 515,
                width: '100%',
                '& .super-app-theme--header': {
                  backGridolor: 'rgba(0,0,0,0)',
                  color: 'rgb(198,198,198)',
                  fontWeight: '600'
                },
                '& .super-app-theme--cell': {
                  backGridolor: 'rgba(0,0,0,0)',
                  color: 'rgb(128,128,128)',
                  fontWeight: '200'
                }
              }}
            >
              <DataGrid
                apiRef={apiRef}
                rows={mobitelPendingTaskData.InstallationPendingTasks || []}
                getRowId={(row) => row._id}
                columns={Columns}
                components={{ Toolbar: CustomToolbar }}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20, 50, 100]}
                pagination
                density="compact"
                disableSelectionOnClick
                checkboxSelection
                editMode="row"
                sx={{
                  boxShadow: 0,
                  border: 0.1,
                  borderColor: 'secondary.main',
                  '& .MuidataGrid-cell:hover': {
                    color: 'secondary.main'
                  }
                }}
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
              />
              {!!snackbar && (
                <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={5000}>
                  <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
}
