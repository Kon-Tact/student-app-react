import React from 'react';
import { Route, BrowserRouter as Router, Switch, } from 'react-router-dom';
import ConnectionPage from './pages/connection-page';
import StudentsList from './pages/students-list-page';
import RegisterPage from './pages/register-page';
import StudentRegistration from './pages/student-register-page';
import StudentEdition from './pages/student-edit-page';
import ProfilEdition from './pages/profil-edition-page';
import AccountList from './pages/account-list-page';
import routes from './helpers/routes';
import AccountEdition from './pages/account-edition-page';
import NavBar from './component/NavBar';

const App: React.FC = () => {

    return (
        <>
            <Router>
                <NavBar />

                <Switch>
                    <Route exact path={routes.empty} component={ConnectionPage} />
                    <Route exact path={routes.home} component={StudentsList} />
                    <Route exact path={routes.connexion} component={ConnectionPage} />
                    <Route exact path={routes.register} component={RegisterPage} />
                    <Route exact path={routes.addstudent} component={StudentRegistration} />
                    <Route exact path={routes.editstudent} component={StudentEdition} />
                    <Route exact path={routes.editaccount} component={AccountEdition} />
                    <Route exact path={routes.profil} component={ProfilEdition} />
                    <Route exact path={routes.accounts} component={AccountList} />
                </Switch>
            </Router >
        </>
    )
}

export default App;