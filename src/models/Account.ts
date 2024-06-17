export default class Account {
   public id!: string;
   public username: string;
   public password: string;
   public email: string;
   public role: string;

   constructor(
      username: string = '',
      password: string = '',
      email: string = '',
      role: string = ''
   ) {
      this.username = username;
      this.password = password;
      this.email = email;
      this.role = role;
   }
}