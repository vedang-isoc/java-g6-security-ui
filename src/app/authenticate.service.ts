import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http:HttpClient) { }
  loginStatus=new BehaviorSubject<boolean>(false);
  username=new BehaviorSubject<String>(sessionStorage.getItem("username"))
  userrole=new BehaviorSubject<String>(sessionStorage.getItem("userrole"))
  userId=new BehaviorSubject<String>(sessionStorage.getItem("userId"))

  incrementfailedattempt(username){
    console.log(environment.baseUserUrl+"user/incrementfa/"+username)
    return this.http.put(environment.baseUserUrl+"user/incrementfa/"+username,"")

  }
  clearfa(userid){
    return this.http.put(environment.baseUserUrl+"user/clearfa/"+userid,"")
  }

  isLocked(username){
    return this.http.get(environment.baseUserUrl+"user/isLocked/"+username)
  }

  authenticate(username, password) {
    return this.http.post(environment.baseUserUrl + 'auth/authenticate',
      { username, password }
    ).pipe(
      map((userdata:any)=>{
        sessionStorage.setItem("username",userdata.username)
        sessionStorage.setItem("userrole",userdata.role)
        sessionStorage.setItem("userId",userdata.userId)
        sessionStorage.setItem("token","Bearer"+userdata.token)
        this.loginStatus.next(true)
        this.username.next(sessionStorage.getItem("username"))
        this.userrole.next(sessionStorage.getItem("userrole"))
        this.userId.next(sessionStorage.getItem("userId"))

        return userdata
      })
    )
  }
  isLoggedIn(){
    let user=sessionStorage.getItem("username")
    return !(user===null)

  }
  logout(){
    sessionStorage.clear()
    this.loginStatus.next(false)
    this.userrole.next(null)
    this.username.next(null)

  }
}
