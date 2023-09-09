import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';


// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { setCookie } from '../../utils/cookies';
import { showToast } from '../../utils/showToast';
import { loginUser } from '../../api/user.api';

// components
import Iconify from '../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../components/hook-form';


// ----------------------------------------------------------------------

export default function LoginForm() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit, 
  } = methods;


  const loginFunction = useMutation(['login'], loginUser, {
    onSuccess: (data) => {

      data.expiresAt = +new Date() + (7 * 24 * 60 * 60 * 1000);

      setCookie("UserInfo", data, data.expiresAt, true)

      if (data.status) {
        if(data.agencyId){
          navigate("/dashboard/app", { replace: true })
        }else{
          navigate("/business/create", { replace: true })
        }

      }else if(data.message ==="Account Not Verified"){
        navigate("/verify",{state: data.userdata.userId})
      } else {
        showToast({ type: "error", message: data.message })
      }
    },
    onError: (err) => {
      console.log(err);
    }

  })

  const onSubmit = async (values) => {
    loginFunction.mutate(values)
  };

  const onInvalid = async (err) => {
    console.log(err);
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit, onInvalid)}>

      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover" component={RouterLink} to="/forget-password">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loginFunction.isLoading}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
