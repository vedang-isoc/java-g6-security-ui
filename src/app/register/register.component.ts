import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private uservice:UserService) { }

  ngOnInit(): void {
    this.registerForm=new FormGroup({
      username :new FormControl(),
      email:new FormControl(),
      password: new FormControl()

    })
  }
  registerForm: FormGroup
  registeruser(){
    this.uservice.addUser(this.registerForm.value).subscribe((x)=>{
      
    })

  }

}
