/* eslint-disable react/prop-types */
import { Button, Card, Stack, TextareaAutosize, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import Iconify from '../../../../components/Iconify';

const TripCostPackages = (props) => {
  const { setOpenState, dispatch } = props;

  const [packageName, setPackageName] = useState('');
  const [packageCost, setPackageCost] = useState('');
  const [description, setDescription] = useState('');
  const [inclusions, setInclusions] = useState([]);

  const [inclusionTemp, setInclusionTemp] = useState('');

  const addCostPackage = (addAnother) => {
    if (packageName && packageCost) {
      dispatch({
        name: 'addPackageCost',
        value: { packageName, packageCost, packageDescription: description, inclusions },
      });
    }
    setPackageName('');
    setPackageCost('');
    setDescription('');
    setInclusions([])

    if (!addAnother) {
      setOpenState(false);
    }
  };

  return (
    <div className="slider-display">
      <div className="slider-display-header">
        <div className="slider-header-title">Add Cost Package</div>
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
            onClick={() => addCostPackage(true)}
          >
            Save & Add Another
          </Button>
          <Button variant="contained" onClick={() => addCostPackage(false)}>
            Save
          </Button>
        </div>
      </div>
      <div className="slider-display-body">
        <Card style={{ padding: 10}}>
          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                value={packageName}
                fullWidth
                label="Package name"
                required
                type="text"
                onChange={(e) => setPackageName(e.target.value)}
              />
              <TextField
                value={packageCost}
                fullWidth
                label="Package cost"
                required
                type="number"
                onChange={(e) => setPackageCost(e.target.value)}
              />
            </Stack>
            <TextareaAutosize
              style={{ padding: 3 }}
              value={description}
              minRows={3}
              label="Description"
              placeholder="Description..."
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
            <Typography>Extra Inclusions (if any)</Typography>
            {inclusions.map((inclusion, index) => (
              <Stack direction="row" key={`${index}`} alignContent="center" alignItems="center" spacing={5}>
                <Typography>#{index + 1}</Typography>
                  <TextField
                    type="text"
                    label="Inclusion"
                    value={inclusion}
                    onChange={(e) => {
                      setInclusionTemp(e.target.value);
                    }}
                    fullWidth
                    disabled
                  />
                <Iconify sx={{ fontSize: 25 }} icon="eva:close-outline" />
              </Stack>
            ))}

            <Stack direction="row" spacing={5} alignItems="center" sx={{ paddingBottom: 10 }}>
              <Typography variant='h5'>+</Typography>
            <TextField
                    type="text"
                    label="Add Inclusion"
                    value={inclusionTemp}
                    onChange={(e) => {
                      setInclusionTemp(e.target.value);
                    }}
                    fullWidth
                  />
                <Button
                  onClick={() => {
                    if (inclusionTemp) {
                      setInclusions([...inclusions, inclusionTemp]);
                      setInclusionTemp('');
                    }
                  }}
                >
                  Save
                </Button>
            </Stack>

          </Stack>
        </Card>
      </div>
    </div>
  );
};

export default TripCostPackages;
