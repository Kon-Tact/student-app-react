import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { FunctionComponent, useEffect, useState } from 'react';
import Student from '../models/Student';
import ApiAccess from '../services/api-access';
import Loader from '../component/loader';
import { useHistory } from 'react-router-dom';
import routes from '../helpers/routes';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import cookieServiceInstance from '../services/cookies';
import SlideDialog from '../component/MaterialModal';
import DoneIcon from '@mui/icons-material/Done';
import library from '../helpers/library';

const StudentsList: FunctionComponent = () => {

    const [studentList, setList] = useState<Student[]>([]);
    const [dialogLoading, setDialogLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isEditDialogOpen, setEditDialog] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialog] = useState(false);
    const [isValidateDialogOpen, setValidateDialog] = useState(false);
    const [actionStudent, setActionStudent] = useState(new Student());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const students = await ApiAccess.getStudents();
                console.table(students);
                setList(students)
            } catch (error) {
                console.error(error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const history = useHistory();

    const goToPage = (path: any) => {
        history.push(path);
    };

    const goToEdition = () => {
        cookieServiceInstance.setCookie('edition', JSON.stringify(actionStudent), 1);
        goToPage(routes.editstudent);
    }

    const deleteStudent = async () => {
        setDialogLoading(true);
        try {
            await ApiAccess.deleteStudent(actionStudent)
                .then(() => {
                    setList(prevList => prevList.filter(s => s.id !== actionStudent.id))
                    setDeleteDialog(false);
                })
        } catch {
            console.error("Error fetching the delete endpoint");
        } finally {
            setDialogLoading(false);
        }
    }

    const validateStudent = async () => {
        setDialogLoading(true);
        try {
            await ApiAccess.validate(actionStudent);
        } catch (error) {
            console.error("Error in the validation process");
        } finally {
            setDialogLoading(false);
            closeValidateDialog();
            window.location.reload();
        }
    }


    const openValidateDialog = (student: Student) => {
        setActionStudent(student);
        setValidateDialog(true);
    }

    const closeValidateDialog = () => {
        setValidateDialog(false);
    }

    const openEditDialog = (student: Student) => {
        setActionStudent(student);
        setEditDialog(true);
    }

    const closeEditDialog = () => {
        setEditDialog(false);
    }

    const openDeleteDialog = (student: Student) => {
        setActionStudent(student);
        setDeleteDialog(true);
    }

    const closeDeleteDialog = () => {
        setDeleteDialog(false);
    }

    return (
        <div>
            {loading ? (
                <div className="center"><Loader /></div>
            ) : error ? (
                <h4 className="center">L'api ne semble pas joignable</h4>
            ) : studentList.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {studentList.map(student => (
                                <TableRow key={student.id}>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.phoneNumber}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>{student.address}</TableCell>
                                    {cookieServiceInstance.getCookie(library.role)!.includes('ADMIN') ? (
                                        <TableCell style={{ width: '15%' }}>
                                        <Button onClick={() => openEditDialog(student)}>
                                            <EditIcon />
                                        </Button>
                                        <Button onClick={() => openDeleteDialog(student)}>
                                            <DeleteIcon />
                                        </Button>
                                        {!student.validated && (
                                            <Button onClick={() => openValidateDialog(student)}>
                                                <DoneIcon />
                                            </Button>
                                        )} 
                                        </TableCell>   
                                    ) : (
                                        <TableCell style={{ width: '11%' }}>
                                            <>
                                                {!student.validated && (
                                                    <p>En cours de validation</p>
                                                )}
                                            </>
                                        </TableCell>
                                    )} 
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <h4 className="center">La liste d'étudiants est vide</h4>
            )}

            <SlideDialog isOpen={isEditDialogOpen} onClose={closeEditDialog} onConfirm={goToEdition} title={'Edition'}>
                {dialogLoading ? (
                    <Loader />
                ) : (
                    <>
                        <p>Vous allez vers l'édition</p>
                        <p>Souhaitez vous continuer ?</p>
                    </>
                )}
            </SlideDialog>
            <SlideDialog isOpen={isDeleteDialogOpen} onClose={closeDeleteDialog} onConfirm={deleteStudent} title={'Suppression'}>
                {dialogLoading ? (
                    <Loader />
                ) : (
                    <>
                        <p>Vous allez supprimer cet étudiant</p>
                        <p>Êtes vous sûr de continuer ?</p>
                    </>
                )}
            </SlideDialog>
            <SlideDialog isOpen={isValidateDialogOpen} onClose={closeValidateDialog} onConfirm={validateStudent} title={'Validation'}>
                {dialogLoading ? (
                    <Loader />
                ) : (
                    <>
                        <p>Vous allez valider cet étudiant</p>
                        <p>Êtes vous sûr de continuer ?</p>
                    </>
                )}
            </SlideDialog>
        </div>
    );
}

export default StudentsList;