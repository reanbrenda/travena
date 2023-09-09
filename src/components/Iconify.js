import PropTypes from 'prop-types';
// icons
import { Icon } from '@iconify/react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Iconify.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  onClick: PropTypes.func,
};

export default function Iconify({ icon, sx, onClick, ...other }) {
  return (
    <Box
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      component={Icon}
      icon={icon}
      sx={{ ...sx, cursor: 'pointer' }}
      {...other}
    />
  );
}
