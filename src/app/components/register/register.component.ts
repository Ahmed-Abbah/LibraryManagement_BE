import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Utils } from 'src/app/utils/Utils';
import { User } from 'src/entities/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formRegister!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
    if(this.authService.loadJwtTokenFromLocalStorage()){
      Utils.showSweetAlert("Info","Already logged In, please log out first","info");
      this.router.navigate(['/list-book']);
    }
    this.initializeForm();
  }

  initializeForm(): void {
    this.formRegister = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roles: ['USER']
    });
  }


  handleRegistration(): void {
    if (this.formRegister.valid) {
      const registrationData : User = this.formRegister.value;
      this.authService.register(registrationData).subscribe({
        next: (response: any):void => {
          console.log('success', response);
          this.router.navigateByUrl('/login').then(():void => {
            console.log('Navigation completed');
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Registered successfully, please log in!',
              showConfirmButton: false,
              timer: 1500
            });
          });
        },
        error: (err: any) => {
          console.error(err);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: "Email Already Exist !",
            showConfirmButton: true
          });
        }
      });
    }else{
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Invalid Input !',
        showConfirmButton: false,
        timer: 1500
      })  }
  }



}
