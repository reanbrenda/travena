/* eslint-disable react/prop-types */
import { Button, Card, Stack, TextField } from '@mui/material';
import { useState } from 'react';

const TripCalendar = (props) => {
  const { setOpenState, dispatch } = props;

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const addCalendar = (addAnother) => {
    if (startDate && endDate) {
      dispatch({ name: 'addCalendar', value: { startDate, endDate} });
    }
    setStartDate('');
    setEndDate('');

    if (!addAnother) {
      setOpenState(false);
    }
  };

  return (
    <div className="slider-display">
      <div className="slider-display-header">
        <div className="slider-header-title">Add Calendar</div>
        <div className="slider-header-buttons">
          <Button
            variant="outlined"
            sx={{
              marginRight: 3,
            }}
            onClick={() => setOpenState(false)}
          >
            Cancel
          </Button>
          <Button
            sx={{
              marginRight: 3,
            }}
            variant="contained"
            onClick={() => addCalendar(true)}
          >
            Save & Add Another
          </Button>
          <Button variant="contained" onClick={() => addCalendar(false)}>
            Save
          </Button>
        </div>
      </div>
      <div className="slider-display-body">
        <Card style={{ padding: 10 }}>
            <Stack direction="row" spacing={2}>
              <TextField
                value={startDate}
                fullWidth
                label="Start Date"
                required
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
              />
              <TextField
                value={endDate}
                fullWidth
                label="Ending Date"
                required
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Stack>
        </Card>
      </div>
    </div>
  );
};

export default TripCalendar;
