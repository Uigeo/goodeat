import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MatSnackBar} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from 'angularfire2/storage';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Observable<Hero[]>;
  task: AngularFireUploadTask;
  ref: AngularFireStorageReference;

  constructor(private heroService: HeroService,
              public snackBar: MatSnackBar,
              private afStrorage: AngularFireStorage,
              public auth: AuthService
              ) { }

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
    this.snackBar.open('Delete Hero', 'Undo', {
      duration: 1000
    });
  }

  upload(event) {
    const randomId = Math.random().toString(36).substring(2);
    this.afStrorage.ref(randomId);
    this.task = this.ref.put(event.target.files[0]);
  }
}

