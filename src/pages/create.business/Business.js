import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// hooks

import LogoGreenTrans from '../../components/LogoGreenTrans';

import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
// sections
import BusinessForm from './BusinessForm';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Business() {
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Register">
      <RootStyle>
        <HeaderStyle>
          <LogoGreenTrans />
          {smUp && (
            <Typography variant="body1" sx={{ mt: { md: -2 } }}>
              {/* Already have an Business? &nbsp; */}
              <Link variant="h4" component={RouterLink} to="/agency/create">
                Skip
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Step 1 of 2
              Business Details
            </Typography>
            <Typography variant="p" sx={{ px: 1, mt: 1, mb: 0 }}>
              In order to protect
              you and our customers,
              we need to verify your
              business information.
              Please provide as it appears
              on BRS certificate or permit
            </Typography>
            {/* <img alt="register" src="/static/illustrations/illustration_register.png" /> */}
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Get started absolutely free. Pay only for returns.
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Create Business now</Typography>

            {/* <AuthSocial /> */}

            <BusinessForm />

            {/* <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
              By registering, I agree to Travena&nbsp;
              <Link underline="always" color="text.primary" href="#">
                Terms of Service
              </Link>
              {''}and{''}
              <Link underline="always" color="text.primary" href="#">
                Privacy Policy
              </Link>
              .
            </Typography> */}

            {!smUp && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                Already have a Business?{' '}
                <Link variant="subtitle2" to="/dashboard/app" component={RouterLink}>
                  Skip
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
