import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController , Events} from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {

  public profiles : Array<any> = [];
  private baseURI : string  = this.global.mysite; 

  constructor(private alertCtrl : AlertController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public http     : HttpClient,
              public global: GlobalProvider,
              public storage  : Storage,
              public events: Events ) {
  }


  ionViewWillEnter() : void {
    this.load(); 

    if(this.navParams.get("record"))
    {
      this.selectEntry(this.navParams.get("record"));
    }

    console.log('ionViewDidLoad ProfilePage');
  }

  user = "";
  name = "";
  email = "";
  telnum = "";
  ic ="";
  createSuccess = false;


  selectEntry(profile : any) : void
    {
      this.name = profile.nama;
      this.telnum=profile.no_telefon;
    }

    submit(){
      this.update(this.name, this.telnum, this.user);
    }

    update(name : string, telnum : string, user : string) : void
   {
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= {"name" : name, "telnum" : telnum, "user" : user },
          url       : any   = this.baseURI + "H_editprofile.php";

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((record : any) =>
      {
         // If the request was successful notify the user
         this.events.publish('user:created', name);
         this.createSuccess = true;
        this.showPopup("Success", "Profile updated.");
        this.navCtrl.setRoot(ProfilePage);
      },
      error => {
        this.showPopup("Update Fail", "Please try again");
      });
   }

  load() : void
  {
    

     this.storage.get('user').then((user) => {
      this.user = user;
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
  navtohome(){
    this.navCtrl.setRoot(HomePage);
  }
}
