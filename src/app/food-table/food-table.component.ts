import { Component, OnInit, ViewChild } from '@angular/core';
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

export class FoodTableComponent implements OnInit {
  displayedColumns = ['name', 'price', 'store', 'category', 'victory'];
  dataSource: MatTableDataSource<Food>;
  foods: Food[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public auth: AuthService, public fs: FoodService, private afs: AngularFirestore) {
  }

  getFoods(): void {
    this.fs.getFoods().subscribe(foods => {
      this.foods = foods;
      this.dataSource = new MatTableDataSource<Food>(this.foods);
    });
  }

    /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.getFoods();
  }
}

