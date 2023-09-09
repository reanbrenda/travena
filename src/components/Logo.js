import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {

  // OR
  // const logo = <Box component="img" src="/static/logo.svg" sx={{ width: 40, height: 40, ...sx }} />

  const logo = (
    <Box
     sx={{ width: '100%', height: 80, ...sx }} 
     component="img"
     src="/static/logo.png"
    />
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
