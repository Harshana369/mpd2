import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function TransferList() {
  const myArray = [
    'Installation',
    'Commissioning',
    'OnAir',
    'Pat',
    'sar',
    'MaterialReturn',
    'Pr',
    'Po',
    'Invoice',
    'Po Closure'
  ];
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(myArray);
  const [right, setRight] = React.useState([]);
  const [chosen, setChosen] = React.useState([]);

  const [privillage, setPrivillage] = React.useState({});

  const handleChange = async (event) => {
    setPrivillage(event.target.value);
  };

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setChosen([...chosen, ...leftChecked]); // update the state with the new right array
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const updatePrivilegeLevel = async () => {
    const axiosInstance = await axios.create({ baseURL: process.env.REACT_APP_API_URL });
    const config = {
      chosen,
      headers: {
        'Content-Type': 'application/json' // set content type to JSON
      }
    };

    const response = axiosInstance.put(`/updatePendingTaskPrivilegeLevel/${privillage}`, config);
    console.log(response);
  };

  React.useEffect(() => {
    setChosen(right);
  }, [right]);
  const customList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected'
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto'
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="demo-simple-select-label">Privillage Level</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={privillage}
          label="Privillage"
          onChange={handleChange}
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Moderator">Moderator</MenuItem>
          <MenuItem value="Editor">Editor</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>{customList('Choices', left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList('Chosen', right)}</Grid>

        <Button onClick={updatePrivilegeLevel} variant="contained" sx={{ mt: 54 }}>
          Save
        </Button>
      </Grid>
    </>
  );
}
