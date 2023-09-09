import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import { showToast } from '../../utils/showToast';
// components
import Iconify from '../../components/Iconify';




// ----------------------------------------------------------------------

export default function BusinessForm() {
  const navigate = useNavigate();

  const BusinessSchema = Yup.object().shape({
    businessName: Yup.string().required('Business name required'),
    brsNumber: Yup.string().required('Business number required'),
    officeLocationCity: Yup.string().required('City is required'),
    officeLocationBuilding: Yup.string().required('Office location is  required'),
    officeLocationHouseNumber: Yup.string().required('Business location house number required')

  });

  const defaultValues = {
    businessName: '',
    brsNumber: '',
    officeLocationCity: '',
    officeLocationBuilding: '',
    officeLocationHouseNumber: ''
   
  };

  const methods = useForm({
    resolver: yupResolver(BusinessSchema),
    defaultValues,

  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // pass  business data to next screen 

  const onSubmit = async (values) => {
    // console.log(values)
    navigate('/agency/create',{state: values})
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="businessName" label="Business" />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="brsNumber" label="Business Number" />
        </Stack>

        <RHFTextField name="officeLocationCity" label="Office / City ? Town" />
        <RHFTextField name="officeLocationBuilding" label="Office Building" />
        <RHFTextField name="officeLocationHouseNumber" label="Room Number" />

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Next
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
