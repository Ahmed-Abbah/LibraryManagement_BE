import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { User } from 'src/entities/User';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated:boolean=false;
  roles:any;
  accessToken!:any;
  userId:any;
  constructor(private http:HttpClient,private router:Router) { }

  public login(username:string, password:string) : Observable<any>{
      let options : { headers : HttpHeaders }={
        headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
      }
    let params : HttpParams = new HttpParams().set("username", username).set("password", password);
    return this.http.post("http://localhost:3000/auth/login", params, options)
  }

  public register(data: User):Observable<any>{
    return this.http.post("http://localhost:3000/users", data)
  }
  loadProfile(data: any) {
    this.accessToken = data['access_token'];
    if (this.accessToken) {
      try {
        let decodedJwt: any = jwtDecode(this.accessToken);
        this.userId = decodedJwt.sub;
        console.log("loggedIn user ID is :" + decodedJwt.sub);
        this.roles = decodedJwt.scope;
      
        window.localStorage.setItem("jwt-token", this.accessToken);
        this.isAuthenticated = true;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Logged In successfully',
          showConfirmButton: false,
          timer: 1000
        })
        this.router.navigateByUrl("/");
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
    } else {
      console.error('Invalid or missing token.');

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Incorrect email or password !',
        showConfirmButton: false,
        timer: 500
      })
    }
  }

  loadLoggedUserId(): string | null {
    const jwtToken = window.localStorage.getItem("jwt-token");
    if (jwtToken) {
      const decodedJwt: any = jwtDecode(jwtToken);
      this.userId = decodedJwt.sub;
      return this.userId;
    } else {
      return null;
    }
  }

  logout() {
    this.isAuthenticated=false;
    this.accessToken=undefined;
    this.userId=undefined;
    this.roles=undefined;
    window.localStorage.removeItem("jwt-token");
    this.router.navigateByUrl("/login");
  }

  loadJwtTokenFromLocalStorage(): boolean {
    const token = window.localStorage.getItem("jwt-token");

    if (token) {
        let decodedJwt: any;
        try {
            decodedJwt = jwtDecode(token);
        } catch (error) {
            return false;
        }
        if (decodedJwt && decodedJwt.exp) {
            const expirationTimestamp = decodedJwt.exp * 1000;
            const currentTimestamp = Date.now();

            if (currentTimestamp > expirationTimestamp) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}




}







