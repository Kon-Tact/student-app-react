import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import ApiAccess from '../services/api-access';
import Student from '../models/Student';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import TextField from '@mui/material/TextField/TextField';
import Button from '@mui/material/Button/Button';
import cookieServiceInstance from '../services/cookies';
import routes from '../helpers/routes';
import { useHistory } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';

const StudentEdition: FunctionComponent = () => {

    const [editStudentForm, setEditStudentForm] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        address: ''
    });

    const [editionStudent, setEditionStudent] = useState(new Student());
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditStudentForm({
            ...editStudentForm,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        const student: Student = new Student(editStudentForm.name, editStudentForm.phoneNumber, editStudentForm.email, editStudentForm.address);
        student.id = editionStudent.id;
        try {
            await ApiAccess.editStudent(student);
        } finally {
            setLoading(false);
            history.push(routes.home);
        }
    };

    useEffect(() => {
        const storedStudent = cookieServiceInstance.getCookie('edition');
        if (storedStudent) {
            setEditionStudent(JSON.parse(storedStudent));
        }
    }, []);

    useEffect(() => {
        const fillForm = () => {
            setEditStudentForm({
                name: editionStudent.name,
                phoneNumber: editionStudent.phoneNumber,
                email: editionStudent.email,
                address: editionStudent.address
            });
        };

        fillForm();
    }, [editionStudent]);



    return (
        <Grid container justifyContent="center" alignItems="top" marginTop={3} style={{ minHeight: '100vh' }}>
            <Grid item xs={10} sm={6} md={4}>
                <Paper elevation={3} style={{ padding: '20px' }}>

                    <Typography variant="h5" component="h2" gutterBottom>
                        Edition
                    </Typography>
                    {loading ? (
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={loading}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Nom et prénom"
                                name="name"
                                value={editStudentForm.name}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                variant="standard"
                                required
                            />
                            <TextField
                                label="Numéro de téléphone"
                                name="phoneNumber"
                                type="text"
                                value={editStudentForm.phoneNumber}
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
                                value={editStudentForm.email}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                variant="standard"
                                required
                            />
                            <TextField
                                label="Adresse"
                                name="address"
                                type="text"
                                value={editStudentForm.address}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                variant="standard"
                                required
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Mise à jour
                            </Button>
                        </form>
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
}

export default StudentEdition;