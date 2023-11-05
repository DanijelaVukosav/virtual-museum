import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  public async login(form: any) {
    // await new Promise(f => setTimeout(this.loginService.login(form.value.username, form.value.password), 1000));
    //  console.log("POSLE AWAIT " + this.loginService.activeUser);
    if (await this.loginService.login(form.value.username, form.value.password)) {
      console.log("POSLE AWAIT " + this.loginService.activeUser);
      this.router.navigate(['home']);
    } else {
      this.snackBar.open("Podaci nisu dobri", undefined, {
        duration: 2000
      })
    }
  }

}
