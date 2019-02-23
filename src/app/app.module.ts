import { BsDatepickerModule, BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminPanelComponent } from './Admin/admin-panel/admin-panel.component';
import { AlertifyService } from './_services/alertify.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AssetCardComponent } from './libraryAssets/asset-card/asset-card.component';
import { AssetDetailComponent } from './libraryAssets/asset-detail/asset-detail.component';
import { AssetDetailResolver } from './_resolver/asset-detail.resolver';
import { AssetListComponent } from './libraryAssets/asset-list/asset-list.component';
import { AssetListResolver } from './_resolver/asset-list.resolver';
import { AssetService } from './_services/asset.service';
import { AuthGuard } from './_guards/auth.guard';
import { AuthService } from './_services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { CheckoutDetailComponent } from './checkout/checkout-detail/checkout-detail.component';
import { CheckoutDetailResolver } from './_resolver/checkout-detail.resolver';
import { CheckoutListComponent } from './checkout/checkout-list/checkout-list.component';
import { CheckoutListResolver } from './_resolver/checkout-list.resolver';
import { CurrentItemsComponent } from './currentItems/currentItems.component';
import { ErrorinterceptorProvider } from './_services/error.interceptor';
import { FooterComponent } from './components/footer/footer.component';
import { HasRoleDirective } from './_directives/hasRole.directive';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './login/login.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberCheckoutsComponent } from './members/member-checkouts/member-checkouts.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolver/member-detail.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberHistoryComponent } from './members/member-history/member-history.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { NavComponent } from './nav/nav.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserService } from './_services/user.service';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      RegisterComponent,
      LoginComponent,
      HomeComponent,
      MemberHistoryComponent,
      AssetListComponent,
      AssetCardComponent,
      CurrentItemsComponent,
      AssetDetailComponent,
      MemberEditComponent,
      MemberCardComponent,
      MemberCheckoutsComponent,
      SidebarComponent,
      FooterComponent,
      AdminPanelComponent,
      HasRoleDirective,
      MemberListComponent,
      MemberDetailComponent,
      CheckoutListComponent,
      CheckoutDetailComponent

   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      AppRoutingModule,
      BsDatepickerModule.forRoot(),
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/auth/']
         }
      })
   ],
   providers: [
      AuthService,
      ErrorinterceptorProvider,
      AlertifyService,
      AssetService,
      AuthGuard,
      UserService,
      AssetDetailResolver,
      AssetListResolver,
      MemberListResolver,
      MemberDetailResolver,
      CheckoutListResolver,
      CheckoutDetailResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
