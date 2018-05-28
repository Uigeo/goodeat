import { Injectable } from '@angular/core';
import { Food } from './data';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class FoodService {

  constructor() { }

}
