import * as Yup from 'yup';
import { useNavigate} from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useState } from 'react';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import { forgetPassword } from '../../api/user.api';
import { showToast } from '../../utils/showToast';

// ----------------------------------------------------------------------

export default function ForgetPasswordForm() {
  const navigate = useNavigate();

  const [emailS, setEmailS] = useState('')

  const ForgetPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Verification Code is required'),
    
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(ForgetPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
  } = methods;

  const onSubmit = async (values) => {
    await setEmailS(values.email)
    forgetPasswordFunction(values)
  };

  // do verify here
  const {mutate: forgetPasswordFunction, isLoading} = useMutation(forgetPassword,{
    onSuccess: (forgetPassResponse)=>{

      if(forgetPassResponse.status){
        showToast({type: 'success', message: forgetPassResponse.message})
        navigate('/reset-password', {state: { email: emailS}})
      }else{
        showToast({type: 'error', message: forgetPassResponse.message})
      }
    }
  })

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="email" label="Your Email" />
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
          Get Reset Code
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
