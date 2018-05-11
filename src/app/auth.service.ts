import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ObservableMedia } from '@angular/flex-layout';
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { Time } from '@angular/common';


export interface User {
  uid: string;
  name: string;
  nickname?: string;
  email: string;
  age?: number;
}

@Injectable()
export class AuthService {

  user: Observable<User>;
  userid: string;
  private likeDoc: AngularFirestoreDocument<any>;

  constructor(public afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router ) {
      this.user = this.afAuth.authState.switchMap( user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      });
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
            name: user.displayName
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
    this.user.subscribe(user => this.userid = user.uid);
    this.likeDoc = this.afs.doc<User>(`users/${this.userid}`);
    console.log(this.userid);

    this.likeDoc.collection('likes').add({hid: hid, heroName: heroName, date: Date.now()});
  }
}
