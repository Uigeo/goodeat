import { Component, AfterViewInit } from '@angular/core';
import { FoodService } from '../food.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Food, Victory } from '../data';
import { AuthService } from '../auth.service';
import * as anime from 'animejs';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements AfterViewInit {
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
  finalFood: any;

  anime1: any;
  anime2: any;
  anime3: any;
  anime4: any;

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
      this.length = this.foods.length;
      this.firstFood = this.foods[this.first];
      this.secondFood = this.foods[this.second];
      console.log(this.foods);
    });
  }

  nextRound(winner: number) {
    if (winner === 1) {
      this.foods.splice(this.second, 1);
    } else {
      this.foods.splice(this.first, 1);
    }

    this.backAni();

    this.round += 1;
    this.first += 1;
    this.second += 1;
    this.numMatch -= 1;

    if (this.foods.length === Math.ceil(this.length / 2) + 1 ) {
      this.first = 0;
      this.second = 1;
      this.length = this.length / 2;
    }

    this.firstFood = this.foods[this.first];
    this.secondFood = this.foods[this.second];

    // find final winner
    if (this.foods.length === 1) {
      this.final = true;
      const food = this.foods[0];
      console.log(food, 'Victory');

      setTimeout(function() {
        this.anime1 = anime({
          targets: '#finalAni',
          translateY: 800,
          direction: 'reverse'
        });
        this.anime1.play();
      }, 1000);

      this.finalFood = food;
      food.victory.push( {user:  this.auth.userid , datetime: Date.now() } as Victory);
      if (this.auth.user) {
        this.fs.updateFood(food.id, food);
        this.auth.addHistory(food.id, food, Date.now());
      }
    } else {
      setTimeout(function() {
        this.anime1 = anime({
          targets: '#firstAni',
          translateX: 400,
          duration: 2000
        });
        this.anime2 = anime({
          targets : '#secondAni',
          translateX : -400,
          duration: 2000
        });
        this.anime1.play();
        this.anime2.play();
      }, 1000);
    }



  }

  setMyStyles1() {
    const styles = {
      'background': `url(\'${this.firstFood.imgURL}\') center/cover no-repeat`
    };
    return styles;
  }

  setMyStyles2() {
    const styles = {
      'background': `url(\'${this.secondFood.imgURL}\') center/cover no-repeat`
    };
    return styles;
  }

  setMyStylesFinal() {
    const styles = {
      'background': `url(\'${this.finalFood.imgURL}\') center/cover no-repeat`,

    };
    return styles;
  }

  ngAfterViewInit() {
    console.log('play');
    this.startAni();

  }

  startAni() {
    this.anime1 = anime({
      targets: '#firstAni',
      translateX: 400,
      duration: 2000
    });

    this.anime2 = anime({
      targets : '#secondAni',
      translateX : -400,
      duration: 2000
    });

    this.anime1.play();
    this.anime2.play();
  }

  backAni() {

    this.anime1 = anime({
      targets: '#firstAni',
      translateX: -400,
      duration: 2000
    });

    this.anime2 = anime({
      targets : '#secondAni',
      translateX : 400,
      duration: 2000
    });

    this.anime1.play();
    this.anime2.play();

  }


}
