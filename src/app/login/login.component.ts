import { Observable } from 'rxjs';

import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from '../Interfaces/auth-response.interface';
import Swal from 'sweetalert2';
import { EmailValidator } from '../Helper/customValidators';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  NAAA: any;
  loginMode = true;
  Form: FormGroup | any

  otpMode = false;
  forgetMode = false
  emailRequired = false
  otpRequired = false
  otpSent = false
  // SITE_KEY = environment.SITE_KEY
  userInput: string = ''; // Property to store user input
  captchaText: string = ''; // Property to store CAPTCHA text

  constructor(
    private _authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.reloadCaptcha();

    this.Form = new FormGroup({

      'name': new FormControl(''),
      'contactNumber': new FormControl(null),
      'city': new FormControl(null),
      'id_proof': new FormControl(null),
      'email': new FormControl(null),
      'organization_name': new FormControl(null),
      'age': new FormControl(null),
      'username': new FormControl(null),//, [Validators.required]),
      'password': new FormControl(null),//, Validators.required),
      'emailOTP': new FormControl(null),//, Validators.required),
      'captchaText': new FormControl('', [Validators.required, this.captchaValidator()])
    })
  }

  captchaValidator() {
    return (control: AbstractControl): ValidationErrors | null | any => {

      const value = control.value;

      if (!value) {
        return null;
      }

      return value != this.captchaText ? { invalidCaptcha: true } : null;
    }
  }

  drawCaptcha(): void {
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');

    // Check if canvas exists before attempting to use it
    if (canvas) {
      const ctx = canvas.getContext('2d');

      // Clear the canvas
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Define the characters allowed in the CAPTCHA
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        // Generate a random CAPTCHA text
        this.captchaText = this.generateRandomString(characters, 6);

        // Set font and text color
        ctx.font = '24px Arial';
        ctx.fillStyle = '#000'; // Black color

        // Calculate text position
        const textX = 6;
        const textY = canvas.height / 2;

        // Draw the CAPTCHA text on the canvas
        ctx.fillText(this.captchaText, textX, textY);
      }
    }
  }


  
  reloadCaptcha(): void {
    this.drawCaptcha(); // Call the drawCaptcha function when the "Reload" button is clicked
    this.userInput = ''; // Clear user input
  }

  // TypeScript function for generating random text
  private generateRandomString(characters: string, length: number): string {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  passwordValidator(control: FormControl) {
    const value = control.value;
    if (!value) return null; // If empty, don't show error
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const valid = strongPasswordRegex.test(value);
    return valid ? null : { invalidPassword: true };
  }
  
  onModeSwitch() {
    this.loginMode = !this.loginMode
  }

  loginWithOtp() {
    this.otpMode = !this.otpMode
  }

  onLogin() {
    const firstName = this.Form.value.firstName;
    const lastName = this.Form.value.lastName;
    const email = this.Form.value.username;
    const password = this.Form.value.password;
    this.Form.markAllAsTouched()
    if (this.Form.valid) {

      let authObservavle:Observable<AuthResponse>

      if (this.loginMode) {
        authObservavle = this._authService.SignIn(email, password)
      } else {
        // authObservavle = this._authService.SignUp(firstName,lastName,email , password)
        authObservavle = this._authService.SignUp({firstName,lastName,email , password})
      }
      authObservavle.subscribe( res => {
         if(res?.error?.code==401){
            Swal.fire({
              icon:'error',
              title: 'Error..!',
              text: res.error?.message,
           })
         }
         else{
        Swal.fire({
          icon: 'success',
          title: "Login Successfully!",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/dashboard']);
      }},
      err => {
        Swal.fire({
          icon: 'error',
          title: "Invalid User..!",
          text:err.error.message,
        })
      })
    }
  }

  sendEmailVerificationCode(email: String) {
    if (email) {
      let body = { email: email }
      this.userService.sendOtpOnMail(body).subscribe(
        (res: any) => {
          this.otpSent = true
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Otp sent succcessfully...',
            showConfirmButton: false,
            timer: 1500
          });
        },
        (err: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error..!',
            text: err.error ? err.error.message : err.sqlMessage
          });
        }
      );
    }
    else this.emailRequired = true
  }

  verifyOTP(email: string, otp: string) {
    if (otp) {
      let body = { email: email, emailOTP: otp }
      this.userService.verifyEmailOTP(body).subscribe(
        (res: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Login succcessfully...',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['dashboard']);
        },
        (err: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error..!',
            text: err.error ? err.error.message : err.sqlMessage
          });
        }
      );
    }
    else { this.otpRequired = true }
  }

  resetPassword(){
    this.Form.markAllAsTouched();
    let body = { email: this.Form.value.email, emailOTP: this.Form.value.emailOTP,password:this.Form.value.password }
    console.log(body);
    this.userService.resetPassword(body).subscribe(
      (res: any) => {
        if(res.statusCode==200){
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.Form.reset()
        this.reloadCaptcha()
        this.forgetMode = false
        this.router.navigate(['login']);
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: res.error.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
      },
      (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error..!',
          text: err.error.message 
        });
      }
    );
  }


  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  forget() {
    this.forgetMode = !this.forgetMode
  }
}
