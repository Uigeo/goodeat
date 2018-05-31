import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../data'
import {MatTableDataSource, MatSnackBar} from '@angular/material';
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
  
  
  
  @Input() var: any;
  

  genders = [
    {value: '남성', viewValue: '남성'},
    {value: '여성', viewValue: '여성'},
    
  ];

  

  constructor(public auth: AuthService,
    public snackBar: MatSnackBar) { }

  getUser(): void {
    this.auth.user.subscribe(user => this.user = user);
  }

  ngOnInit() {
    this.getUser();
  }


  //나중에 채워야함
  setGender(gender: string) {
    this.user.gender = gender;
    this.auth.setUserInfo(this.user);
    this.snackBar.open('Saved Gender', 'x', {
      duration: 1000
    });
  }

  //다음지도
  setZip(zip: string){
    this.user.zip = zip;
    this.auth.setUserInfo(this.user);
  }

  setAddr(addr: string){
    this.user.addr = addr;
    this.auth.setUserInfo(this.user);
  }

  setAddrEng(addrEng: string){
    this.user.addrEng = addrEng;
    this.auth.setUserInfo(this.user);
  }
  daumAddressOptions =  {
    class: ['btn', 'btn-primary']
  };
   
  setDaumAddressApi(data){
    this.snackBar.open('Saved Address', 'x', {
      duration: 1000
    });
    this.setZip(data.zip);
    this.setAddr(data.addr);
    this.setAddrEng(data.addrEng);
  }
  
  setBirth(birth){
    this.snackBar.open('Saved Birthdate', 'x', {
      duration: 1000
    });
    this.user.birth = birth;
    this.auth.setUserInfo(this.user);
  

    
  }
}