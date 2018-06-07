import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ObservableMedia } from '@angular/flex-layout';
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { Time } from '@angular/common';
import { LikeHero } from './hero-table/hero-table.component';
import { User, Food } from './data';


@Injectable()
export class AuthService {
  user: Observable<User>;
  likes: Observable<LikeHero[]>;
  userid: string;
  lo: Location;
  likeDoc: AngularFirestoreDocument<User>;
  likesCollection: AngularFirestoreCollection<LikeHero>;
  foods: Observable<Food[]>;

  constructor(public afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router ) {
      this.user = this.afAuth.authState.switchMap( user => {
        if (user) {
          console.log('1');
          this.userid = user.uid;
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      });
      this.likes = this.afAuth.authState.switchMap( user => {
        if (user) {
          console.log('2');
          const docref = this.afs.doc<User>(`users/${user.uid}`);
          return docref.collection<LikeHero>('likes', ref => ref.orderBy('date')).valueChanges();
        } else {
          return of(null);
        }
      });
      console.log('3');
  }


  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then( credential => {this.updateUserDate(credential.user); });
  }



  private updateUserDate(user) {
    this.afs.firestore.doc(`users/${user.uid}`).get()
      .then(docSnapshot => {
        if (!docSnapshot.exists) {
          const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
          const data: User = {
            uid: user.uid,
            email: user.email,
            gender: user.gender,
            age: user.age,
            name: user.displayName,
            zip: user.zip,
            addr: user.addr,
            addrEng: user.addrEng,
            birth: user.birth,
          };
          return userRef.set(data);
        }
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  setUserInfo(user: User) {
    this.afs.doc(`users/${user.uid}`).update(user);
  }

  addLikeHero(hid: string, heroName: string) {
    this.user.subscribe(user =>  {
      this.userid = user.uid;
      this.likeDoc = this.afs.doc<User>(`users/${this.userid}`);
    this.likeDoc.collection('likes').add({hid: hid, heroName: heroName, date: Date.now()});
    });
  }

  getLikeHero() {
    return this.likes;
  }

  userOn() {
    this.user.subscribe(user =>  this.userid = user.uid);
  }

  getMyFood() {
    this.user.subscribe(user => {
      const collection = this.afs.collection<Food>('foods', ref => ref.where('register', '==', this.userid));
      this.foods = collection.snapshotChanges().map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Food;
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      });
      return this.foods;
    });
  }
}

