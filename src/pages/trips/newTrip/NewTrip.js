/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
import { Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useReducer } from 'react';
import { getCookie } from '../../../utils/cookies';
import { Toast } from '../../../axios/Toast';
import { createTrip } from '../../../api/trips.api';
import tripFormReducer from './tripFormReducer';
import TripForm from './TripForm';

export default function NewTrip({ setOpenState, refetch }) {

  const { agencyId } = getCookie("UserInfo")

  const formData = new FormData();
  formData.set('agency', agencyId);

  const [state, dispatch] = useReducer(tripFormReducer, { formData, agency: agencyId });

  const postTrip = useMutation(['createTrip'], () => createTrip(state.formData), {
    onMutate: () => {
      Toast.loading('Loading, please wait...');
    },
    onError: () => {
      Toast.error('An error occurred');
    },
    onSuccess: (data) => {
      if (data.message) {
        Toast.error(data.message);
      } else {
        Toast.success('Trip created');
        refetch();
        setOpenState(false);
      }
    },
  });

  return (
    <div className="slider-display">
      <div className="slider-display-header">
        <div className="slider-header-title">Create Trip</div>
        <div className="slider-header-buttons">
          <Button
            variant="outlined"
            sx={{
              marginRight: 5,
            }}
            onClick={() => setOpenState(false)}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={() => postTrip.mutate()}>
            Save
          </Button>
        </div>
      </div>
      <div className="slider-display-body">
        <TripForm state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}
