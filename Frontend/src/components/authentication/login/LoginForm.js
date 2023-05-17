import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import CryptoJS from 'react-native-crypto-js';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Button,
  Typography,
  Grid,
  Alert
} from '@mui/material';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const { data } = await axios.post(
        'https://projectonline.mobitel.lk/projonline/login',
        { username, password },
        config
      );

      localStorage.setItem('auth', data.accessToken);
      localStorage.setItem('user', data.name);
      localStorage.setItem('visbility', data.visbilityBasedOn);

      console.log(data);

      navigate('/dashboard/home');
    } catch (error) {
      setError(error.response.data.error);
      console.log(error.response.data.error);
    }
  };

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .matches(/^\w+$/, 'UserName must contain only letters, numbers or underscores')
      .required('UserName is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      navigate('/dashboard');
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            {error && (
              <Grid item xs={12} sm={6} md={12}>
                <Accordion
                  sx={{
                    backgroundColor: '#c20202',
                    borderRadius: 0.2,
                    alignItems: 'center'
                  }}
                >
                  <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                    <Typography variant="h8" justifyContent="space-between">
                      <span className="error-message">{error}</span>
                    </Typography>
                  </AccordionSummary>
                </Accordion>
              </Grid>
            )}
          </Stack>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="off"
              size="large"
              type="text" // change the type to 'text'
              label="UserName"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              error={error}
            />

            <TextField
              fullWidth
              autoComplete="off"
              size="large"
              // autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              // {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={error}
            />
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <FormControlLabel
              control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
              label="Remember me"
            />

            <Link component={RouterLink} variant="subtitle2" to="#">
              Forgot password?
            </Link>
          </Stack>

          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={(e) => {
              loginHandler(e);
            }}
            // loading={isSubmitting}
          >
            Login
          </Button>
        </Form>
      </FormikProvider>
    </>
  );
}
