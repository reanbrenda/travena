import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { IconButton, InputAdornment, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useState } from 'react';
import Iconify from '../../components/Iconify';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import { resetPassword } from '../../api/user.api';
import { showToast } from '../../utils/showToast';

// ----------------------------------------------------------------------

export default function ResetPasswordForm() {
  const navigate = useNavigate();

  const location = useLocation();
  const { email } = location.state

  console.log("STATE :::",location.state);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);

  const VerifyEmailSchema = Yup.object().shape({
    resetCode: Yup.string().required('Verification Code is required'),
  });

  const defaultValues = {
    resetCode: '',
    newPassword: '',
    email

  };

  const methods = useForm({
    resolver: yupResolver(VerifyEmailSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values) => {
    resetPasswordFunction(values);
  };

  // do verify here
  const { mutate: resetPasswordFunction, isLoading } = useMutation(resetPassword, {
    onSuccess: (resetPassResponse) => {
      if (resetPassResponse.status) {
        showToast({ type: 'success', message: resetPassResponse.message });
        navigate('/login');
      } else {
        showToast({ type: 'error', message: resetPassResponse.message });
      }
    },
  });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="resetCode" label="Reset Code" />
        </Stack>

        <RHFTextField
            name="newPassword"
            label="New Password"
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
          <RHFTextField
            name="confPass"
            label="Confirm New Password"
            type={showConfPass ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfPass(!showConfPass)} edge="end">
                    <Iconify icon={showConfPass ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
          Reset Password
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
