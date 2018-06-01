import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Food } from '../data';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AuthService } from '../auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-food-table',
  templateUrl: './food-table.component.html',
  styleUrls: ['./food-table.component.css']
})

export class FoodTableComponent implements AfterViewInit {
  displayedColumns = ['name', 'price', 'store', 'category', 'victory'];
  dataSource: MatTableDataSource<Food>;
  foods: Food[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public auth: AuthService, public fs: FoodService, private afs: AngularFirestore) {
    this.fs.getFoods().subscribe(foods => {
      this.foods = foods;
      this.dataSource = new MatTableDataSource<Food>(this.foods);
      console.log('Hello');
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getFoods(): void {
    this.fs.getFoods().subscribe(foods => {
      this.foods = foods;
      this.dataSource = new MatTableDataSource<Food>(this.foods);
    });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


}

