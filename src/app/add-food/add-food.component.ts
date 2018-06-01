import { Component, OnInit, Input, Inject } from '@angular/core';
import { FoodService } from '../food.service';
import { AuthService } from '../auth.service';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Food } from '../data';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


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
  c1 = false; c2 = false; c3 = false; c4 = false;
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

  addFood(): void {
    this.fs.addFood(
      {
        name: this.name,
        price: this.price,
        portion: this.portion,
        imgURL: this.img,
        category: {Kr: this.c1, Ch: this.c2, Jp: this.c3, Ws: this.c4},
        address: this.address,
        store: this.store,
        register: this.auth.userid,
        victory: []
      }
    );
    this.onNoClick();
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
}
