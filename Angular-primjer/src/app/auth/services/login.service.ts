import { Injectable } from '@angular/core';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person } from 'src/app/model/person.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval, Subscriber } from 'rxjs';
import { VirtuelnaPosjeta } from 'src/app/model/virtuelna_posjeta.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  mySub: any;
  private users: Array<User> = [];
  public signedIn: boolean = false;
  public activeUser: User | null = null;
  public posjete: VirtuelnaPosjeta[] = [];

  constructor(private router: Router, private http: HttpClient, private snackBar: MatSnackBar) {
    
    

  }

  public async login(username: string, password: string): Promise<boolean> {
    let result = false;
    this.activeUser = null;
    let objekat = new Person(username, password);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('authentication', `${student.token}`);

    const url = 'http://localhost:8080/login';

    
   // setTimeout(() => {
      await this.http
        .post<User>(url, JSON.stringify(objekat), { headers: new HttpHeaders().set('Content-Type', 'application/json') }).toPromise().then(data => {
          console.log("OVO JE ODGOVOR");
          console.log(data);
          result = true;
          this.activeUser = data;
          this.signedIn = result;
          this.periodicnaFunkcija();

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

  public logout(){
    this.activeUser = null;
    this.signedIn = false;
    this.router.navigate(['/']);
  }

  public async provjeraKorisnickogImena(username: string): Promise<boolean>{ //true za slobodno korisnicko ime
    let objekat = new Person(username, "");
    let rezultat = true;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('authentication', `${student.token}`);

    const url = 'http://localhost:8080/validacija';


    // setTimeout(() => {
   return  await this.http
      .post<User>(url, JSON.stringify(objekat), { headers: new HttpHeaders().set('Content-Type', 'application/json') }).toPromise().then(data => {
        console.log("Nije greska"+data);
        if (data == null)
          return true;
        else
          return false;
      }).catch((err) => {
        return false;
      });
  }

  public async rigustrujKorisnika(element: any): Promise<boolean>
  {
    let result = false;
    let user: User = new User();
    user.ime = element.ime;
    user.prezime = element.prezime;
    user.email = element.email;
    user.username = element.username;
    user.password = element.password;
    user.blokiranNalog = 'F';
    user.odobrenNalog = 'F';
    user.token = Math.floor(Math.random() * (10000000 + 1)) + "";
    const url = 'http://localhost:8080/korisnici';
    return this.http
      .post<User>(url, JSON.stringify(user), { headers: new HttpHeaders().set('Content-Type', 'application/json') }).toPromise().then(data => {
        console.log("OVO JE ODGOVOR");
        console.log(data);
        result = true;
        this.activeUser = data;
        this.signedIn = result;
        return result;
      }).catch((err) => {
        return false;
      });
    
  }


  periodicnaFunkcija()
  {

    this.http.get<any>('http://localhost:8080/posjete/karte/' + this.activeUser?.token).toPromise().then(data => {
      this.posjete = data;
      
      this.mySub = interval(30000).subscribe((func => {
        console.log("provjera");
        this.posjete.forEach((element: any) => {
          let pom = (element.datum + '').split('-');

          let godina = Number(pom[0]);
          let mjesec = Number(pom[1]);
          let dan = Number(pom[2]);
          let datum: Date = new Date();
          datum.setFullYear(godina, mjesec - 1, dan);


          let vrijeme: string = element.vrijemePocetka + '';
          let parsirano: any = vrijeme.split(":");
          let sati = Number(parsirano[0]);
          let minute = Number(parsirano[1]);
          datum.setHours(sati);
          datum.setMinutes(minute);
          console.log(datum);


          let trajanje: number = Number(element.trajanje);
          let krajPredstave: Date = datum;

          let prijePocetka: Date = new Date(datum+'');
          prijePocetka.setHours(prijePocetka.getHours() - 1);
          krajPredstave.setHours(krajPredstave.getHours() + trajanje);
          console.log("Kraj predstave : " + krajPredstave);
          let isticanje: Date = new Date(krajPredstave+'');
          isticanje.setMinutes(isticanje.getMinutes() + 5);
          let trenutno: Date = new Date();
          console.log("ISticanje full " + (isticanje.getFullYear() == trenutno.getFullYear()));
          console.log("ISticanje full " + (isticanje.getHours() == trenutno.getHours()));
          console.log("ISticanje full " + (isticanje.getMinutes() == trenutno.getMinutes()));
          if (isticanje.getFullYear() == trenutno.getFullYear() && isticanje.getHours() == trenutno.getHours() && isticanje.getMinutes() == trenutno.getMinutes()) {
            this.snackBar.open("Predstava istice, pogledate prezentaciju ponovo...!", undefined, {
              duration: 2000
            })
            //alert("IStice");

          }
          if (prijePocetka.getFullYear() == trenutno.getFullYear() && prijePocetka.getHours() == trenutno.getHours() && prijePocetka.getMinutes() == trenutno.getMinutes()) {
            console.log("Obavijestenje");
            this.snackBar.open("Prezentacija muzeja " + element.idMuzej + " pocinje za sat vremena pogledate prezentaciju ponovo...!", undefined, {
              duration: 2000
            })
           // alert("Prezentacija muzeja " + element.idMuzej + " pocinje za sat vremena pogledate prezentaciju ponovo...!");
          }
          

        })
      }));




    });
    
   
  }
}

