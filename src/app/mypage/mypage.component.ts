import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../data'
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
  panelOpenState = false;
  dataSource: LikeHero[] = [];
  displayedColumns = ['Hero Name', 'Time'];

  ages = [
    {value: '1990', viewValue: '1990년생'},
    {value: '1991', viewValue: '1991년생'},
    {value: '1992', viewValue: '1992년생'},
    {value: '1993', viewValue: '1993년생'},
    {value: '1994', viewValue: '1994년생'},
    {value: '1995', viewValue: '1995년생'},
    {value: '1996', viewValue: '1996년생'},
    {value: '1997', viewValue: '1997년생'},
    {value: '1998', viewValue: '1998년생'},
    {value: '1999', viewValue: '1999년생'},
    {value: '2000', viewValue: '2000년생'},
   
  ];

  genders = [
    {value: '남성', viewValue: '남성'},
    {value: '여성', viewValue: '여성'},
    
  ];

  addresses = [
    {value: '양덕동', viewValue: '양덕동'},
    {value: '장량동', viewValue: '장량동'},
    {value: '한동대', viewValue: '한동대'},
    
  ];

  constructor(public auth: AuthService) { }

  getUser(): void {
    this.auth.user.subscribe(user => this.user = user);
  }

  ngOnInit() {
    this.getUser();
  }

  setAge(age: string) {
    this.user.age = parseInt(age);
    this.auth.setUserInfo(this.user);
  }

  //나중에 채워야함
  setGender(gender: string) {
    this.user.gender = gender;
    this.auth.setUserInfo(this.user);
  }

  //나중에 채워야함
  setAddress(address: string){
    this.user.address = address;
    this.auth.setUserInfo(this.user);
  }

  

}
