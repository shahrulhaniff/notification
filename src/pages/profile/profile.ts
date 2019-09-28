import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { EditprofilePage } from '../editprofile/editprofile';
import { ChangepassPage } from '../changepass/changepass';
import { HomePage } from '../home/home';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public profiles : Array<any> = [];
  private baseURI : string  = this.global.mysite; 

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http     : HttpClient,
              public global: GlobalProvider,
              private push: Push,
              public storage  : Storage) {
  }

  ionViewDidLoad() {
    this.load(); 
    //this.cekpermission();
    console.log('ionViewDidLoad ProfilePage');
  }


  load() : void
  {
     this.storage.get('user').then((user) => {

     let    url : any = this.baseURI+'G_RetrieveProfile.php?id='+user;
            
     this.http.get(url).subscribe((data : any) =>
     {
        console.dir(data);
        this.profiles = data;
     },
     (error : any) =>
     {
        console.dir(error);
     });
     //--------------------------------------------------
   }); //close storage
  }

  editProfile(params : any){
    this.navCtrl.push(EditprofilePage, params);
  }

  changePass(params : any){
    this.navCtrl.push(ChangepassPage, params);
  }
  navtohome(){
    this.navCtrl.setRoot(HomePage);
  }

  /*
  //start push coding
  // to check if we have permission
  cekpermission(){
  this.push.hasPermission()
  .then((res: any) => {

    if (res.isEnabled) {
      console.log('We have permission to send push notifications');
    } else {
      console.log('We do not have permission to send push notifications');
    }

  });
}

wakchanel(){
// Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
this.push.createChannel({
 id: "testchannel1",
 description: "My first test channel",
 // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
 importance: 3
}).then(() => console.log('Channel created')); }

delchanel(){
// Delete a channel (Android O and above)
this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));
}

lischanel(){
// Return a list of currently configured channels
this.push.listChannels().then((channels) => console.log('List of channels', channels))
} 

initpush(){
// to initialize push notifications
const options: PushOptions = {
   android: {},
   ios: {
       alert: 'true',
       badge: true,
       sound: 'false'
   },
   windows: {},
   browser: {
       pushServiceURL: 'http://push.api.phonegap.com/v1/push'
   }
};

const pushObject: PushObject = this.push.init(options);
pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
}
//end push coding */

}
