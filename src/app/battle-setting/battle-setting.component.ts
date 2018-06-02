import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddFoodComponent } from '../add-food/add-food.component';

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
      c1: [false],
      c2: [false],
      c3: [false],
      c4: [false],
      c5: [false],
      c6: [false],
      c7: [false],
      c8: [false],
      c9: [false],
    });
    this.secondFormGroup = this._formBuilder.group({
      maxPrice: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      person: ['', Validators.required]
    });
  }

  startBattle() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value.maxPrice);
    console.log(this.thirdFormGroup.value.person);
    let str_category = '';
    const category = Object.values(this.firstFormGroup.value);
    for (let index = 0; index < category.length; index++) {
        if (category[index]) {
          str_category += AddFoodComponent.categoryList[index];
          str_category += '$';
        }
    }
    window.location.href = '/battle/' + str_category + '/'
    +  this.secondFormGroup.value.maxPrice + '/' + this.thirdFormGroup.value.person;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
