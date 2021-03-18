import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { ErrorComponent } from './error/error.component';
import { UsermoduleModule } from './usermodule/usermodule.module';
import { AdminModule } from './admin/admin.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthinterceptorService } from './authinterceptor.service';
import { RegisterComponent } from './register/register.component';
import { CreateprofileComponent } from './createprofile/createprofile.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ErrorComponent,
    LoginComponent,
    RegisterComponent,
    CreateprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsermoduleModule,
    AdminModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [

    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthinterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
