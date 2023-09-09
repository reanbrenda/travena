import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

LogoGreenTrans.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function LogoGreenTrans({ disabledLink = false, sx }) {

  // OR
  // const logo = <Box component="img" src="/static/logo.svg" sx={{ width: 40, height: 40, ...sx }} />

  const logo = (
    <Box
     sx={{ width: 180, height: 175, ...sx }} 
     component="img"
     src="/static/logo_green_trans.png"
    />
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
