import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { LoginComponent } from './login/login.component';
import { MypageComponent } from './mypage/mypage.component';
import { BattleComponent } from './battle/battle.component';
import { FoodTableComponent } from './food-table/food-table.component';
import { AddFoodComponent } from './add-food/add-food.component';
import { MainComponent } from './main/main.component';
import { MyfoodTableComponent } from './myfood-table/myfood-table.component';
import { BattleSettingComponent } from './battle-setting/battle-setting.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: FoodDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'mypage', component: MypageComponent },
  { path: 'foods', component: FoodTableComponent},
  { path: 'addfood', component: AddFoodComponent},
  { path: 'main', component: MainComponent},
  { path: 'battle/:category/:max/:portion', component: BattleComponent},
  { path: 'myfood', component: MyfoodTableComponent},
  { path: 'battleset', component: BattleSettingComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
