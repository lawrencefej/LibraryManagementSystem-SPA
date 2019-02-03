import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AssetListComponent } from './libraryAssets/asset-list/asset-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { HistoryComponent } from './History/History.component';
import { CurrentItemsComponent } from './currentItems/currentItems.component';
import { AssetDetailComponent } from './libraryAssets/asset-detail/asset-detail.component';

const routes: Routes = [
  {path: '', component: AssetListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: ':id', component: AssetDetailComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'currentitems', component: CurrentItemsComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
