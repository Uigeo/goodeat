import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(0, heroes.length));
  }

  addNewHero(name: string , subtitle: string, contnet: string): void {
    this.heroService.addHero(name, subtitle, contnet);
    this.getHeroes();
    this.openSnackBar('ADD');
  }

  openSnackBar(action: string) {

  }
}

