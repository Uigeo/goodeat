import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AddFoodComponent } from '../add-food/add-food.component';
import { MatDialog } from '@angular/material';
import { FoodTableComponent } from '../food-table/food-table.component';

@Component({
  selector: 'app-inheader',
  templateUrl: './inheader.component.html',
  styleUrls: ['./inheader.component.css']
})
export class InheaderComponent implements OnInit {

  constructor(public auth: AuthService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  openAddFoodDialog(): void {
    const dialogRef = this.dialog.open(AddFoodComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openFoodsDialog(): void {
    const dialogRef = this.dialog.open(FoodTableComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
