import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{environment} from  '../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
    getUsers():Observable<any>{
     return  this.http.get(environment.baseUserUrl)

    }
    delUser(id):Observable<any>{
      return  this.http.delete(environment.baseUserUrl+"/"+id)
 
     }
     addUser(user: any){
       return this.http.post(environment.baseUserUrl+"user/adduser",user)
     }
     isActivated(userid){
       return this.http.get(environment.baseUserUrl+"user/isActivated/"+userid)
     }
     createProfile(profile:any,userid,data){
       return this.http.post(environment.baseUserUrl+"user/profile/"+userid,profile,data)

     }
     isProfileCreated(userid){
       return this.http.get(environment.baseUserUrl+"user/isProfileCreated/"+userid)
     }
}
