import Account from "./Account";

export default class AccountResponse {
    private _jsonResponse: string;
    private _account: Account
    private _token: string;

    constructor (
        jsonResponse: string,
        account: Account,
        token: string
    ) {
        this._jsonResponse = jsonResponse;
        this._account = account;
        this._token = token;
    }

    get account(): Account {
        return this._account;
    }

    get token(): string {
        return this._token;
    }
}