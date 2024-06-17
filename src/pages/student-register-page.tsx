import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import ApiAccess from '../services/api-access';
import Student from '../models/Student';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import TextField from '@mui/material/TextField/TextField';
import Button from '@mui/material/Button/Button';
import Loader from '../component/loader';
import { useHistory } from 'react-router-dom';
import routes from '../helpers/routes';
import { Backdrop, CircularProgress, Stack } from '@mui/material';
import DataAccess from '../services/data-access';
import cookieServiceInstance from '../services/cookies';
import library from '../helpers/library';

const StudentRegistration: FunctionComponent = () => {

    const [loading, setLoading] = useState(false);
    const [testLoading, setTestLoading] = useState(false);
    const [studentRegistrationForm, setStudentRegistrationForm] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        address: ''
    });
    

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStudentRegistrationForm({
            ...studentRegistrationForm,
            [name]: value,
        });
    };

    const history = useHistory();

    const goToPage = (path: any) => {
        history.push(path);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const toSaveStudent: Student = new Student(studentRegistrationForm.name, studentRegistrationForm.phoneNumber, studentRegistrationForm.email, 
                studentRegistrationForm.address, cookieServiceInstance.getCookie(library.role)!.includes('ADMIN'));
            console.log(toSaveStudent);
            await ApiAccess.saveStudent(toSaveStudent);
        } finally {
            setLoading(false);
            goToPage(routes.home);
        }

    };

    const fillWithTestsValues = async () => {
        setTestLoading(true);
        try {
            let testStudent: Student = await DataAccess.getRandoDatas();
            testStudent.phoneNumber = ("06" + Math.floor(Math.random() * 10000000));
            console.log(testStudent.phoneNumber.length);
            testStudent.phoneNumber = testStudent.phoneNumber.length < 10 ? testStudent.phoneNumber + '0' : testStudent.phoneNumber;
            testStudent.email = testStudent.name.toLowerCase().replace(/\s/g, '') + "@email.com";
            testStudent.address = String(Math.floor(Math.random() * 30) + 1) + " " + testStudent.address;
            setStudentRegistrationForm({ name: testStudent.name, phoneNumber: testStudent.phoneNumber, email: testStudent.email, address: testStudent.address });
        } catch (error) {
            console.log(error);
        } finally {
            setTestLoading(false);
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="top" marginTop={3} style={{ minHeight: '100vh' }}>
            <Grid item xs={10} sm={6} md={4}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Enregistrement étudiant
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Nom et prenom"
                            name="name"
                            value={studentRegistrationForm.name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            variant="standard"
                            required
                        />
                        <TextField
                            label="Numero de téléphone"
                            name="phoneNumber"
                            type="text"
                            value={studentRegistrationForm.phoneNumber}
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
                            value={studentRegistrationForm.email}
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
                            value={studentRegistrationForm.address}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            variant="standard"
                            required
                        />
                        {loading ? (
                            <Loader />
                        ) : (
                            <Stack spacing={2} direction="row" sx={{ width: '100%' }}>
                                <Button type='button' variant="contained" color="primary" sx={{ flexGrow: 1 }} onClick={() => { goToPage(routes.home) }}>
                                    Retour
                                </Button>
                                <Button type="submit" variant="contained" color="primary" sx={{ flexGrow: 1 }}>
                                    Enregistrer
                                </Button>
                                <Button type='button' variant="contained" color="primary" sx={{ flexGrow: 1 }} onClick={fillWithTestsValues}>
                                    {testLoading ? (
                                        <Backdrop
                                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                            open={testLoading}
                                            >
                                            <CircularProgress color="inherit" />
                                        </Backdrop>
                                    ) : (
                                        <>
                                            Test
                                        </>
                                    )}
                                </Button>
                            </Stack>
                        )}

                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default StudentRegistration;