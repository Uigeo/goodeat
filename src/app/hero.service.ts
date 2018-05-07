import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';

@Injectable()
export class HeroService {

  constructor(private messageService: MessageService ) {}
  defaultURL = 'https://www.imboldn.com/wp-content/uploads/2018/04/Avengers-InfinityWar-Thanos-01.jpg';
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  addHero(n: string, sub: string, con: string): void {
    this.messageService.add(`HeroService: hero id=${HEROES.length + 1}`);
    HEROES.push({ id: HEROES.length + 1, name: n, subtitle: sub, content: con, imgURL: this.defaultURL });
  }
}
