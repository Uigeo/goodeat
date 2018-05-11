import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth.service';
import { Observable } from '@firebase/util';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users: User[];
  uid = 'LL' ;
  constructor(public auth: AuthService, private userService: UserService) {}
  ngOnInit() {

  }

  userCheck() {
    this.uid = 'absdfs';
    this.auth.afAuth.authState.subscribe(user => this.uid = user.uid);
    if (this.userService.getUser(this.uid).subscribe(user => user.length === 0) ) {
      this.userService.getUser(this.uid).subscribe(user => this.users = user.slice(0, user.length));
      this.userService.addUser(this.users[0].uid, this.users[0].nickname, this.users[0].email);
    }
  }

  oauthLogout() {
    this.auth.logout();
  }


}
