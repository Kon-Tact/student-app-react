import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import ApiAccess from '../services/api-access';
import Grid from '@mui/material/Grid/Grid';
import Typography from '@mui/material/Typography/Typography';
import Paper from '@mui/material/Paper/Paper';
import TextField from '@mui/material/TextField/TextField';
import Button from '@mui/material/Button/Button';
import Credentials from '../models/Credentials';
import AccountResponse from '../models/AccountResponse';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import routes from '../helpers/routes';
import Loader from '../component/loader';
import ConnectManager from '../services/connexion';
import { IconButton, Snackbar } from '@mui/material';

const RegisterPage: FunctionComponent = () => {
    const history = useHistory();
    const [isErrorSnackOpen, setSnack] = useState(false);
    const [loading, setLoading] = useState(false);
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        email: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterForm({
            ...registerForm,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            //Saving the new account
            await ApiAccess.saveAccount(new Credentials(registerForm.username, registerForm.password, registerForm.email));
            try {
                //Connecting the new account
                const accountResponse: AccountResponse = await ApiAccess.login(new Credentials(registerForm.username, registerForm.password));
                ConnectManager.connection(accountResponse);
            } catch (error) {
                console.error('Bad credentials');
                setSnack(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            history.push(routes.home);
            window.location.reload();
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
        <Grid container justifyContent="center" alignItems="normal" marginTop={5} style={{ minHeight: '100vh' }}>
            <Grid item xs={10} sm={6} md={6}>
                <Paper elevation={4} style={{ padding: '20px' }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Enregistrement
                    </Typography>
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        open={isErrorSnackOpen}
                        autoHideDuration={3000}
                        onClose={closeSnack}
                        message="Une erreur a eu lieu lors de l'enregsitrement du compte"
                        action={action}
                    />
                    {loading ? (
                        <Loader />
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Username"
                                name="username"
                                value={registerForm.username}
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
                                value={registerForm.password}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                variant="standard"
                                required
                            />
                            <TextField
                                label="Email"
                                name="email"
                                type="text"
                                value={registerForm.email}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                variant="standard"
                                required
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                S'enregistrer
                            </Button>
                        </form>
                    )}

                </Paper>
            </Grid>
        </Grid>
    );
}

export default RegisterPage;