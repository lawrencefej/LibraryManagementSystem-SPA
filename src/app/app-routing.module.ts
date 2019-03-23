import { RouterModule, Routes } from '@angular/router';

import { AdminPanelComponent } from './Admin/admin-panel/admin-panel.component';
import { AssetDetailComponent } from './libraryAssets/asset-detail/asset-detail.component';
import { AssetDetailResolver } from './_resolver/asset-detail.resolver';
import { AssetListComponent } from './libraryAssets/asset-list/asset-list.component';
import { AssetListResolver } from './_resolver/asset-list.resolver';
import { AuthGuard } from './_guards/auth.guard';
import { CheckoutDetailComponent } from './checkout/checkout-detail/checkout-detail.component';
import { CheckoutDetailResolver } from './_resolver/checkout-detail.resolver';
import { CheckoutListComponent } from './checkout/checkout-list/checkout-list.component';
import { CheckoutListResolver } from './_resolver/checkout-list.resolver';
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
import { AuthorListComponent } from './author/author-list/author-list.component';
import { AuthorAssetComponent } from './author/author-asset/author-asset.component';
import { AuthorListResolver } from './_resolver/author-list-resolver';
import { AuthorAssetResolver } from './_resolver/author-asset.resolver';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

const routes: Routes = [
  // { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      // { path: '', component: MemberListComponent },
      { path: 'currentitems', component: MemberHistoryComponent },
      { path: 'profileedit', component: MemberEditComponent },
      { path: 'catalog', component: AssetListComponent, resolve: { assets: AssetListResolver } },
      { path: 'catalog/:id', component: AssetDetailComponent, resolve: { asset: AssetDetailResolver } },
      { path: 'admin', component: AdminPanelComponent, data: { roles: ['Admin', 'Librarian'] } },
      { path: '', component: MemberListComponent, data: { roles: ['Admin', 'Librarian'] },
        resolve: { members: MemberListResolver } },
      { path: 'members', component: MemberListComponent, data: { roles: ['Admin', 'Librarian'] },
        resolve: { members: MemberListResolver } },
      { path: 'members/:id', component: MemberDetailComponent, data: { roles: ['Admin', 'Librarian'] },
        resolve: { member: MemberDetailResolver } },
      { path: 'checkouts', component: CheckoutListComponent, data: { roles: ['Admin', 'Librarian'] },
        resolve: { checkouts: CheckoutListResolver } },
      { path: 'checkouts/:id', component: CheckoutDetailComponent, data: { roles: ['Admin', 'Librarian'] },
        resolve: { checkout: CheckoutDetailResolver } },
      { path: 'authors', component: AuthorListComponent, data: { roles: ['Admin', 'Librarian'] },
        resolve: { authors: AuthorListResolver } },
      { path: 'authors/:id', component: AuthorAssetComponent, data: { roles: ['Admin', 'Librarian'] },
        resolve: { author: AuthorAssetResolver } },
      { path: 'dashboard', component: DashboardComponent, data: { roles: ['Admin', 'Librarian'] }}
    ]
  },
  { path: '**', redirectTo: 'members', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
