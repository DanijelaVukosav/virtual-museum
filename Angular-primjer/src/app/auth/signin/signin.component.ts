import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public forma: FormGroup = new FormGroup({});
  public poklapanjeImena:boolean =false;

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.forma = this.formBuilder.group({
      username: [null, Validators.required],
      password: ['', [Validators.required]],
      ime: [null, Validators.required],
      prezime: [null, Validators.required],
      drugaLozinka: ['', Validators.required],
      email: [null, Validators.required]
    }, { validators: this.checkPasswords });
    this.poklapanjeImena = false;
  }
  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password')?.value ;
    let confirmPass = group.get('drugaLozinka')?.value
    
    return pass === confirmPass ? null : { notSame: true }
  }
  public async register(forma: any) {
    console.log(forma);
    if (await this.loginService.rigustrujKorisnika(forma.value))
    {
      console.log("POSLE AWAIT " + this.loginService.activeUser);
      this.router.navigate(['muzeji']);
    } else {
      this.snackBar.open("Podaci nisu dobri", undefined, {
        duration: 2000
      })
    }
    
  }
  poklapanjeLozinki(): boolean
  {
    return !this.forma.value.password.startsWith(this.forma.value.drugaLozinka);
  }
  provjeraUsername()
  {
    console.log("Promena");
    this.loginService.provjeraKorisnickogImena(this.forma.value.username).then((result) => {
      
      if (result == false)
      {
        this.snackBar.open("Ukucajte novo korisnicko ime, zato sto je predlozeno ime zauzeto!", undefined, {
          duration: 2000
        });
        this.forma.value.username.setErrors({ 'incorrect': true });
      }
      else {
        if(this.forma.value.username.valid)
          this.forma.value.username.setErrors(null);
      }
    }); 
    
  }

}
