import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/service/auth.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-usernavbar',
  templateUrl: './usernavbar.component.html',
  styleUrls: ['./usernavbar.component.css']
})
export class UsernavbarComponent {
 

  constructor(private uService:UserService ,public router:Router,public authService : AuthenticationService){}
  logout()
  {
    this.uService.logout();
    this.router.navigate(['']);
  }
}
