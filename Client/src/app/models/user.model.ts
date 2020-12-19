export class User {
    _id: string;
    fullname: string;
    email: string;
    password: string;
    error?: string;
    token?: string;
    isAdmin?: boolean;
}