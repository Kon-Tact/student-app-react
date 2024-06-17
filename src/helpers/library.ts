import Account from "../models/Account";
import cookieServiceInstance from "../services/cookies";

const profil = (): string => {
    const connectedAccount: Account | null = JSON.parse(cookieServiceInstance.getCookie('connectedAccount')!);
    return connectedAccount ? connectedAccount.username : '';
}

const library = {
    token: 'authToken',
    actualToken: cookieServiceInstance.getCookie('authToken') ?? '',
    account: 'connectedAccount',
    title: 'Students APP',
    deconnection: 'Deconnexion',
    accountList: 'Liste de comptes',
    studentRegister: 'Enregistrement Etudiant',
    dbSweep: 'Vider la base',
    connexion: 'Se connecter',
    register: 'S\'enregistrer',
    role: 'role',
    username: 'username',
    email: 'email',
    profil: profil()
}

export default library;