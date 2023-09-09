import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { Stack, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import { showToast } from '../../utils/showToast';
// components
import { getAgencyTypes, createAgency } from '../../api/agency.api';




// ----------------------------------------------------------------------

export default function AgencyCreateForm() {
  const navigate = useNavigate();

  const location = useLocation();

  // console.log(typeof(location.state))
  const businessData = location.state

  const AgencySchema = Yup.object().shape({
    name: Yup.string().required('Agency name required'),
    contactPersonName: Yup.string().required('Full name required'),
    officePhoneNumber: Yup.string().required('Full name required'),
    agencyType: Yup.string().required('Please select an agency'),

  });

  const defaultValues = {
    name: '',
    contactPersonName: '',
    officePhoneNumber: '',
    agencyType: 'Tours'

  };

  const methods = useForm({
    resolver: yupResolver(AgencySchema),
    defaultValues,

  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // TODO  create Agency here

  const {
    data
  } = useQuery(["getAgencyTypes"], getAgencyTypes)

  // Create agency
  const { mutate: postCreateAgency, isLoading} = useMutation(createAgency, {
    onSuccess: (createAgencyResponse) => {
      if (createAgencyResponse.id) {
        showToast({ type: "Success", message: createAgencyResponse.message })
        navigate("/login")
      }
      else {
        showToast({ type: "error", message: createAgencyResponse.message })
      }
    }
  })

  const onSubmit = async (values) => {
    values = {
      ...values,
      businessName: businessData.businessName,
      brsNumber: businessData.brsNumber,
      officeLocationCity: businessData.officeLocationBuilding,
      officeLocationHouseNumber: businessData.officeLocationHouseNumber,
    }
    postCreateAgency(values)
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="name" label="Agency Name" />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="contactPersonName" label="Contact Person" />
        </Stack>

        <RHFTextField name="officePhoneNumber" label="Contact Person number" />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Agency Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Agency Types"
            { ...methods.register("agencyType")}
          >
            {data && data.map((agencyType) => <MenuItem key={agencyType} value={agencyType}>{agencyType}</MenuItem>)}
          </Select>
        </FormControl>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
          Next
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
