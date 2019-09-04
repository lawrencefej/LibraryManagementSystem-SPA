import { RouterModule, Routes } from '@angular/router';

import { AdminPanelComponent } from './Admin/admin-panel/admin-panel.component';
import { AdvancedSearchComponent } from './members/advanced-search/advanced-search.component';
import { AssetDetailComponent } from './libraryAssets/asset-detail/asset-detail.component';
import { AssetDetailResolver } from './_resolver/asset-detail.resolver';
import { AssetListComponent } from './libraryAssets/asset-list/asset-list.component';
import { AssetListResolver } from './_resolver/asset-list.resolver';
import { AuthGuard } from './_guards/auth.guard';
import { AuthorAssetComponent } from './author/author-asset/author-asset.component';
import { AuthorAssetResolver } from './_resolver/author-asset.resolver';
import { AuthorListComponent } from './author/author-list/author-list.component';
import { AuthorListResolver } from './_resolver/author-list-resolver';
import { CheckoutDetailResolver } from './_resolver/checkout-detail.resolver';
import { CheckoutListComponent } from './checkout/checkout-list/checkout-list.component';
import { CheckoutListResolver } from './_resolver/checkout-list.resolver';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './password/forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolver/member-detail.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberHistoryComponent } from './members/member-history/member-history.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { MemberSearchComponent } from './members/member-search/member-search.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './password/reset-password/reset-password.component';

const routes: Routes = [
  // { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'resetpassword/:id/:code', component: ResetPasswordComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'memberSearch',  pathMatch: 'full' },
      { path: 'currentitems', component: MemberHistoryComponent },
      { path: 'profileedit', component: MemberEditComponent },
      { path: 'memberSearch', component: MemberSearchComponent},
      { path: 'advanced-search', component: AdvancedSearchComponent},
      { path: 'catalog', component: AssetListComponent, resolve: { assets: AssetListResolver } },
      { path: 'catalog/:id', component: AssetDetailComponent, resolve: { asset: AssetDetailResolver } },
      { path: 'admin', component: AdminPanelComponent, data: { allowedRoles: ['Admin'] } },
      { path: 'members', component: MemberListComponent, data: { allowedRoles: ['Admin', 'Librarian'] },
        resolve: { members: MemberListResolver } },
      { path: 'members/:id', component: MemberDetailComponent, data: { allowedRoles: ['Admin', 'Librarian'] },
        resolve: { member: MemberDetailResolver } },
      { path: 'checkouts', component: CheckoutListComponent, data: { allowedRoles: ['Admin', 'Librarian'] },
        resolve: { checkouts: CheckoutListResolver } },
      { path: 'authors', component: AuthorListComponent, data: { allowedRoles: ['Admin', 'Librarian'] },
        resolve: { authors: AuthorListResolver } },
      { path: 'authors/:id', component: AuthorAssetComponent, data: { allowedRoles: ['Admin', 'Librarian'] },
        resolve: { author: AuthorAssetResolver } },
      { path: 'dashboard', component: DashboardComponent, data: { allowedRoles: ['Admin'] }}
    ]
  },
  { path: '**', redirectTo: 'members', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
