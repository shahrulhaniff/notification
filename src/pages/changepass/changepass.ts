import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { ProfilePage } from '../profile/profile';


@IonicPage()
@Component({
  selector: 'page-changepass',
  templateUrl: 'changepass.html',
})
export class ChangepassPage {

  public profiles : Array<any> = [];
  private baseURI : string  = this.global.mysite; 

  constructor(private alertCtrl : AlertController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public http     : HttpClient,
              public global: GlobalProvider,
              public storage  : Storage) {
  }


  ionViewWillEnter() : void {
    this.load(); 

    if(this.navParams.get("record"))
    {
      this.selectEntry(this.navParams.get("record"));
    }

  }

  user = "";
  name = "";
  email = "";
  telnum = "";
  ic ="";
  createSuccess = false;
  cpass = "";
  currentpass = "";
  newpass = "";
  ppass ="";

  public cpassarray : Array<any> = [];
  public icarray : Array<any> = [];


  selectEntry(profile : any) : void
    {
      this.name = profile.nama;
      this.email = profile.email;
      this.telnum=profile.no_telefon;
    }
    

    submit(){
      if(this.newpass=="" || this.currentpass=="" || this.ppass==""){
        this.showPopup("Attention", "Please filled up the form");
      } else {
      if(this.newpass == this.ppass){
        if(this.currentpass == this.cpass){
          this.changepass(this.newpass, this.user);
        } else {
          this.showPopup("Attention", "Current Password not Match");
        }
      } else {
        this.showPopup("Attention", "Please check your new password");
      }
    }}

    changepass(pwd : any, user : string) : void
   {
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= {"pwd" : pwd, "user" : user},
          url       : any   = this.baseURI + "J_changepass.php";

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((record : any) =>
      {
         // If the request was successful notify the user
         this.createSuccess = true;
        this.showPopup("Success", "Password Changed!");
        this.navCtrl.setRoot(ProfilePage);
      },
      error => {
        this.showPopup("Error", "Please Try Again.");
      });
   }

  load() : void
  {
     this.storage.get('user').then((user) => {
      this.user = user;

      let    urlz : any = this.baseURI+'I_retrieve_pass.php?id='+user;
            
     this.http.get(urlz).subscribe((data : any) =>
     {
        console.dir(data);
        this.profiles = data;

        this.user = user;

        this.cpassarray = this.profiles.map(profiles => profiles.pwd);
        this.icarray = this.profiles.map(profiles => profiles.ic);

        for(let i = 0; i < this.profiles.length; i++){
          if(user == this.icarray[i]){
            this.cpass = this.cpassarray[i];
            break;
          }
      }
     },
     (error : any) =>
     {
        console.dir(error);
     });
     //--------------------------------------------------
   }); //close storage
  }


  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              //this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }


}
