import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLocked
  wpassword
  wusername
  failedattempts
  resendotp

  constructor(
    private as:AuthenticateService,private router:Router
  ) { }

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      username :new FormControl("user"),
      password: new FormControl("user")

    })
  }
  loginForm: FormGroup
  loginuser(){

    this.as.isLocked(this.loginForm.value.username).subscribe((data)=>{

      if(data===true){
        this.isLocked=true
       this.router.navigate(["/login"])

      }
      else{
        this
        .as
        .authenticate(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe(
          (data:any) => {
            console.log(data)
            this.as.clearfa(sessionStorage.getItem("userId")).subscribe((x)=>{

            })
             if(data.role==="user"){
               this.router.navigate(["/user"])
             }
            // if(data.roles[0]==="ROLE_ADMIN"){
            //   this.router.navigate(["/admin"])
            // }
          },
          (err)=>{
            this.as.incrementfailedattempt(this.loginForm.value.username).subscribe((data)=>{
              console.log("incremented");
              if(data>-1){
                this.wpassword=true
                this.wusername=false
                this.isLocked=false
                this.failedattempts=data
                if(data===3){
                  this.isLocked=true
                }
              }
              if(data===-1){
                this.wusername=true
                this.wpassword=false
                this.isLocked=false
              }
              
            })
            console.log("incremented")
          }
        )
        
      }

    })
  

  }
  timeLeft: number = 60;
  interval;

startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft===0){
        this.resendotp=true
      }
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    },1000)
  }
  otpresend(){
    if(this.resendotp){
      alert("resent")
    }else{
      alert("not yet")
    }

  }


 
}
