import { RouterModule, Routes } from '@angular/router';

import { AdminPanelComponent } from './Admin/admin-panel/admin-panel.component';
import { AssetDetailComponent } from './libraryAssets/asset-detail/asset-detail.component';
import { AssetDetailResolver } from './_resolver/asset-detail.resolver';
import { AssetListComponent } from './libraryAssets/asset-list/asset-list.component';
import { AssetListResolver } from './_resolver/asset-list.resolver';
import { AuthGuard } from './_guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolver/member-detail.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberHistoryComponent } from './members/member-history/member-history.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: AssetListComponent, resolve: { assets: AssetListResolver } },
  { path: 'catalog/:id', component: AssetDetailComponent, resolve: { asset: AssetDetailResolver } },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'currentitems', component: MemberHistoryComponent },
      { path: 'profileedit', component: MemberEditComponent },
      { path: 'admin', component: AdminPanelComponent, data: { roles: ['Admin', 'Librarian'] } },
      { path: 'members', component: MemberListComponent, data: { roles: ['Admin', 'Librarian'] },
        resolve: { members: MemberListResolver } },
      { path: 'members/:id', component: MemberDetailComponent, data: { roles: ['Admin', 'Librarian'] },
        resolve: { member: MemberDetailResolver } },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
