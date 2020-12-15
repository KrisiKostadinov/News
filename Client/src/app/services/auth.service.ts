import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = environment.url;
  registerPath: string = '/user/register';
  loginPath: string = '/user/login';

  constructor(private http: HttpClient) { }

  register(data): Observable<User> {
    return this.http.post<User>(this.url + this.registerPath, data);
  }

  login(data): Observable<User> {
    return this.http.post<User>(this.url + this.loginPath, data);
  }
  
  logout() {
    localStorage.clear();
  }

  saveToken(data) {
    localStorage.setItem('token', data);
  }
  
  get getToken() {
    return localStorage.getItem('token');
  }

  saveUser(data) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  get data() {
    return JSON.parse(localStorage.getItem('user'));
  }

  public isAuthenticated() {
    const token = this.getToken;
    console.log(token);
    return !!token;
  }

}
