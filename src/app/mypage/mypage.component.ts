import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../auth.service';
import {MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';

export interface LikeHero {
  name: string;
  time: string;
}

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {
  @Input() user: User;
  dataSource: LikeHero[] = [];
  displayedColumns = ['Hero Name', 'Time'];

  constructor(public auth: AuthService) { }

  getUser(): void {
    this.auth.user.subscribe(user => this.user = user);
  }

  getLikeHeroes(): void {

  }

  ngOnInit() {
    this.getUser();
  }

  setAge(age: string) {
    this.user.age = parseInt(age, 10);
    this.auth.setUserInfo(this.user);
  }

  setNick(nick: string) {
    this.user.nickname = nick;
    this.auth.setUserInfo(this.user);
  }
}
