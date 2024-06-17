export default class Student {
    public id!: string;
    public name: string;
    public phoneNumber: string;
    public email: string;
    public address: string;
    public validated: boolean;

    constructor(
        name:string = '',
        phoneNumber: string = '',
        email: string = '',
        address: string = '',
        validated: boolean = false
    ) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.address = address;
        this.validated = validated;
    }
}