import { Injectable } from '@angular/core';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person } from 'src/app/model/person.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private users: Array<User> = [];
  public signedIn: boolean = false;
  public activeUser: User | null = null;

  constructor(private router: Router, private http: HttpClient) {
    //testni podaci
    //this.users.push();
    // this.users.push(new User("Ime 2", "Prezime 2", "user2", "pass2"));
    // this.users.push(new User("Ime 3", "Prezime 3", "user3", "pass3"));
  }

  public async login(username: string, password: string): Promise<boolean> {
    let result = false;
    this.activeUser = null;
    let objekat = new Person(username, password);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('authentication', `${student.token}`);

    const url = 'http://localhost:8080/administratori/login';


    // setTimeout(() => {
    await this.http
      .post<User>(url, JSON.stringify(objekat), { headers: new HttpHeaders().set('Content-Type', 'application/json') }).toPromise().then(data => {
        console.log("OVO JE ODGOVOR");
        console.log(data);
        result = true;
        this.activeUser = data;
        this.signedIn = result;
      });
    /* .subscribe({
       next: (data: User | null) => {
         console.log("OVO JE ODGOVOR");
         console.log(data);
         result = true;
         this.activeUser = data;
         this.signedIn = result;
         //return result;
       }
     });
   }, 3000);*/
    return result;
  }

  public logout() {
    this.activeUser = null;
    this.signedIn = false;
    this.router.navigate(['/']);
  }

}

