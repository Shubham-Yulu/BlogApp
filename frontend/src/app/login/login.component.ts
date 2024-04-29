import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  form = new FormGroup({
    username : new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  invalidLogin : boolean | undefined;

  constructor(private authService : AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  get username(){
    return this.form.get('username');
  }

  get password(){
    return this.form.get('password');
  }

  get confirmPassword(){
    return this.form.get('confirmPassword');
  }

  submitForm = () => {
    const data = this.form.value;
    this.authService.login(data).subscribe(
      (result: any)=>{
        if(result && result.token){
          localStorage.setItem('token', result.token)
          this.router.navigateByUrl("/")
        }
      },
      (error: any)=>{
        this.form.setErrors({
          loginError : error.error?.message
        })
        this.invalidLogin = true;
      }
    )
  };
  
}
