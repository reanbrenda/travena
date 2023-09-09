import * as Yup from 'yup';
import { useLocation, useNavigate} from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../components/hook-form';
import { verifyEmail } from '../../api/user.api';
import { showToast } from '../../utils/showToast';

// ----------------------------------------------------------------------

export default function VerifyEmailForm() {
  const navigate = useNavigate();

  const location = useLocation()
  const {userId } = location.state

  const VerifyEmailSchema = Yup.object().shape({
    verificationCode: Yup.string().required('Verification Code is required'),
   
    
  });

  const defaultValues = {
    verificationCode: '',
    userId,
  
  };

  const methods = useForm({
    resolver: yupResolver(VerifyEmailSchema),
    defaultValues,
  });

  const {
    handleSubmit,
  } = methods;

  const onSubmit = async (values) => {
    verifyEmailFunction(values)
  };

  // do verify here
  const {mutate: verifyEmailFunction, isLoading} = useMutation(verifyEmail,{
    onSuccess: (verifyEmailResponse)=>{

      if(verifyEmailResponse.status){
        showToast({type: 'success', message: verifyEmailResponse.message})
        navigate('/login')
      }else{
        showToast({type: 'error', message: verifyEmailResponse.message})
      }
    }
  })

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="verificationCode" label="Verification Code" />
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
          Verify
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
