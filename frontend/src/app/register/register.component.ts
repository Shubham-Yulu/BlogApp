import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form = new FormGroup({
    username : new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', [Validators.required]),
    role: new FormControl('', Validators.required)
  })

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
    console.log(data);
    this.authService.register(data).subscribe(
      (result: any)=>{
        this.router.navigateByUrl("/login");
      },
      (error: any)=>{
        this.form.setErrors({
          registerError : error.error?.message
        })
      }
    )
  };

}
