// import { HttpClient } from '@angular/common/http';
import { httpClient } from './http-client.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userList = environment.backend + "user";
  private user = environment.backend + "user/";
  private updateuser = environment.backend + "user/";
  private uploadUrl = environment.backend + 'user';
  private deleteUrl = environment.backend + 'user/';

  private adminenquiry = environment.backend + 'enquiry/admin-enquiry';
  private listUrl = environment.backend + 'enquiry/enquiry-list';
  // private enquiryDeleteById = environment.backend + 'enquiry/enquiry/:id';
  private updateEnquiryByIdUrl = environment.backend + 'enquiry/updateEnquiry/';
  private enquiryDeleteById = environment.backend + 'enquiry/DeleteEnquiry/';
  private enquiryListUrl = environment.backend + 'enquiries';


  private enquiryById = environment.backend + 'enquiry/getsingelenquiry/';
  private getuserUrl = environment.backend + 'user/get'
  private sendEmailUrl = environment.backend + 'user/send-email-otp'
  private verifyEmailOTPUrl = environment.backend + 'user/verify-email-otp'
  private resetPasswordUrl = environment.backend + 'user/reset-password'
  enquiryShowAll: any;
  enquiries: any;
  constructor(private http: httpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(this.getuserUrl);
  }
  sendOtpOnMail(body: any): Observable<any> {
    return this.http.post(this.sendEmailUrl, body);
  }
  verifyEmailOTP(body: any): Observable<any> {
    return this.http.post(this.verifyEmailOTPUrl, body);
  }
  resetPassword(body: any): Observable<any> {
    return this.http.post(this.resetPasswordUrl, body);
  }

  


  

  getUser(): Observable<any> {
    return this.http.get(this.userList)
  }

  getSingleUser(id: string): Observable<any> {
    return this.http.get(this.user + id);
  }

  RegisterUser(obj: any): Observable<any> {
    return this.http.post(this.uploadUrl, obj)
  }

  UpdateUser(id: string, obj: any): Observable<any> {
    return this.http.put(this.updateuser + id, obj)
  }

  deleteUser(id: string) {
    return this.http.delete(this.deleteUrl + id)
  }
  addEnquiry(obj: any): Observable<any> {
    return this.http.post(this.adminenquiry, obj)
  }
  enquiryShow(): Observable<any> {
    return this.http.get(this.listUrl)

  }
  getAllEnquiry(): Observable<any> {
    return this.http.get(this.listUrl)
  }


  pageGetAll(): Observable<any> {
    return this.http.get(this.listUrl)

  }
  getsingelenquiry(id: string): Observable<any> {
    return this.http.get(this.enquiryById + id)
  }


  deleteEnquiryById(id: any) {
    return this.http.delete(this.enquiryDeleteById + id);
  }

  // http://localhost:3000/enquiry/updateEnquiry/7
  updateEnquiryById(id:any,body :any) : Observable<any> {
    return this.http.put(this.updateEnquiryByIdUrl +id , body);
    // console.log();
  }
}
