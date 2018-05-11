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

  constructor(public auth: AuthService) {}

  ngOnInit() {

  }
  oauthLogout() {
    this.auth.logout();
  }
}
