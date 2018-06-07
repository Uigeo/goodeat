import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Food } from '../data';
import { AuthService } from '../auth.service';
import { FoodService } from '../food.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-myfood-table',
  templateUrl: './myfood-table.component.html',
  styleUrls: ['./myfood-table.component.css']
})
export class MyfoodTableComponent implements OnInit {

  displayedColumns = ['name', 'price', 'store', 'category', 'victory'];
  dataSource: MatTableDataSource<Food>;
  foods: Food[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public auth: AuthService, public fs: FoodService, private afs: AngularFirestore) {
    this.getMyFood();
  }

  getFoods(): void {
    this.fs.getFoods().subscribe(foods => {
      this.foods = foods;
      this.dataSource = new MatTableDataSource<Food>(this.foods);
    });
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
  }

  moveToDetail(id: string) {
    window.location.href = '/detail/' + id;
  }

  getMyFood() {
    this.auth.user.subscribe(user => {
      const collection = this.afs.collection<Food>('foods', ref => ref.where('register', '==', user.uid));
      collection.snapshotChanges().map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Food;
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      }).subscribe(food => {
        this.foods = food;
        this.dataSource = new MatTableDataSource<Food>(this.foods);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }
}
