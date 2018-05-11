import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  id: string;
  task: AngularFireUploadTask;
  random_file_name: string;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private afStorage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(this.id).subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.updateHero(this.hero);
    this.location.back();
  }

  updateHero(hero: Hero ): void {
    hero.id = this.id;
    this.heroService.updateHero(hero);
  }

  upload(event) {
    this.random_file_name = Math.random().toString(36).substring(2);
    this.task = this.afStorage.ref('images/' + this.random_file_name).put(event.target.files[0]);
    const downloadURL = this.task.downloadURL();
    downloadURL.subscribe(url => this.hero.URL = url);
  }
}
