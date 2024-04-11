import { inject } from '@angular/core';
import { CanActivateFn,Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Utils } from '../utils/Utils';


export const authGuard: CanActivateFn =(route: ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const router : Router = inject(Router);
  const authService : AuthenticationService = inject(AuthenticationService);
  // if(authService.loadJwtTokenFromLocalStorage()){
  //   router.navigate([state.url]);
  //   Utils.showSweetAlert("","Already Logged In","info");
  //   return true;
  // }
  
  const protectedroutes:string[] = ['/add-book','/list-book','/modify-book'];
  if(protectedroutes.includes(state.url) && !authService.loadJwtTokenFromLocalStorage()){
    router.navigate(["/login"]);
    Utils.showSweetAlert("Unauthorized","Please Log In first !","warning");
    return false;
  }else{
    return true;
  }

};
