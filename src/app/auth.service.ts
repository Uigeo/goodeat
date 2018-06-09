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
import { User, Food, History } from './data';


@Injectable()
export class AuthService {
  user: Observable<User>;
  history: Observable<History[]>;
  userid: string;
  lo: Location;
  likeDoc: AngularFirestoreDocument<User>;
  historyDoc: AngularFirestoreDocument<User>;
  historyCollection: AngularFirestoreDocument<User>;
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
            name: user.displayName,
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

  addHistory(foodid: string, food: Food, datetime: number) {
    this.user.subscribe(user =>  {
      this.userid = user.uid;
      this.historyDoc = this.afs.doc<User>(`users/${user.uid}`);
    this.historyDoc.collection('history').add({foodid: foodid, winner: food, datetime: Date.now()} as History );
    });
  }

  getHistory() {
    return this.afAuth.authState.switchMap( user => {
      if (user) {

        const docref = this.afs.doc<User>(`users/${user.uid}`);
       docref.valueChanges().subscribe(doc => console.log(doc, 'getHistory') );

        return docref.collection<History>('history', ref => ref.orderBy('datetime')).valueChanges();
      } else {
        return of(null);
      }
    });
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

