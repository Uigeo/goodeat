import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  auth: AngularFireAuth;
  constructor(private authService: AuthService) {
    this.auth = authService.afAuth;
  }
  title = 'Heroes';

  logout() {
    this.authService.logout();
  }
}
