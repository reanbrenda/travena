/* eslint-disable react/prop-types */
import { Button } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useReducer } from 'react';
import { getTrip, updateTrip } from "../../../api/trips.api";
import tripFormReducer from '../newTrip/tripFormReducer';
import TripForm from '../newTrip/TripForm';

export default function TripDetails({ setOpenState, trip }) {

  const [state, dispatch] = useReducer(tripFormReducer, trip);

  const putTrip = useMutation(["updateTrip"], () => updateTrip(state))

  // const {
  //   data: _
  // } = useQuery(["getTripDetails"], () => getTrip(tripId), {
  //   onSuccess: (da) => dispatch({name: "setCurrent", value: da})
  // })

  return (
    <div className="slider-display">
      <div className="slider-display-header">
        <div className="slider-header-title">Trip Details</div>
        <div className="slider-header-title">{state.tripName}</div>
        <div className="slider-header-buttons">
          <Button variant="outlined" sx={{ marginRight: 3}} onClick={() => setOpenState(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => putTrip()}>Save</Button>
        </div>
      </div>
      <div className="slider-display-body">
        <TripForm state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}
