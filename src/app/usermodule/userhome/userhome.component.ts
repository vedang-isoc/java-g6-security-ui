import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from 'src/app/authenticate.service';
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
  delete
  changePWd
  notmatch
  users:Observable<any>
  constructor(private uservice:UserService,private as:AuthenticateService,private route:Router) {

 this.username=sessionStorage.getItem("username")
 this.uservice.isActivated(sessionStorage.getItem("userId")).subscribe((x)=>{
   this.activated=x
 })
 this.uservice.isProfileCreated(sessionStorage.getItem("userId")).subscribe((x)=>{
this.isProfileCreated=x
console.log(this.isProfileCreated);

 })
   }
   deleteA(){
    this.delete=true
   }
   deleteAcc(deleteForm){
     this.uservice.checkPassword(deleteForm.value.pwd,sessionStorage.getItem("userId")).subscribe((x)=>{
       console.log(x);
       
     })

   }
   password(){
    this.changePWd=true
   }
   changePwd(changePwdForm){
     if(changePwdForm.value.pwd===changePwdForm.value.npwd && changePwdForm.value.pwd!=""){
      this.uservice.changePwd(changePwdForm.value.pwd,sessionStorage.getItem("userId")).subscribe((x)=>{
            this.as.logout()
            this.route.navigate(["/login"])
      })
     }
     else{
       this.notmatch=true
     }
     

   }
  
  

  ngOnInit(
    
    


    
  ): void {
  }

}
