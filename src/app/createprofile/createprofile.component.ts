import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-createprofile',
  templateUrl: './createprofile.component.html',
  styleUrls: ['./createprofile.component.scss']
})
export class CreateprofileComponent implements OnInit {

  constructor(private uservice:UserService) { }
 

  ngOnInit(): void {

    this.profileForm=new FormGroup({
      fullName  : new FormControl(""),
      birthdate : new FormControl(""),
      gender    : new FormControl(""),
      userImage :new FormControl(null)



    })
  }
  title = 'ImageUploaderFrontEnd';

  public selectedFile;
  public event1;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;

  public  onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
    this.selectedFile.name=this.selectedFile.name.replace(/^.*\\/, "../../../assets/")
    

    // Below part is used to display the selected image
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
     this.imgURL= this.imgURL.replace(/^.*\\/, "../../../assets/")
     
  };

 }
  profileForm: FormGroup
  createProfile(){
    const uploadData = new FormData();
    
    
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
     this.profileForm.value.userImage= this.profileForm.value.userImage.replace(/^.*\\/, "")
    this.uservice.createProfile(this.profileForm.value,sessionStorage.getItem("userId"),uploadData).subscribe((x)=>{
      res => {console.log(res);
        this.receivedImageData = res;
        this.base64Data = this.receivedImageData.pic;
        this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; }
      console.log("profile created")
    })

  }
  



}
