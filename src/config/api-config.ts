const apiBase = 'http://localhost:8080';

const API_ENDPOINTS = {
    studentList: `${apiBase}/student/list`,
    login: `${apiBase}/account/login`,
    logout: `${apiBase}/account/logout`,
    changeRole: `${apiBase}/account/role`,
    deleteAccount: `${apiBase}/account/delete?id=`,
    editAccount: `${apiBase}/account/edit`,
    saveAccount: `${apiBase}/account/save`,
    accountList: `${apiBase}/account/list`,
    deleteStudent: `${apiBase}/student/delete?id=`,
    editStudent: `${apiBase}/student/edit`,
    clearBase: `${apiBase}/student/clear`,
    saveStudent: `${apiBase}/student/save`,
    validate: `${apiBase}/student/validate/?id=`
}

export default API_ENDPOINTS;