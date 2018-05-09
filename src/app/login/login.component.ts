import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth.service';
import { Observable } from '@firebase/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  auth: AngularFireAuth;
  constructor(private authService: AuthService) {
    this.auth = authService.afAuth;
   }

  ngOnInit() {
  }

  oauthLogin() {
    this.authService.login();
  }

  oauthLogout() {
    this.authService.logout();
  }


}
