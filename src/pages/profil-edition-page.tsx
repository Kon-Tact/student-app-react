import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import ApiAccess from '../services/api-access';
import Account from '../models/Account';
import Grid from '@mui/material/Grid/Grid';
import Typography from '@mui/material/Typography/Typography';
import Paper from '@mui/material/Paper/Paper';
import TextField from '@mui/material/TextField/TextField';
import Button from '@mui/material/Button/Button';
import { IconButton, Snackbar } from '@mui/material';
import Loader from '../component/loader';
import CloseIcon from '@mui/icons-material/Close';
import cookieServiceInstance from '../services/cookies';
import library from '../helpers/library';
import { useHistory } from 'react-router-dom';
import routes from '../helpers/routes';

const ProfilEdition: FunctionComponent = () => {

    const [isAccountMaj, setSnackMaj] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const connectedValue = (data: string): string => {
        const account: Account = JSON.parse(cookieServiceInstance.getCookie(library.account)!);
        switch (data) {
            case library.username: return account.username;
            case library.email: return account.email;
            default : return '';
        }
    }

    const [profilEditionForm, setProfilEditionForm] = useState({   
        username: connectedValue(library.account),
        password: '',
        email: connectedValue(library.email)
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfilEditionForm({
            ...profilEditionForm,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            let account: Account = JSON.parse(cookieServiceInstance.getCookie(library.account)!);
            const updatedAccount = { ...account, username: profilEditionForm.username, password: profilEditionForm.password, email: profilEditionForm.email};
            account = await ApiAccess.editAccount(updatedAccount);
        } catch (error) {
            console.error(error);
        } finally {
            history.push(routes.home);
        }
    };

    const closeSnack = () => {
        setSnackMaj(false);
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
            <Grid item xs={10} sm={6} md={4}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Mise a jour du profil
                    </Typography>
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        open={isAccountMaj}
                        autoHideDuration={3000}
                        onClose={closeSnack}
                        message="Compte mis a jour"
                        action={action}
                    />
                    {loading ? (
                        <Loader />
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Username"
                                name="username"
                                value={profilEditionForm.username}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                variant="standard"
                            />
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                value={profilEditionForm.password}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                variant="standard"
                            />
                            <TextField
                                label="Email"
                                name="email"
                                type="text"
                                value={profilEditionForm.email}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                variant="standard"
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Editer
                            </Button>
                        </form>
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
}

export default ProfilEdition;