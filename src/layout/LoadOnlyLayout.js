// material
import { styled } from '@mui/material/styles';
// components
import { SpinnerCircular } from 'spinners-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../utils/cookies';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

// ----------------------------------------------------------------------

export default function LoadOnlyLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const UserData = getCookie('UserInfo');
    const timeNow = +new Date();

    if (UserData && UserData.expiresAt - timeNow > 24 * 60 * 60 * 1000) {
      navigate('/dashboard/app', {
        replace: true,
      });
    } // 6 days
    else {
      navigate('/login', {
        replace: true,
      });
    }
  });

  return (
    <>
      <HeaderStyle>
        <SpinnerCircular enabled size={100} thickness={150} color="#27AE60" secondaryColor="#08192BCC" speed={120} />
      </HeaderStyle>
    </>
  );
}
