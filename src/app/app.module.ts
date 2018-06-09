import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';



import { AppRoutingModule } from './/app-routing.module';

import { MaterialModule } from './material/material.module';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import { MypageComponent } from './mypage/mypage.component';

import { FoodTableComponent } from './food-table/food-table.component';
import { AddFoodComponent } from './add-food/add-food.component';
import { FoodService } from './food.service';
import { MainComponent } from './main/main.component';
import { InheaderComponent } from './inheader/inheader.component';
import { BattleComponent } from './battle/battle.component';
import { NgDaumAddressModule } from 'ng2-daum-address';
import { MyfoodTableComponent } from './myfood-table/myfood-table.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { BattleSettingComponent } from './battle-setting/battle-setting.component';
import { FooterComponent } from './footer/footer.component';
import { HistroyComponent } from './histroy/histroy.component';

import {AdmCoreModule} from 'ngx-daum-map';

import { AgmCoreModule } from '@agm/core';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MypageComponent,
    FoodTableComponent,
    AddFoodComponent,
    MainComponent,
    InheaderComponent,
    BattleComponent,
    MyfoodTableComponent,
    FoodDetailComponent,
    BattleSettingComponent,
    FooterComponent,
    HistroyComponent,
    
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    NgDaumAddressModule,
    ReactiveFormsModule,
    AdmCoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAIsytfcAeYgvYKOHmiXouR5RK7-CRXeBI'
    })
  ],
  providers: [
    AuthService,
    FoodService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
