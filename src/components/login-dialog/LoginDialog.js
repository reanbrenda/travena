import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { LoadingButton } from '@mui/lab';
import { showToast } from '../../utils/showToast';
import { loginUser } from '../../api/user.api';
import { setCookie } from '../../utils/cookies';

export default function LoginDialog() {
  const [open, setOpen] = useState(true);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const loginMutation = useMutation(['loginUser'], () => loginUser({ email: userName, password }), {
    onSuccess: (data) => {
      data.expiresAt = +new Date() + 7 * 24 * 60 * 60 * 1000;

      setCookie('UserInfo', data, data.expiresAt, true);

      if (data.status) {
        if (data.agencyId) {
          handleClose();
        } else {
          navigate('/business/create', { replace: true });
        }
      } else if (data.message === 'Account Not Verified') {
        navigate('/verify', { state: data.userdata.userId });
      } else {
        showToast({ type: 'error', message: data.message });
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSubmit = () => {
    if (!userName || !password) {
      showToast({ type: 'error', message: 'All fields are required!' });
      return;
    }
    loginMutation.mutate();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={(event, reason) => reason !== 'backdropClick'}>
        <DialogTitle>Session Expired</DialogTitle>
        <DialogContent>
          <DialogContentText>Your session has expired, login again to refresh.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setUserName(e.target.value)}
          />

          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              setCookie('UserInfo', '', 'Thu, 01 Jan 1970 00:00:01 GMT');
              navigate('/login', { replace: true });
            }}
          >
            Logout
          </Button>
          <LoadingButton loading={loginMutation.isLoading} onClick={handleSubmit}>
            Login
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
