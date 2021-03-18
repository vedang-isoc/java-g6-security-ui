import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserhomeComponent } from './userhome/userhome.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [UserhomeComponent],
  imports: [
    CommonModule,FormsModule
  ]
})
export class UsermoduleModule { }
