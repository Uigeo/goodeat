import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  ismain = window.location.href.search('main') !== -1;
  constructor() { }
  ngOnInit() {
  }

}
