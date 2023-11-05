export class User {
    username: string | null;
    password: string | null;
    ime: string | null;
    prezime: string | null;
    token: string | null;
    email: string | null;
    odobrenNalog: string | null;
    blokiranNalog: string | null

    constructor(username?: string, password?: string, token?: string, email?: string, ime?: string, prezime?: string, odobrenNalog?: string, blokiranNalog?: string) {
        this.username = username || null;
        this.password = password || null;
        this.token = token || null;
        this.email = email || null;
        this.ime = ime || null;
        this.prezime = prezime || null;
        this.odobrenNalog = odobrenNalog || null;
        this.blokiranNalog = blokiranNalog || null;
    }
}