import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin! : FormGroup;

  constructor(private fb : FormBuilder, private authService:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
    if(this.authService.loadJwtTokenFromLocalStorage()){
      Utils.showSweetAlert("Info","Already logged In, please log out first","info");
      this.router.navigate(['/list-book']);
    }
    this.formLogin=this.fb.group({
      username:this.fb.control(''),
      password:this.fb.control('')
    })
  }

  handleLogin() : void {
    let username = this.formLogin.value.username;
    let pwd = this.formLogin.value.password;
    
    this.authService.login(username, pwd).subscribe({
      next: (data: any) : void => {
        
        this.authService.loadProfile(data);
        this.router.navigateByUrl("/list-book");
      },
      error: (err: any) : void => {
        console.error(err);
        if (err.status === 401) {
          Utils.showSweetAlert("","Invalid Username or password",'error');
        } else {
          Utils.showSweetAlert("error","An error occurred during login. Please try again later.",'error');
        }
      }
    });
  }




}