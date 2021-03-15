import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminhomeComponent } from './admin/adminhome/adminhome.component';
import { AuthGuard } from './auth.guard';
import { ErrorComponent } from './error/error.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserhomeComponent } from './usermodule/userhome/userhome.component';

const routes: Routes = [

  {path:"",component:LandingComponent},
  {path:"user",component:UserhomeComponent,
  data:{role:"ROLE_USER"}},
  {path:"admin",component:AdminhomeComponent,data:{role:"ROLE_ADMIN"}},
 
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
