import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-inheader',
  templateUrl: './inheader.component.html',
  styleUrls: ['./inheader.component.css']
})
export class InheaderComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
