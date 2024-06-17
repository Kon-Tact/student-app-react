import Student from "../models/Student";
import API_ENDPOINTS from "../config/api-config";
import Account from "../models/Account";
import AccountResponse from "../models/AccountResponse";
import Credentials from "../models/Credentials";
import cookieServiceInstance from "./cookies";
import library from "../helpers/library";

const token: string = cookieServiceInstance.getCookie(library.token) ?? '';

export default class ApiAccess {

    static getStudents(): Promise<Student[]> {
        return fetch(API_ENDPOINTS.studentList)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch students');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error fetching students:', error);
                return []; // Return a default value (empty array) in case of error
            });
    }

    static login(credentials: Credentials): Promise<AccountResponse> {
        return fetch(API_ENDPOINTS.login, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .catch(error => console.error(error))
    }

    static logout(): Promise<null> {

        return fetch(API_ENDPOINTS.logout, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                cookieServiceInstance.removeCookie(library.account);
                cookieServiceInstance.removeCookie(library.token);
                return response.json();
            })
            .catch(error => console.error(error));
    }

    static saveStudent(student: Student): Promise<Student> {

        return fetch(API_ENDPOINTS.saveStudent, {
            method: 'POST',
            body: JSON.stringify(student),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .catch(error => console.error(error));
    }

    static clearBase(): Promise<null> {

        return fetch(API_ENDPOINTS.clearBase, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .catch(error => console.error(error));
    }

    static deleteStudent(student: Student): Promise<null> {

        return fetch(API_ENDPOINTS.deleteStudent + student.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(reponse => reponse.json())
            .catch(error => console.error(error));
    }

    static getAccountList(): Promise<Account[]> {

        return fetch(API_ENDPOINTS.accountList, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                // Map the data to include only the required fields
                return data.map((accountData: { id: string; username: string; email: string; role: string; }) => {
                    const { id, username, email, role } = accountData;
                    let account: Account = new Account(username, '', email, role);
                    account.id = id;
                    return account;
                });
            })
            .catch(error => {
                console.error(error);
                return []; // Return empty array in case of error
            });
    }


    static saveAccount(credentials: Credentials): Promise<AccountResponse> {
        return fetch(API_ENDPOINTS.saveAccount, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .catch(error => console.error(error));
    }

    static editAccount(account: Account): Promise<Account> {

        return fetch(API_ENDPOINTS.editAccount, {
            method: 'PUT',
            body: JSON.stringify(account),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .catch(error => console.error(error));
    }

    static deleteAccount(account: Account): Promise<null> {
        return fetch(API_ENDPOINTS.deleteAccount + account.id, {
            method: 'DELETE',
            body: JSON.stringify(account),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .catch(error => console.error(error));
    }

    static changeRole(idRole: string[]): Promise<string> {

        return fetch(API_ENDPOINTS.changeRole, {
            method: 'POST',
            body: JSON.stringify(idRole),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .catch(error => console.error(error));
    }

    static editStudent(student: Student): Promise<Student> {

        return fetch(API_ENDPOINTS.editStudent, {
            method: 'PUT',
            body: JSON.stringify(student),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

            .then(response => response.json())
            .catch(error => console.error(error));
    }

    static validate(student: Student): Promise<Student> {
        return fetch(API_ENDPOINTS.validate + student.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .catch(error => console.error(error));
    }
}