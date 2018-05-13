import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MatSnackBar} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from 'angularfire2/storage';
import { AuthService } from '../auth.service';

const defaultURL = 'https://material.angular.io/assets/img/examples/shiba2.jpg';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  heroes: Observable<Hero[]>;
  task: AngularFireUploadTask;
  random_file_name: string;
  @Input() newURL: string;

  constructor(private heroService: HeroService,
              public snackBar: MatSnackBar,
              private afStorage: AngularFireStorage,
              public auth: AuthService
              ) { }

  ngOnInit() {
    this.getHeroes();
    this.newURL = defaultURL;
  }

  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }

  addNewHero(name: string , subtitle: string, content: string): void {
    this.heroService.addHero(name, subtitle, content, this.newURL);
    this.getHeroes();
    this.snackBar.open('Add Hero', 'Undo', {
      duration: 1000
    });
    this.newURL = defaultURL;
  }

  deleteHero(id: string) {
    this.heroService.deleteHero(id);
    this.snackBar.open('Delete Hero', 'Undo', {
      duration: 1000
    });
  }

  upload(event) {
    this.random_file_name = Math.random().toString(36).substring(2);
    this.task = this.afStorage.ref('images/' + this.random_file_name).put(event.target.files[0]);
    const downloadURL = this.task.downloadURL();
    downloadURL.subscribe(url => this.newURL = url);
  }
}

