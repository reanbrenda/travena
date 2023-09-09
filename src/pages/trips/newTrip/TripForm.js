/* eslint-disable no-plusplus */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  FormControl,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Iconify from '../../../components/Iconify';
import SliderModal from '../../../components/slider-modal/SliderModal';
import TripCalendar from './form-sections/Calendar';
import TripCostPackages from './form-sections/CostPackages';
import TripExclusions from './form-sections/Exclusions';
import TripServices from './form-sections/Inclusions';
import Iteneraries from './form-sections/Iteneraries';
import { getTripCategories } from '../../../api/trips.api';

const ITENERARIES_TABLE_HEADER = [
  { id: 'index', label: '#', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'actions', label: '', alignRight: false },
];

const SERVICES_TABLE_HEADER = [
  { id: 'index', label: '#', alignRight: false },
  { id: 'service', label: 'Service' },
  { id: 'actions', label: '', alignRight: false },
];

const EXCLUSIONS_TABLE_HEADER = [
  { id: 'index', label: '#', alignRight: false },
  { id: 'exclusion', label: 'Exclusion' },
  { id: 'actions', label: '', alignRight: false },
];

const PACKAGES_TABLE_HEADER = [
  { id: 'index', label: '#', alignRight: false },
  { id: 'name', label: 'Package Name', alignRight: false },
  { id: 'cost', label: 'Package Cost', alignRight: false },
  { id: 'inclusions', label: 'Extras', alignRight: false },
  { id: 'actions', label: '', alignRight: false },
];

const CALENDAR_TABLE_HEADER = [
  { id: 'index', label: '#', alignRight: false },
  { id: 'startDate', label: 'Start Date', alignRight: false },
  { id: 'endDate', label: 'End Date', alignRight: false },
  { id: 'actions', label: '', alignRight: false },
];

export default function TripForm(props) {
  const { state, dispatch } = props;

  const iteneraries = state.tripIteneraries || [];
  const services = state.tripServices || [];
  const exclusions = state.tripExclusions || [];
  const costPackages = state.tripCostPackages || [];
  const tripCalendar = state.tripCalendar || [];
  const destinationImagery = state.destinationImagery || [];

  const tripStatuses = ['ACTIVE', 'INACTIVE'];

  const [itenerariesFormOpen, setItenerariesFormOpen] = useState(false);
  const [servicesFormOpen, setServicesFormOpen] = useState(false);
  const [exclusionFormOpen, setExclusionFormOpen] = useState(false);
  const [tripCostPackagesOpen, setTripCostPackagesOpen] = useState(false);
  const [calendarFormOpen, setCalendarFormOpen] = useState(false);

  const { data: categories } = useQuery(['getCategories'], () => getTripCategories());

  return (
    <div>
      <Card sx={{ padding: 3 }}>
        <Typography variant="h6" sx={{ marginBottom: 3 }}>
          General Details
        </Typography>
        <Stack direction="column" spacing={3}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <TextField
              type="text"
              label="Trip Destination"
              value={state.destinationName || ''}
              onChange={(e) => dispatch({ name: 'destinationName', value: e.target.value })}
              fullWidth
            />
            <TextField
              type="text"
              label="Destination country"
              value={state.destinationCountry || ''}
              onChange={(e) => dispatch({ name: 'destinationCountry', value: e.target.value })}
              fullWidth
            />
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <TextField
              type="text"
              label="Trip title"
              value={state.tripTitle || ''}
              onChange={(e) => dispatch({ name: 'tripTitle', value: e.target.value })}
              fullWidth
            />
            <TextField
              type="number"
              label="Available Slots"
              value={state.tripAvailableSlots || ''}
              onChange={(e) => dispatch({ name: 'tripAvailableSlots', value: e.target.value })}
              fullWidth
            />
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="st-label">Status</InputLabel>
              <Select
                value={state.tripStatus || ''}
                onChange={(e) => dispatch({ name: 'tripStatus', value: e.target.value })}
                label="Status"
                labelId="st-label"
                fullWidth
              >
                <MenuItem disabled>{''}</MenuItem>
                {tripStatuses.map((sts) => (
                  <MenuItem key={sts} value={sts}>
                    {sts}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="pb-label">Allow partial booking</InputLabel>
              <Select
                label="Allow partial booking"
                value={state.allowPartialBooking ? 'Yes' : 'No'}
                onChange={(e) => dispatch({ name: 'allowPartialBooking', value: e.target.value === 'Yes' })}
                labelId="pb-label"
                fullWidth
              >
                <MenuItem value={'Yes'}>Yes</MenuItem>
                <MenuItem value={'No'}>No</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack>
            <FormControl>
              <InputLabel id="cat-label">Trip Categories</InputLabel>
              <Select
                type="text"
                label="Trip Categories"
                labelId="cat-label"
                value={state.tripCategories || ['All']}
                onChange={(e) => {
                  dispatch({ name: 'tripCategories', value: e.target.value });
                }}
                fullWidth
                multiple
              >
                {categories?.map((category) => (
                  <MenuItem key={category.categoryName} value={category.categoryName}>
                    {category.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack>
            <TextareaAutosize
              style={{ padding: 3 }}
              minRows={4}
              label="Description"
              placeholder="Description..."
              value={state.tripDescription || ''}
              onChange={(e) => dispatch({ name: 'tripDescription', value: e.target.value })}
            />
          </Stack>
        </Stack>
      </Card>

      <Card sx={{ padding: 3, marginTop: 3 }}>
        <Stack direction="column" spacing={3}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle1" sx={{ marginBottom: 3 }}>
              Iteneraries
            </Typography>

            <Button variant="outlined" onClick={() => setItenerariesFormOpen(true)}>
              Add Itenerary
            </Button>
          </Stack>

          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  {ITENERARIES_TABLE_HEADER.map((row) => (
                    <TableCell key={row.id}>
                      <Typography variant="subtitle1">{row.label}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
                {iteneraries.map((itenerary, index) => (
                  <TableRow key={itenerary.name} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{itenerary.name}</TableCell>
                    <TableCell>{itenerary.description}</TableCell>
                    <TableCell>
                      <Iconify
                        sx={{
                          fontSize: 25,
                        }}
                        icon="eva:close-outline"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Card>

      <Card sx={{ padding: 3, marginTop: 3 }}>
        <Stack direction="column" spacing={3}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle1" sx={{ marginBottom: 3 }}>
              Services Included
            </Typography>

            <Button variant="outlined" onClick={() => setServicesFormOpen(true)}>
              Add Service
            </Button>
          </Stack>

          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  {SERVICES_TABLE_HEADER.map((row) => (
                    <TableCell key={row.id}>
                      <Typography variant="subtitle1">{row.label}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
                {services.map((service, index) => (
                  <TableRow key={service} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{service}</TableCell>
                    <TableCell>
                      <Iconify
                        sx={{
                          fontSize: 25,
                        }}
                        icon="eva:close-outline"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Card>

      <Card sx={{ padding: 3, marginTop: 3 }}>
        <Stack direction="column" spacing={3}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle1" sx={{ marginBottom: 3 }}>
              Exclusions
            </Typography>

            <Button variant="outlined" onClick={() => setExclusionFormOpen(true)}>
              Add Exclusion
            </Button>
          </Stack>

          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  {EXCLUSIONS_TABLE_HEADER.map((row) => (
                    <TableCell key={row.id}>
                      <Typography variant="subtitle1">{row.label}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
                {exclusions.map((exclusion, index) => (
                  <TableRow key={exclusion} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{exclusion}</TableCell>
                    <TableCell>
                      <Iconify
                        sx={{
                          fontSize: 25,
                        }}
                        icon="eva:close-outline"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Card>

      <Card sx={{ padding: 3, marginTop: 3 }}>
        <Stack direction="column" spacing={3}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle1" sx={{ marginBottom: 3 }}>
              Cost Packages
            </Typography>

            <Button variant="outlined" onClick={() => setTripCostPackagesOpen(true)}>
              Add Package
            </Button>
          </Stack>

          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  {PACKAGES_TABLE_HEADER.map((row) => (
                    <TableCell key={row.id}>
                      <Typography variant="subtitle1">{row.label}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
                {costPackages.map((costPackage, index) => (
                  <TableRow key={costPackage.name} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{costPackage.packageName}</TableCell>
                    <TableCell>{costPackage.packageCost}</TableCell>
                    <TableCell>
                      {costPackage?.inclusions?.map((inc) => (
                        <Typography key={inc}>{inc}</Typography>
                      ))}
                    </TableCell>
                    <TableCell>
                      <Iconify
                        sx={{
                          fontSize: 25,
                        }}
                        icon="eva:close-outline"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Card>

      <Card sx={{ padding: 3, marginTop: 3 }}>
        <Stack direction="column" spacing={3}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle1" sx={{ marginBottom: 3 }}>
              Calendar
            </Typography>

            <Button variant="outlined" onClick={() => setCalendarFormOpen(true)}>
              Add Calendar
            </Button>
          </Stack>

          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  {CALENDAR_TABLE_HEADER.map((row) => (
                    <TableCell key={row.id}>
                      <Typography variant="subtitle1">{row.label}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
                {tripCalendar.map((calendar, index) => (
                  <TableRow key={`${index}`} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{calendar.startDate}</TableCell>
                    <TableCell>{calendar.endDate}</TableCell>
                    <TableCell>
                      <Iconify
                        sx={{
                          fontSize: 25,
                        }}
                        icon="eva:close-outline"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Card>

      <Card sx={{ padding: 3, marginTop: 3 }}>
        <Stack direction="column" spacing={3}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle1" sx={{ marginBottom: 3 }}>
              Feature Image
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={3}>
            <img
              style={{ height: 120, width: 250 }}
              src={
                state.featureImage
              }
              alt="Not Saved"
            />
            <TextField
              type="file"
              label="Add or Change Feature Image"
              accept="image/*"
              onChange={(e) => dispatch({ name: 'addFeatureImage', value: e.target.files[0] })}
            />
          </Stack>
        </Stack>
      </Card>

      <Card sx={{ padding: 3, marginTop: 3 }}>
        <Stack direction="column" spacing={3}>
          <Typography variant="subtitle1">
            Imagery
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <ImageList>
              {destinationImagery.map((image) => (
                <ImageListItem key={image}>
                  <img src={image} loading="lazy" alt="Imagery" />
                  <ImageListItemBar
                    title=""
                    subtitle=""
                    actionIcon={
                      <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }} aria-label="Remove">
                        <Iconify icon="cancel" />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Stack>
          <Typography>Add Images</Typography>
          <Input
            id="assets"
            name="assets"
            type="file"
            accept="image/*"
            inputProps={{ multiple: true }}
            onChange={(e) => {
              const fileCount = e.target.files.length;
              for (let i = 0; i < fileCount; i++) {
                dispatch({ name: 'addImagery', value: e.target.files[i] });
              }
            }}
          />
        </Stack>
      </Card>

      <SliderModal from="bottom" height={75} openState={itenerariesFormOpen} setOpenState={setItenerariesFormOpen}>
        <Iteneraries setOpenState={setItenerariesFormOpen} dispatch={dispatch} />
      </SliderModal>

      <SliderModal from="bottom" height={75} openState={servicesFormOpen} setOpenState={setServicesFormOpen}>
        <TripServices setOpenState={setServicesFormOpen} dispatch={dispatch} />
      </SliderModal>

      <SliderModal from="bottom" height={75} openState={exclusionFormOpen} setOpenState={setExclusionFormOpen}>
        <TripExclusions setOpenState={setExclusionFormOpen} dispatch={dispatch} />
      </SliderModal>

      <SliderModal from="bottom" height={75} openState={tripCostPackagesOpen} setOpenState={setTripCostPackagesOpen}>
        <TripCostPackages setOpenState={setTripCostPackagesOpen} dispatch={dispatch} />
      </SliderModal>

      <SliderModal from="bottom" height={75} openState={calendarFormOpen} setOpenState={setCalendarFormOpen}>
        <TripCalendar setOpenState={setCalendarFormOpen} dispatch={dispatch} />
      </SliderModal>
    </div>
  );
}
