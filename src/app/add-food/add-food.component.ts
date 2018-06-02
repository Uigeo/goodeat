import { Component, OnInit, Input, Inject } from '@angular/core';
import { FoodService } from '../food.service';
import { AuthService } from '../auth.service';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Food } from '../data';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { forEach } from '@firebase/util';


@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {

  task: AngularFireUploadTask;
  random_file_name: string;
  name: string;
  price: number;
  store: string;
  img: string;
  portion: number;
  address: any;
  daumAddressOptions =  {
    class: ['btn', 'btn-primary']
  };

  constructor(
    public fs: FoodService,
    public auth: AuthService,
    private afStorage: AngularFireStorage,
    public dialogRef: MatDialogRef<AddFoodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  imgUpload(event): void {
    this.random_file_name = Math.random().toString(36).substring(2);
    this.task = this.afStorage.ref('image/' + this.random_file_name).put(event.target.files[0]);
    const downloadURL = this.task.downloadURL();
    downloadURL.subscribe(url => {
      console.log(url);
      this.img = url;
    });
  }

  setDaumAddressApi(data) {
    this.address = data;
    console.log(data);
  }

  onNgSubmit(userForm: NgForm) {
    const categoryList = ['한식', '중식', '일식', '양식', '분식', '매운', '디저트', '혼밥'];
    console.log(userForm.value);
    const c = Object.values(userForm.value.category);
    const category = [];
    for (let index = 0; index < c.length; index++) {
       if (c[index]) {
         category.push(categoryList[index]);
       }
    }
    console.log(category);

    this.fs.addFood(
      {
        name: userForm.value.name,
        price: userForm.value.price,
        portion: userForm.value.portion,
        imgURL: this.img,
        category: category,
        address: this.address,
        store: userForm.value.store,
        register: this.auth.userid,
        victory: []
      }
    );
    this.onNoClick();
  }
}
