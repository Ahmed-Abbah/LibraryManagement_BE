import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public authService:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
    
  }
  handleLogout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
