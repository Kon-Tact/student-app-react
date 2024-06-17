import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListIcon from '@mui/icons-material/List';
import LoginIcon from '@mui/icons-material/Login';
import SlideDialog from './MaterialModal';
import { Box, Snackbar } from '@mui/material';
import Loader from './loader';
import library from '../helpers/library';
import Title from './Title';
import CloseIcon from '@mui/icons-material/Close';
import ApiAccess from '../services/api-access';
import { useHistory } from 'react-router-dom';
import routes from '../helpers/routes';
import cookieServiceInstance from '../services/cookies';

const NavBar: React.FC = () => {
    const isMediumScreen = useMediaQuery('(max-width: 800px)');
    const [loading, setLoading] = React.useState(false);
    const [isLogoutDialogOpen, setLogoutDialogOpen] = React.useState(false);
    const [isClearDialogOpen, setClearDialogOpen] = React.useState(false);
    const [isConnexionSnackOpen, setConnexionSnackOpen] = React.useState(false);
    const [isLogoutFail, setLogoutSnack] = React.useState(false);

    const LogoutManagement = async () => {
        setLoading(true);
        try {
            await ApiAccess.logout(); 
        } catch (error) {
            console.error('Error with the logout method');
            setLogoutSnack(true);
        } finally {
            goToPage(routes.connexion);
            setLogoutDialogOpen(false);
            setLoading(false);
            window.location.reload();
        }
    }

    const ClearBase = () => {
        ApiAccess.clearBase();
    }

    const history = useHistory();

    const goToPage = (path: any) => {
        history.push(path);
    };

    const openLogoutDialog = () => {
        setLogoutDialogOpen(true);
    }

    const closeLogoutDialog = () => {
        setLogoutDialogOpen(false);
    }

    const openClearDialog = () => {
        setClearDialogOpen(true);
    }

    const closeClearDialog = () => {
        setClearDialogOpen(false);
    }

    const openSnack = () => {
        if (!isConnexionSnackOpen) {
            setConnexionSnackOpen(true);
        }
    }

    const closeSnack = () => {
        setConnexionSnackOpen(false);
    }

    const isAuthenticated = cookieServiceInstance.isAuthenticated();

    React.useEffect(() => {
        if (isAuthenticated) {
            history.push(routes.home);
        }
    }, [isAuthenticated, history]);

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
        <React.Fragment>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar sx={{ justifyContent: 'space-between' }} disableGutters>
                        {cookieServiceInstance.getCookie(library.account) ? (
                            <>
                                {cookieServiceInstance.getCookie(library.role) ? (
                                    <>
                                        {isMediumScreen ? (
                                            <>
                                                <React.Fragment>
                                                    <Box>
                                                        <IconButton
                                                            size="large"
                                                            aria-label="accounts list"
                                                            aria-haspopup="true"
                                                            color="inherit"
                                                            onClick={() => goToPage(routes.addstudent)}
                                                        >
                                                            <PersonAddAltIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            size="large"
                                                            aria-label="account update"
                                                            aria-haspopup="true"
                                                            color="inherit"
                                                            onClick={openClearDialog}
                                                        >
                                                            <DeleteSweepIcon />
                                                        </IconButton>
                                                    </Box>
                                                    <Title />
                                                    <Box>
                                                        <IconButton
                                                            size="large"
                                                            aria-label="accounts list"
                                                            aria-haspopup="true"
                                                            color="inherit"
                                                            onClick={() => goToPage(routes.accounts)}
                                                        >
                                                            <ListIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            size="large"
                                                            aria-label="account update"
                                                            aria-haspopup="true"
                                                            color="inherit"
                                                            onClick={() => goToPage(routes.profil)}
                                                        >
                                                            <AccountCircleIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            size="large"
                                                            aria-label="account update"
                                                            aria-haspopup="true"
                                                            color="inherit"
                                                            onClick={LogoutManagement}
                                                        >
                                                            <AccountCircleIcon />
                                                        </IconButton>
                                                    </Box>
                                                </React.Fragment>
                                            </>
                                        ) : (
                                            <>
                                                <React.Fragment>
                                                    <Box>
                                                        <Button sx={{ color: 'inherit' }} onClick={() => goToPage(routes.addstudent)}>
                                                            {library.studentRegister}
                                                        </Button>
                                                        <Button sx={{ color: 'inherit' }} onClick={openClearDialog}>
                                                            {library.dbSweep}
                                                        </Button>
                                                    </Box>
                                                    <Title />
                                                    <Box>
                                                        <Button sx={{ color: 'inherit' }} onClick={() => goToPage(routes.accounts)}>
                                                            {library.accountList}
                                                        </Button>
                                                        <Button sx={{ color: 'inherit' }} onClick={() => goToPage(routes.profil)}>
                                                            {library.profil}
                                                        </Button>
                                                        <Button sx={{ color: 'inherit' }} onClick={openLogoutDialog}>
                                                            {library.deconnection}
                                                        </Button>
                                                    </Box>
                                                </React.Fragment>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {isMediumScreen ? (
                                            <>
                                                <React.Fragment>
                                                    <Box>
                                                        <IconButton
                                                            size="large"
                                                            aria-label="accounts list"
                                                            aria-haspopup="true"
                                                            color="inherit"
                                                            onClick={() => goToPage(routes.addstudent)}
                                                        >
                                                            <PersonAddAltIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            size="large"
                                                            aria-label="accounts list"
                                                            aria-haspopup="true"
                                                            color="inherit"
                                                            onClick={ClearBase}
                                                        >
                                                            <DeleteSweepIcon />
                                                        </IconButton>
                                                    </Box>
                                                    <Title />
                                                    <Box>
                                                        <IconButton
                                                            size="large"
                                                            aria-label="accounts list"
                                                            aria-haspopup="true"
                                                            color="inherit"
                                                            onClick={() => goToPage(routes.profil)}
                                                        >
                                                            <AccountCircleIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            size="large"
                                                            aria-label="accounts list"
                                                            aria-haspopup="true"
                                                            color="inherit"
                                                            onClick={LogoutManagement}
                                                        >
                                                            <LogoutIcon />
                                                        </IconButton>
                                                    </Box>
                                                </React.Fragment>
                                            </>
                                        ) : (
                                            <>
                                                <React.Fragment>
                                                    <Box>
                                                        <Button sx={{ color: 'inherit' }} onClick={() => goToPage(routes.addstudent)}>
                                                            {library.studentRegister}
                                                        </Button>
                                                        <Button sx={{ color: 'inherit' }} onClick={ClearBase}>
                                                            {library.dbSweep}
                                                        </Button>
                                                    </Box>
                                                    <Title />
                                                    <Box>
                                                        <Button sx={{ color: 'inherit' }} onClick={() => goToPage(routes.profil)}>
                                                            {library.profil}
                                                        </Button>
                                                        <Button sx={{ color: 'inherit' }} onClick={openLogoutDialog}>
                                                            {library.deconnection}
                                                        </Button>
                                                    </Box>
                                                </React.Fragment>
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                {isMediumScreen ? (
                                    <>
                                        <React.Fragment>
                                            <Box>
                                                <IconButton
                                                    size="large"
                                                    aria-label="accounts list"
                                                    aria-haspopup="true"
                                                    color="inherit"
                                                    onClick={openSnack}
                                                >
                                                    <PersonAddAltIcon />
                                                </IconButton>
                                                <IconButton
                                                    size="large"
                                                    aria-label="account update"
                                                    aria-haspopup="true"
                                                    color="inherit"
                                                    onClick={openSnack}
                                                >
                                                    <DeleteSweepIcon />
                                                </IconButton>
                                            </Box>
                                            <Title />
                                            <Box>
                                                <IconButton
                                                    size="large"
                                                    aria-label="accounts list"
                                                    aria-haspopup="true"
                                                    color="inherit"
                                                    onClick={() => goToPage(routes.connexion)}
                                                >
                                                    <LoginIcon />
                                                </IconButton>
                                                <IconButton
                                                    size="large"
                                                    aria-label="account update"
                                                    aria-haspopup="true"
                                                    color="inherit"
                                                    onClick={() => goToPage(routes.register)}
                                                >
                                                    <PersonAddIcon />
                                                </IconButton>
                                            </Box>
                                        </React.Fragment>
                                    </>
                                ) : (
                                    <>
                                        <Box>
                                            <Button sx={{ color: 'inherit' }} onClick={openSnack}>
                                                {library.studentRegister}
                                            </Button>
                                            <Button sx={{ color: 'inherit' }} onClick={openSnack}>
                                                {library.dbSweep}
                                            </Button>
                                        </Box>
                                        <Title />
                                        <Box>
                                            <Button sx={{ color: 'inherit' }} onClick={() => goToPage(routes.connexion)}>
                                                {library.connexion}
                                            </Button>
                                            <Button sx={{ color: 'inherit' }} onClick={() => goToPage(routes.register)}>
                                                {library.register}
                                            </Button>
                                        </Box>
                                    </>
                                )}
                            </>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>

            <SlideDialog isOpen={isLogoutDialogOpen} onClose={closeLogoutDialog} onConfirm={LogoutManagement} title={'Deconnexion'}>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <p>Vous allez vous déconnecter</p>
                        <p>Êtes vous sûr de continuer ?</p>
                    </>
                )}
            </SlideDialog>

            <SlideDialog isOpen={isClearDialogOpen} onClose={closeClearDialog} onConfirm={ClearBase} title={'Vider la base'}>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <p>Vous allez vider la base de donnée</p>
                        <p>Cette action est irreversible</p>
                        <p>Êtes vous sûr de vouloir continuer ?</p>
                    </>
                )}

            </SlideDialog>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={isConnexionSnackOpen}
                autoHideDuration={3000}
                onClose={closeSnack}
                message="Vous devez vous connecter en premier."
                action={action}
            />
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={isLogoutFail}
                autoHideDuration={3000}
                onClose={closeSnack}
                message="Problème lors de la deconnexion. Merci de réessayer."
                action={action}
            />
        </React.Fragment>
    );
}

export default NavBar;
