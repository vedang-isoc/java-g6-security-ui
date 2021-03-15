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
              
            })
            console.log("incremented")
          }
        )
        
      }

    })
  

  }

}
