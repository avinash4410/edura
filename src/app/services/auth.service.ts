import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../Models/user.model';
import { AuthResponse } from '../Interfaces/auth-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenExpirationTimer: any;
  user = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient, private router: Router) {
    this.autoSignIn();
  }

  /* SignUp(firstName: String, lastName: String, email: String, password: String) {
    return this.http.post<AuthResponse>(environment.backend + 'user', {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    }).pipe(
      tap(res => {
        this.authenticatedUser(res._id, res.firstName, res.email, res.token, +res.expiresIn, res.password, res.role)
      }))
  } */
  SignUp(obj) {
    return this.http.post<AuthResponse>(environment.backend + 'user', obj).pipe(
      tap(res => {
        this.authenticatedUser(res._id, res.firstName, res.email, res.token, +res.expiresIn, res.password, res.role)
      }))
  }

  SignIn(email: string, password: string) {
    return this.http.post<AuthResponse>(environment.backend + 'user/login', {
      email: email,
      password: password
    },
      {
        headers: new HttpHeaders({
          'username': email,
          'password': password
        })
      }

    ).pipe(
      tap(res => {
        this.authenticatedUser(res._id, res.firstName, res.email, res.token, +res.expiresIn, res.password, res.role)
      }))
  }
  autoSignIn() {
    let UserData = JSON.parse(localStorage.getItem('UserData') || '{}')
    if (!UserData)
      return

    const loggedInUser = new User(UserData._id, UserData.firstName, UserData.email, UserData._token, new Date(UserData._tokenExpirationDate), UserData.password)
    if (loggedInUser.token) {
      this.user.next(loggedInUser)

      this.router.navigate(['dashboard']);  // Redirect To homepage if user already logged in
    }
    const expirationDuration = new Date(UserData._tokenExpirationDate).getTime() - new Date().getTime()
    this.autoSignOut(expirationDuration)
  }
  SignOut() {
    this.user.next(null)
    localStorage.removeItem('UserData');
    this.router.navigate(['login']);

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null

    /* this.SignedIn=false
    this.router.navigate(['']); */
  }

  autoSignOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.SignOut()
    }, expirationDuration)
  }

  private authenticatedUser(_id: string, firstName: string, email: string, token: string, expiresIn: number, password: string, role: Array<string>) {
    let expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(_id, firstName, email, token, expirationDate, password, role)
    this.user.next(user)  //Store data in User Subject
    localStorage.setItem('UserData', JSON.stringify(user));
    this.autoSignOut(expiresIn * 1000)
  }
}
