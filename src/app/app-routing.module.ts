import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AssetListComponent } from './libraryAssets/asset-list/asset-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { AssetDetailComponent } from './libraryAssets/asset-detail/asset-detail.component';
import { MemberHistoryComponent } from './members/member-history/member-history.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {path: '', component: AssetListComponent},
  {path: 'catalog', component: AssetListComponent},
  {path: 'catalog/:id', component: AssetDetailComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'currentitems', component: MemberHistoryComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profileedit', component: MemberEditComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
