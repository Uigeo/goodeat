import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class HeroService {
  heroDoc: AngularFirestoreDocument<Hero>;
  heroCollectionRef: AngularFirestoreCollection<Hero>;
  heroes: Observable<Hero[]>;

  constructor(
    private messageService: MessageService,
    public db: AngularFirestore,
  ) {
    this.heroCollectionRef = this.db.collection<Hero>('heroes');
  }
  defaultURL = 'https://www.imboldn.com/wp-content/uploads/2018/04/Avengers-InfinityWar-Thanos-01.jpg';

  getHeroes(): Observable<Hero[]> {
    this.heroes = this.heroCollectionRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Hero;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });
    return this.heroes;
  }

  getHero(id: string): Observable<Hero> {
    this.messageService.add(`HeroService: hero id=${id}`);
    this.heroDoc = this.db.doc<Hero>('heroes/' + id);
    return this.heroDoc.valueChanges();
  }

  addHero(name: string, sub: string, con: string): void {
    this.messageService.add(`HeroService: hero id=${HEROES.length + 1}`);
    this.heroCollectionRef.add({name: name, subtitle: sub, content: con, URL: this.defaultURL});
  }

  deleteHero(id: string) {
    this.heroDoc = this.db.doc<Hero>('heroes/' + id);
    this.heroDoc.delete();
  }

  updateHero(hero: Hero) {
    this.heroCollectionRef.doc(hero.id).update({
      id : hero.id, name : hero.name, subtitle : hero.subtitle, content : hero.content, URL : hero.URL
    });
  }
}
