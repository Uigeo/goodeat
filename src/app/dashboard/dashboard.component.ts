import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MatSnackBar} from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Observable<Hero[]>;

  constructor(private heroService: HeroService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }

  addNewHero(name: string , subtitle: string, content: string): void {
    this.heroService.addHero(name, subtitle, content);
    this.getHeroes();
    this.snackBar.open('Add Hero', 'Undo', {
      duration: 1000
    });
  }

  deleteHero(id: string) {
    this.heroService.deleteHero(id);
  }
}

