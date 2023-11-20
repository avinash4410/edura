import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CharactersOnlyValidator, MobileNumberValidator } from '../Helper/customValidators';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { CustomvalidationService } from '../services/customvalidation.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  url: any;
  onselectFile: any;
  registerForm!: FormGroup;
  submitted = false;
  userInput: string = ''; // Property to store user input
  captchaText: string = ''; // Property to store CAPTCHA text

  form!: FormGroup;

  message: string;
  imagePath: string;

  constructor(private loginService: AuthService, private userService: UserService, private fb: FormBuilder, private customValidator: CustomvalidationService, private router: Router) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.drawCaptcha();
    },0) // Initialize by drawing the initial CAPTCHA

    this.registerForm = this.fb.group({
      'firstName': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z]+$")]),
      'middleName': new FormControl(null, Validators.pattern("^[a-zA-Z]+$")),
      'lastName': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z]+$")]),
      'mobileNumber': new FormControl(null),//, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      mobileOTP: ['',],
      emailOTP: ['', Validators.required],
      gender: ['', Validators.required],
      govtProof: ['', Validators.required],
      orgIDType: ['', Validators.required],
      useSystem: ['', Validators.required],
      registerOrg: ['', Validators.required],
      username: ['', [Validators.required], this.customValidator.userNameValidator.bind(this.customValidator)],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      // confirmPassword: ['', [Validators.required]],
      'captchaText': new FormControl('', [Validators.required, this.captchaValidator()])
    },
      {
        validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );

  }

  /* get registerFormControl() {
    return this.registerForm.controls;
  } */

  onFileChanged(event) {
    const files = event.target.files;
    if (files.length === 0)
      return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }

  sendEmailVerificationCode() {
    this.registerForm.markAllAsTouched()
    if (this.registerForm.value.email) {
      let body = { email: this.registerForm.value.email }
        this.userService.sendOtpOnMail(body).subscribe(
          (res: any) => {
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
        console.log(this.captchaText);

        // Set font and text color
        ctx.font = '50px Arial';
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

  onSubmit() {
    console.log(this.registerForm);
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      let obj = { ...this.registerForm.value, role: ['Organization'] }
      this.loginService.SignUp(obj).subscribe(
        (res: any) => {
          console.log(res);
          if (res.statusCode == 200) {
            // localStorage.setItem('role', res.user.role);
            // localStorage.setItem('id', res.user.id);
            Swal.fire({
              icon: 'success',
              text: 'Success',
              showConfirmButton: false,
              timer: 1500
            });

            // Redirect to the login page after successful Register
            this.router.navigate(['login']);
          } else {
            // console.error('Registration failed....');
            Swal.fire({
              icon: 'error',
              title: 'Error..!',
              text: res.error.message
            });
            // Handle login failure here, show an error message, etc.
          }
        },
        (err: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error..!',
            text: err.message
          });
        }
      );
    }
  }
}
