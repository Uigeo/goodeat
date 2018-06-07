import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Food, Victory } from '../data';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  final = false;
  foods: any[];
  cat: string;
  portion: number;
  maxPrice: number;
  numMatch: number;
  round = 1;
  first = 0;
  second = 1;
  length: number;
  firstFood: any;
  secondFood: any;

  constructor(
    public fs: FoodService,
    private route: ActivatedRoute,
    public auth: AuthService
    ) {
      this.getBattleFoods();
     }

  getBattleFoods() {
    this.cat = this.route.snapshot.paramMap.get('category');
    this.portion = parseInt(this.route.snapshot.paramMap.get('max'), 10);
    this.maxPrice = parseInt(this.route.snapshot.paramMap.get('portion'), 10);

    const category = this.cat.split('$');
    category.pop();

    this.fs.getBattleFoods(category, this.maxPrice, this.portion).subscribe(foods => {
      this.foods = foods.filter(x => x !== undefined);
      this.numMatch = foods.length - 1;
      this.length = foods.length;
      this.firstFood = this.foods[this.first];
      this.secondFood = this.foods[this.second];
      console.log(this.foods);
      console.log(this.firstFood);
      console.log(this.secondFood);
    });
  }

  nextRound(winner: number) {
    if (winner === 1) {
      this.foods.splice(this.second, 1);
    } else {
      this.foods.splice(this.first, 1);
    }

    this.round += 1;
    this.first += 1;
    this.second += 1;
    this.numMatch -= 1;
    this.firstFood = this.foods[this.first];
    this.secondFood = this.foods[this.second];


    if (this.foods.length === Math.ceil(this.length / 2)) {
      this.first = 0;
      this.second = 1;
      this.length = this.length / 2;
    }

    // find final winner
    if (this.foods.length === 1) {
      this.final = true;
      const food = this.foods[0];
      this.firstFood = this.foods[0];
      food.victory.push( {user:  this.auth.userid, datetime: Date.now() } as Victory);
      this.fs.updateFood(food.id, food);
    }

  }

  ngOnInit() {
  }

}
