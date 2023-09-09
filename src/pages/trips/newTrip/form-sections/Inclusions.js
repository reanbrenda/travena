/* eslint-disable react/prop-types */
import { Button, Card, Stack, TextareaAutosize, TextField } from '@mui/material';
import { useState } from 'react';

const TripServices = (props) => {
  const { setOpenState, dispatch } = props;

  const [service, setService] = useState('');

  const addItenerary = (addAnother) => {
    if (service) {
      dispatch({ name: 'addService', value: service});
    }
    setService('');

    if (!addAnother) {
      setOpenState(false);
    }
  };

  return (
    <div className="slider-display">
      <div className="slider-display-header">
        <div className="slider-header-title">Add Service</div>
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
            onClick={() => addItenerary(true)}
          >
            Save & Add Another
          </Button>
          <Button variant="contained" onClick={() => addItenerary(false)}>
            Save
          </Button>
        </div>
      </div>
      <div className="slider-display-body">
        <Card style={{ padding: 10 }}>
          <Stack direction="column" spacing={2}>
            <TextareaAutosize
              style={{ padding: 3 }}
              value={service}
              minRows={3}
              label="Service"
              placeholder="Servive..."
              onChange={(e) => setService(e.target.value)}
              fullWidth
            />
          </Stack>
        </Card>
      </div>
    </div>
  );
};

export default TripServices;
