import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Food } from '../data';


@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  foods: Food[];
  cat: string;
  portion: number;
  maxPrice: number;

  constructor(
    public fs: FoodService,
    private route: ActivatedRoute,
    ) {
      this.getBattleFoods();
     }

  getBattleFoods() {
    this.cat = this.route.snapshot.paramMap.get('category');
    this.portion = parseInt(this.route.snapshot.paramMap.get('max'), 10);
    this.maxPrice = parseInt(this.route.snapshot.paramMap.get('portion'), 10);

    const category = this.cat.split('$');
    console.log(category);
    category.pop();

    this.fs.getBattleFoods(category, this.maxPrice, this.portion).subscribe(foods => {
      console.log(foods);
      this.foods = foods.filter(x => x !== undefined);
      console.log(this.foods);
    });

  }

  ngOnInit() {
  }

}
