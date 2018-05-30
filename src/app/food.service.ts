import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Food } from './data';


@Injectable()
export class FoodService {

  foodDoc: AngularFirestoreDocument<Food>;
  foodCollectionRef: AngularFirestoreCollection<Food>;
  foods: Observable<Food[]>;

  constructor( public db: AngularFirestore ) {
    this.foodCollectionRef = this.db.collection<Food>('foods', ref => ref.orderBy('name'));
  }

  getFoods(): Observable<Food[]> {
    this.foods = this.foodCollectionRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Food;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });
    return this.foods;
  }

  getFood(id: string): Observable<Food> {
    this.foodDoc = this.db.doc<Food>('foods/' + id);
    return this.foodDoc.valueChanges();
  }

  addFood( food: Food ): void {
    this.foodCollectionRef.add(food);
  }

  deleteFood(id: string) {
    this.foodDoc = this.db.doc<Food>('foods/' + id);
    this.foodDoc.delete();
  }

  updateFood(id: string, food: Food) {
    this.foodCollectionRef.doc(id).update(food);
  }
}
