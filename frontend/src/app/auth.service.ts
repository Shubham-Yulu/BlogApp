import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http : HttpClient, private router: Router) { }

  private url = "http://localhost:3000/api/auth";

  register(data: any){
    return this.http.post<any>(this.url + "/register", data)
  }

  login(data: any) {
    return this.http.post<any>(this.url + "/login", data)
  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigateByUrl("/login");
  }

  isLoggedIn(){
    const token = localStorage.getItem('token')

    if (token === null) {
      return false;
    }

    return true;
  }
}