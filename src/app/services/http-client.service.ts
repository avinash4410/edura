import { AuthService } from './auth.service';
import { Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class httpClient{
  user:any;
  token:any;

  constructor(private http: HttpClient,private _authService:AuthService) {
    this.getUserAndPassword()
  }
  getUserAndPassword(){
    this._authService.user.subscribe(res =>{
      if(res && res!=null){
      this.user=res.email;
      this.token=res.token;
      }
    });
  }

  get(url:any) {
    return this.http.get(url,{headers: {'username':this.user,'token':this.token}});
  }
  
  post(url:any, data:any) {
    let a= this.http.post(url, data);
    return a
  }

  put(url:any, data:any) {
    return this.http.put(url, data,{headers: {'username':this.user,'token':this.token}});
  }

  delete(url:any) {
    return this.http.delete(url,{headers: {'username':this.user,'token':this.token}});
  }
}