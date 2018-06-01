import { Component, Inject, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Food } from '../data';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit {

  food: Food;
  id: string;

  constructor(
    public fs: FoodService,
    private route: ActivatedRoute,
    private location: Location,
    ) { }

  getFood(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      this.fs.getFood(this.id).subscribe(food => {console.log(food); this.food = food;} );
  }

  ngOnInit(): void {
    this.getFood();
  }

}