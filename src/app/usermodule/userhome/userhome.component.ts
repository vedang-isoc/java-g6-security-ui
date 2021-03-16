import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.scss']
})
export class UserhomeComponent implements OnInit {

  username
  activated
  isProfileCreated
  users:Observable<any>
  constructor(private uservice:UserService) {

 this.username=sessionStorage.getItem("username")
 this.uservice.isActivated(sessionStorage.getItem("userId")).subscribe((x)=>{
   this.activated=x
 })
 this.uservice.isProfileCreated(sessionStorage.getItem("userId")).subscribe((x)=>{
this.isProfileCreated=x
console.log(this.isProfileCreated);

 })
   }
  

  ngOnInit(
    
    


    
  ): void {
  }

}
