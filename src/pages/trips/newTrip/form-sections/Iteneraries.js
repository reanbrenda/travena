/* eslint-disable react/prop-types */
import { Button, Card, Stack, TextareaAutosize, TextField } from '@mui/material';
import { useState } from 'react';

const Iteneraries = (props) => {
  const { setOpenState, dispatch } = props;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const addItenerary = (addAnother) => {
    if (name && description) {
      dispatch({ name: 'addItenerary', value: { name, description } });
    }
    setName('');
    setDescription('');

    if (!addAnother) {
      setOpenState(false);
    }
  };

  return (
    <div className="slider-display">
      <div className="slider-display-header">
        <div className="slider-header-title">Create Itinerary</div>
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
            <TextField value={name} label="Name" fullWidth onChange={(e) => setName(e.target.value)} />
            <TextareaAutosize
              style={{ padding: 3 }}
              value={description}
              minRows={4}
              label="Description"
              placeholder="Description..."
              onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>
        </Card>
      </div>
    </div>
  );
};

export default Iteneraries;
