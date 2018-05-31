import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ismain = window.location.href.search('main');
  constructor(public auth: AuthService) {

  }
  title = '오늘 뭐 먹지?';
}
