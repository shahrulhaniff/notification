import { Component, ɵConsole } from '@angular/core';
import { IonicPage, NavController, PopoverController,NavParams, Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";
import 'rxjs/add/operator/map';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  today = Date.now();
  public items : Array<any> = [];
  private baseURI : string  = this.global.mysite;
  public showherba;

  constructor(public navCtrl: NavController,
              public popoverCtrl: PopoverController,
              public navParams: NavParams,
              public global: GlobalProvider,
              public http     : HttpClient,
              public storage  : Storage,
              public events: Events ) {

                this.storage.get('nama').then((nama) => {
                this.events.publish('user:created', nama);
              });
  }
  
  ionViewWillEnter(){ 
    console.log("Willenter home");
  }

  

  toProfile(){
    this.navCtrl.push(ProfilePage)
  }
  

}
