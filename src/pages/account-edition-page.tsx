import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import ApiAccess from '../services/api-access';
import Account from '../models/Account';
import Grid from '@mui/material/Grid/Grid';
import Typography from '@mui/material/Typography/Typography';
import Paper from '@mui/material/Paper/Paper';
import TextField from '@mui/material/TextField/TextField';
import Button from '@mui/material/Button/Button';
import cookieServiceInstance from '../services/cookies';
import { Checkbox, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Loader from '../component/loader';
import { useHistory } from 'react-router-dom';
import routes from '../helpers/routes';

const AccountEdition: FunctionComponent = () => {

    enum SnackStatus { SUCCESS = 'SUCCESS', ERROR = 'ERROR'};
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [snackStatus, setSnackStatus] = useState<SnackStatus | null> (null);
    const [accountEditionForm, setAccountEditionForm] = useState({
        username: '',
        email: '',
        isAdmin: false
    });

    const [editionAccount, setEditionAccount] = useState(new Account());

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAccountEditionForm({
            ...accountEditionForm,
            [name]: value,
        });
    };

    const checkboxManagement = () => {
        accountEditionForm.isAdmin ? setAccountEditionForm({ ...accountEditionForm, isAdmin: false }) : setAccountEditionForm({ ...accountEditionForm, isAdmin: true });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const account: Account = new Account(accountEditionForm.username, '', accountEditionForm.email);
        account.role = accountEditionForm.isAdmin ? 'ADMIN' : 'USER';
        account.id = editionAccount.id;
        console.table(account);
        try {
            setLoading(true);
            await ApiAccess.editAccount(account);
        } catch (error) {
            setSnackStatus(SnackStatus.ERROR);
        } finally {
            setLoading(false);
            setSnackStatus(SnackStatus.SUCCESS);
            history.push(routes.accounts);
        }
    };

    const getMessage = (status: SnackStatus): string => {
        switch (status) {
            case SnackStatus.SUCCESS : return "Le compte a bien été mis à jour";
            case SnackStatus.ERROR : return "Une erreur est survenu";
        }
    }

    useEffect(() => {
        const storedAccount = cookieServiceInstance.getCookie('edition');
        if (storedAccount) {
            setEditionAccount(JSON.parse(storedAccount));
            console.table(storedAccount);
        }
    }, []);

    useEffect(() => {
        const fillForm = () => {
            setAccountEditionForm({
                username: editionAccount.username,
                email: editionAccount.email,
                isAdmin: editionAccount.role.includes('ADMIN')
            });
        };

        fillForm();
    }, [editionAccount]);

    const closeSnack = () => {
        setSnackStatus(null);
    }

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={closeSnack}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <Grid container justifyContent="center" alignItems="top" marginTop={3} style={{ minHeight: '100vh' }}>
            <Grid item xs={10} sm={6} md={4}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Edition de compte
                    </Typography>
                    {loading ? (
                        <Loader />
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Username"
                                name="username"
                                value={accountEditionForm.username}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                variant="standard"
                            />
                            <TextField
                                label="Email"
                                name="email"
                                type="text"
                                value={accountEditionForm.email}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                variant="standard"
                            />
                            <label>Admin</label>
                            <Checkbox
                                name='isAdmin'
                                checked={accountEditionForm.isAdmin}
                                onClick={checkboxManagement}
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Editer
                            </Button>
                        </form>
                    )}
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        open={snackStatus !== null}
                        autoHideDuration={3000}
                        onClose={closeSnack}
                        message={snackStatus ? getMessage(snackStatus) : ''}
                        action={action}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
}

export default AccountEdition;