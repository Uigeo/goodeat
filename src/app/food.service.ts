import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Food } from './data';
import { AddFoodComponent } from './add-food/add-food.component';


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

  getBattleFoods(category: string[], maxPrice: number, portion: number ): Observable<Food[]> {

    const Ref = this.db.collection<Food>('foods', ref => ref.where('price', '>=', maxPrice));
    //.where('portion', '<=', portion)
    this.foods = Ref.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Food;
        const id = action.payload.doc.id;
        for (let index = 0; index < category.length; index++) {
          if (data.category.find(o => o === category[index])) {
            console.log('uuu');
            return { id, ...data };
          }
        }
      });
    });
    return this.foods;
  }

  getMyFood(uid: string): Observable<Food[]> {
    console.log(uid);
    const collection = this.db.collection<Food>('foods', ref => ref.where('register', '==', uid));
    this.foods = collection.snapshotChanges().map(actions => {
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
    console.log('add Food');
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
