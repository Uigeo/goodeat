import { Component, Inject, OnInit, Input, AfterViewInit } from '@angular/core';
import { FoodService } from '../food.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Food } from '../data';
import { ActivatedRoute } from '@angular/router';
import * as geocoder from 'geocoder';




@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit, AfterViewInit {

  latitude: number;
  longitude : number;
  locationChosen = true;
  isDataLoaded = false;


  @Input() food: Food;
  id: string;

  constructor(
    public fs: FoodService,
    private route: ActivatedRoute,
    ) { }

  getFood(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      this.fs.getFood(this.id).subscribe(food => {
        this.food = food;
        console.log("FFF");
      
   
    console.log("ddd");
    if (geocoder) {
        geocoder.geocode(
          this.food.address.addr,
          (err, data) => {
            this.latitude = data.results[0].geometry.location.lat;
            this.longitude = data.results[0].geometry.location.lng;
            this.isDataLoaded = true;
            
          }
        
        );
    }
        } );
  }

  ngOnInit(): void {
    this.getFood();
  }

  updateFood() {
    this.fs.updateFood( this.id , this.food);
  }

  ngAfterViewInit() {

  }

  onChoseLocation(event) {

    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen = true;
    console.log(event);
  }
}
