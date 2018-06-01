import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BattleSettingComponent } from '../battle-setting/battle-setting.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BattleSettingComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
