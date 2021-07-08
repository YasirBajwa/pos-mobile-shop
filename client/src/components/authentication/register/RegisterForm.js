import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name,setName] = useState('');
  const [shopName,setShopName] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [city,setCity] = useState('');
  const [address,setAddress] = useState('');
  const [password,setPassword] = useState('');


  const changeName = (e) =>{setName(e.target.value)}
  const changeShopName = (e) =>{setShopName(e.target.value)}
  const changePhoneNumber = (e) =>{setPhoneNumber(e.target.value)}
  const changeAddress = (e) =>{setAddress(e.target.value)}
  const changeCity = (e) =>{setCity(e.target.value)}

  const changePassword = (e) =>{setPassword(e.target.value)}



  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const userRegister = () =>{
    console.log('name',name);
    console.log('Shopname',shopName);
    console.log('num',phoneNumber);
    console.log('city',city);
    console.log('address',address);
    console.log('password',password);

  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Name"
              {...getFieldProps('firstName')}
              value={name}
              onChange={(e) => changeName(e)}
              // error={Boolean(touched.firstName && errors.firstName)}
              // helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Shop Name"
              {...getFieldProps('lastName')}
              value={shopName}
              onChange={(e) => changeShopName(e)}
              // error={Boolean(touched.lastName && errors.lastName)}
              // helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="number"
            label="Phone Number"
            {...getFieldProps('email')}
            value={phoneNumber}
              onChange={(e) => changePhoneNumber(e)}
            // error={Boolean(touched.email && errors.email)}
            // helperText={touched.email && errors.email}
          />
          
  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="City"
              {...getFieldProps('firstName')}
              value={city}
              onChange={(e) => changeCity(e)}
              // error={Boolean(touched.firstName && errors.firstName)}
              // helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Address"
              {...getFieldProps('lastName')}
              value={address}
              onChange={(e) => changeAddress(e)}
              // error={Boolean(touched.lastName && errors.lastName)}
              // helperText={touched.lastName && errors.lastName}
            />
          </Stack>
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            value={password}
              onChange={(e) => changePassword(e)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            // error={Boolean(touched.password && errors.password)}
            // helperText={touched.password && errors.password}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            onClick={userRegister}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
