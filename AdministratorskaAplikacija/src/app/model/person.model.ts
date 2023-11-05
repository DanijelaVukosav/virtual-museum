export class Person {
    username: string;
    password: string;

    constructor(username: string,
        password: string) {
        this.password = password;
        this.username = username;
    }

    getFullName(): string {
        return this.username + ' ' + this.password;
    }
}