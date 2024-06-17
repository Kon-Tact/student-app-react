import library from "../helpers/library";
import AccountResponse from "../models/AccountResponse";
import cookieServiceInstance from "./cookies";

export default class ConnectManager {

    static connection(response: AccountResponse) {
        cookieServiceInstance.setCookie(library.account, JSON.stringify(response.account), 2);
        cookieServiceInstance.setCookie(library.token, response.token, 2);
        cookieServiceInstance.setCookie(library.role, response.account.role, 2);
        console.log(cookieServiceInstance.getCookie(library.account));
        console.log(cookieServiceInstance.getCookie(library.token));
        console.log(cookieServiceInstance.getCookie(library.role));
    }
}