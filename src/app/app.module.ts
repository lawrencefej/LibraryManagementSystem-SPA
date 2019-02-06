import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BsDropdownModule, BsDatepickerModule, TabsModule } from 'ngx-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './_services/auth.service';
import { ErrorinterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { MustMatchDirective } from './_directives/must-match.directive';
import { AssetService } from './_services/asset.service';
import { AssetListComponent } from './libraryAssets/asset-list/asset-list.component';
import { AssetCardComponent } from './libraryAssets/asset-card/asset-card.component';
import { AuthGuard } from './_guards/auth.guard';
import { CurrentItemsComponent } from './currentItems/currentItems.component';
import { AssetDetailComponent } from './libraryAssets/asset-detail/asset-detail.component';
import { MemberHistoryComponent } from './members/member-history/member-history.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { TestComponent } from './test/test.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberCheckoutsComponent } from './members/member-checkouts/member-checkouts.component';

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
      MustMatchDirective,
      AssetListComponent,
      AssetCardComponent,
      CurrentItemsComponent,
      AssetDetailComponent,
      MemberEditComponent,
      TestComponent,
      MemberCardComponent,
      MemberCheckoutsComponent
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
      AuthGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
