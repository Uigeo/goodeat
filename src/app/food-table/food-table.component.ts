import { Component, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { Food } from '../data';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { FoodService } from '../food.service';
import { FoodDetailComponent } from '../food-detail/food-detail.component';


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

  constructor(public auth: AuthService,
              public fs: FoodService,
              public dialogRef: MatDialogRef<FoodTableComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.fs.getFoods().subscribe(foods => {
      this.foods = foods;
      this.dataSource = new MatTableDataSource<Food>(this.foods);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  moveToDetail(id: string) {
      window.location.href = '/detail/' + id;
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


}

