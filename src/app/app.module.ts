import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroService } from './hero.service';
<<<<<<< HEAD

=======
>>>>>>> 767ee4368a5824123eb8fe1e633f0ac1672643d0
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { HeroTableComponent } from './hero-table/hero-table.component';
import { FoodTableComponent } from './food-table/food-table.component';
import { AddFoodComponent } from './add-food/add-food.component';
import { FoodService } from './food.service';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { InheaderComponent } from './inheader/inheader.component';
import { BattleComponent } from './battle/battle.component';

import { NgDaumAddressModule } from 'ng2-daum-address';



@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
<<<<<<< HEAD
    
=======
>>>>>>> 767ee4368a5824123eb8fe1e633f0ac1672643d0
    DashboardComponent,
    LoginComponent,
    MypageComponent,
    HeroTableComponent,
    FoodTableComponent,
    AddFoodComponent,
    MainComponent,
    HeaderComponent,
    InheaderComponent,
    BattleComponent,
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
  ],
  providers: [
    AuthService,
    HeroService,
    FoodService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
