import { sentenceCase } from 'change-case';
import React, { useState } from 'react';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TableHead,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
// components
import { useQuery } from '@tanstack/react-query';
import TripDetails from './tripDetails/TripDetails';
import { getAgencyTrips } from '../../api/trips.api';
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import SliderModal from '../../components/slider-modal/SliderModal';
import NewTrip from './newTrip/NewTrip';
import pallete from '../../theme/palette';

// ----------------------------------------------------------------------

const TABLE_HEADS = [
  { label: 'Destination' },
  { label: 'Title' },
  { label: 'Packages' },
  { label: 'Categories' },
  { label: 'Status' },
  { label: 'Actions' },
];

export default function AgencyTrips() {
  const [page, setPage] = useState(0);

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(25);

  const [filteredTrips, setFilteredTrips] = useState([]);

  const [nothingFound, setNothingFound] = useState(false);

  const [tripsList, setTripsList] = useState([]);

  const [newTripFormOpen, setNewTripFormOpen] = useState(false);

  const [tripDetailsOpen, setTripDetailsOpen] = useState(false);

  const [selectedTrip, setSelectedTrip] = useState({});

  const { refetch } = useQuery(['getAgencyTrips'], () => getAgencyTrips(), {
    onSuccess: (da) => {
      setTripsList(da);
      setFilteredTrips(da);
      setNothingFound(da.length === 0);
    },
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tripsList.length) : 0;

  return (
    <>
      <Page title="Trips">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Trips
            </Typography>
            <Button
              variant="contained"
              onClick={() => setNewTripFormOpen(true)}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Trip
            </Button>
          </Stack>

          <Card>
            <OutlinedInput
              value={filterName}
              onChange={(e) => {
                setFilterName(e.target.value);
              }}
              sx={{
                margin: 3,
              }}
              placeholder="Search..."
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              }
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <TableHead
                    sx={{
                      backgroundColor: '#f2f2f2',
                    }}
                  >
                    <TableRow>
                      {TABLE_HEADS.map((header) => (
                        <TableCell key={header.label}>{header.label}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTrips.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const {
                        id,
                        destinationName,
                        tripTitle,
                        tripCategories,
                        tripCostPackages,
                        tripStatus,
                        featureImage,
                      } = row;

                      return (
                        <TableRow hover key={id} tabIndex={-1} role="checkbox">
                          <TableCell component="th" scope="row">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={destinationName} src={featureImage} />
                              <Typography variant="subtitle2" noWrap>
                                {destinationName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{tripTitle}</TableCell>
                          <TableCell align="left">{tripCostPackages.length || 0}</TableCell>
                          <TableCell align="left">{tripCategories.join(', ')}</TableCell>
                          <TableCell align="left">
                            <Label variant="ghost" color={(tripStatus === 'INACTIVE' && 'error') || 'success'}>
                              {sentenceCase(tripStatus)}
                            </Label>
                          </TableCell>

                          <TableCell align="center">
                            <Iconify
                              onClick={() => {
                                setSelectedTrip(row);
                                setTripDetailsOpen(true);
                              }}
                              icon="eva:info-fill"
                              width={30}
                              height={30}
                              sx={{
                                color: pallete.success.main,
                                marginRight: 2,
                              }}
                            />

                            <Iconify
                              onClick={() => {
                                setSelectedTrip(row);
                                setTripDetailsOpen(true);
                              }}
                              icon="eva:edit-fill"
                              width={30}
                              height={30}
                              sx={{
                                color: pallete.info.main,
                                marginRight: 2,
                              }}
                            />

                            <Iconify
                              onClick={() => {
                                setSelectedTrip(row);
                                setTripDetailsOpen(true);
                              }}
                              icon="eva:trash-fill"
                              width={30}
                              height={30}
                              sx={{
                                color: pallete.error.main,
                                marginRight: 2,
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {nothingFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={tripsList.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Page>
      <SliderModal openState={newTripFormOpen} setOpenState={setNewTripFormOpen}>
        <NewTrip refetch={refetch} setOpenState={setNewTripFormOpen} />
      </SliderModal>

      <SliderModal openState={tripDetailsOpen} setOpenState={setTripDetailsOpen}>
        <TripDetails setOpenState={setTripDetailsOpen} trip={selectedTrip} />
      </SliderModal>
    </>
  );
}
