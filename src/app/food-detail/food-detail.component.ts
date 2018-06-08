import { Component, Inject, OnInit, Input } from '@angular/core';
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

  latitude= 36.103175;
  longitude= 129.388224;
  locationChosen =true;

  @Input() food: Food;
  id: string;

  constructor(
    public fs: FoodService,
    private route: ActivatedRoute,
    private location: Location,
    ) { }

  getFood(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      this.fs.getFood(this.id).subscribe(food => {console.log(food); this.food = food; } );
  }

  ngOnInit(): void {
    this.getFood();
  }

  updateFood() {
    this.fs.updateFood( this.id , this.food);
  }

  onChoseLocation(event){
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen = true;
    console.log(event);
  }
}
