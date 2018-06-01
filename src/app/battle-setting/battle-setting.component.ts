import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-battle-setting',
  templateUrl: './battle-setting.component.html',
  styleUrls: ['./battle-setting.component.css']
})
export class BattleSettingComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

    foods = [
    {value: 1, viewValue: '1명'},
    {value: 2, viewValue: '2명'},
    {value: 3, viewValue: '3명'},
    {value: 4, viewValue: '4명'},
    {value: 5, viewValue: '5명'},
  ];

  constructor(private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<BattleSettingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
