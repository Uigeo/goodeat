import { Component, OnInit,  ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { AuthService, User } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FirebaseDatabase } from '@firebase/database-types';


@Component({
  selector: 'app-hero-table',
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.css']
})
export class HeroTableComponent implements OnInit {
  likeHeroes: LikeHero[];
  displayedColumns = ['hid', 'heroName', 'date'];
  dataSource: MatTableDataSource<LikeHero>;
  constructor(public auth: AuthService,
              private afs: AngularFirestore
  ) {
  }

  ngOnInit() {
    this.getLikeHeros();
  }

  getLikeHeros() {
    this.auth.getLikeHero().subscribe(likes => {
      this.likeHeroes = likes;
      this.dataSource = new MatTableDataSource<LikeHero>(this.likeHeroes);
    });
  }
}

export interface LikeHero {
  hid: string;
  heroName: string;
  date: number;
}
