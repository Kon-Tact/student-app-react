import React, { FunctionComponent, useEffect, useState } from 'react';
import ApiAccess from '../services/api-access';
import Account from '../models/Account';
import Loader from '../component/loader';
import Table from '@mui/material/Table/Table';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import TableHead from '@mui/material/TableHead/TableHead';
import TableCell from '@mui/material/TableCell/TableCell';
import Paper from '@mui/material/Paper/Paper';
import TableRow from '@mui/material/TableRow/TableRow';
import TableBody from '@mui/material/TableBody/TableBody';
import { Button, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import cookieServiceInstance from '../services/cookies';
import routes from '../helpers/routes';
import { useHistory } from 'react-router-dom';
import SlideDialog from '../component/MaterialModal';
import library from '../helpers/library';

const AccountList: FunctionComponent = () => {

    const [accountList, setList] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isEditDialogOpen, setEditDialog] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialog] = useState(false);
    const [isRoleSwapDialogOpen, setRoleSwapDialog] = useState(false);
    const [actionAccount, setActionAccount] = useState(new Account());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accounts = await ApiAccess.getAccountList();
                const accountToRemove: Account = JSON.parse(cookieServiceInstance.getCookie(library.account)!);
                const updatedAccounts = accounts.filter(account => account.id !== accountToRemove.id);
                console.table(updatedAccounts);    
                setList(updatedAccounts);
            } catch (error) {
                console.error('Error fetching accounts:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const deleteAccount = async () => {
        setLoading(true);
        try {
            await ApiAccess.deleteAccount(actionAccount);
            setList(prevList => prevList.filter(s => s.id !== actionAccount.id))
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setDeleteDialog(false);
        }
    }

    const history = useHistory();

    const goToPage = (path: any) => {
        history.push(path);
    };

    const goToEdition = () => {
        cookieServiceInstance.setCookie('edition', JSON.stringify(actionAccount), 1);
        goToPage(routes.editaccount);
    }

    const openEditDialog = (account: Account) => {
        setActionAccount(account);
        setEditDialog(true);
    }

    const closeEditDialog = () => {
        setEditDialog(false);
    }

    const openDeleteDialog = (account: Account) => {
        setActionAccount(account);
        setDeleteDialog(true);
    }

    const closeDeleteDialog = () => {
        setDeleteDialog(false);
    }

    const openRoleSwapDialog = (account: Account) => {
        setActionAccount(account);
        setRoleSwapDialog(true);
    }

    const closeRoleSwapDialog = () => {
        setRoleSwapDialog(false);
    }

    const handleCheckboxChange = async () => {
        setLoading(true);
        try {
            const idRole: string[] = [actionAccount.id, actionAccount.role];
            await ApiAccess.changeRole(idRole);
            const updatedAccount = { ...actionAccount, role: actionAccount.role === 'USER' ? 'ADMIN' : 'USER' };
            setList(accountList.map(item => (item.id === updatedAccount.id ? updatedAccount : item)));
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
            setRoleSwapDialog(false);
        }

    };


    return (
        <div>
            {loading ? (
                <div className="center"><Loader /></div>
            ) : error ? (
                <h4 className="center">L'api ne semble pas joignable</h4>
            ) : accountList.length > 0 ? (
                <TableContainer component={Paper} style={{ paddingInlineStart: '10%', paddingInlineEnd: '10%' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Administrateur</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {accountList.map(account => (
                                <TableRow key={account.id}>
                                    <TableCell>{account.id}</TableCell>
                                    <TableCell >{account.username}</TableCell>
                                    <TableCell >{account.email}</TableCell>
                                    <TableCell>
                                        <Checkbox
                                            checked={account.role.includes('ADMIN')}
                                            disabled={account.role === 'SUPER_ADMIN'}
                                            onClick={() => openRoleSwapDialog(account)}
                                        />
                                    </TableCell>
                                    <TableCell style={{ width: '15%' }}>
                                        <Button onClick={() => openEditDialog(account)}>
                                            {account.role === 'SUPER_ADMIN' ? (
                                                <></>
                                            ) : (
                                                <EditIcon />
                                            )}
                                        </Button>
                                        <Button onClick={() => openDeleteDialog(account)} >
                                            {account.role === 'SUPER_ADMIN' ? (
                                                <></>
                                            ) : (
                                                <DeleteIcon />
                                            )}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <SlideDialog isOpen={isRoleSwapDialogOpen} onClose={closeRoleSwapDialog} onConfirm={handleCheckboxChange} title={'Changement de role'}>
                        {loading ? (
                            <Loader />
                        ) : (
                            <p>Souhaitez vous changer le role de ce compte ?</p>
                        )}
                    </SlideDialog>
                    <SlideDialog isOpen={isEditDialogOpen} onClose={closeEditDialog} onConfirm={goToEdition} title={'Edition'}>
                        <p>Vous vous rendez à l'édition</p>
                        <p>Souhaitez vous continuer ?</p>
                    </SlideDialog>
                    <SlideDialog isOpen={isDeleteDialogOpen} onClose={closeDeleteDialog} onConfirm={deleteAccount} title={'Suppression'}>
                        {loading ? (
                            <Loader />
                        ) : (
                            <>
                                <p>Vous allez supprimer ce compte définitivement</p>
                                <p>Souhaitez vous continuer ?</p>
                            </>
                        )}

                    </SlideDialog>
                </TableContainer>
            ) : (
                <h4 className="center">La liste de comptes est vide</h4>
            )}
        </div>
    );
}

export default AccountList;