import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, IconButton, Snackbar } from '@mui/material';
import ApiAccess from '../services/api-access';
import Credentials from '../models/Credentials';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import routes from '../helpers/routes';
import Loader from '../component/loader';
import ConnectManager from '../services/connexion';

const ConnectionPage: FunctionComponent = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [isBadCredentialSnackOpen, setSnack] = useState(false);
  const [connectionForm, setConnectionForm] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConnectionForm({
      ...connectionForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const accountResponse = await ApiAccess.login(new Credentials(connectionForm.username, connectionForm.password));
      console.log(accountResponse.token);
      if (accountResponse.token) {
        try {
          ConnectManager.connection(accountResponse);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
          history.push(routes.home);
          window.location.reload();
        }
      } else {
        setSnack(true);
        setConnectionForm({username: connectionForm.username, password: '' });
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching API :', error);
    } 
  };

  const closeSnack = () => {
    setSnack(false);
  }

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={closeSnack}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Grid container justifyContent="center" alignItems="top" marginTop={3} style={{ minHeight: '100vh' }}>
      <Grid item xs={10} sm={6} md={6}>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={isBadCredentialSnackOpen}
          autoHideDuration={3000}
          onClose={closeSnack}
          message="L'identifiant ou le mot de passe n'ont pas été reconnus"
          action={action}
        />
        <Paper elevation={4} style={{ padding: '20px' }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Connexion
          </Typography>
          {loading ? (
            <Loader />
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Username"
                name="username"
                value={connectionForm.username}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="standard"
                required
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={connectionForm.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="standard"
                required
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Se connecter
              </Button>
            </form>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ConnectionPage;
