import { Component, ɵConsole } from '@angular/core';
import { IonicPage, NavController, PopoverController,NavParams, Events } from 'ionic-angular';
import { MessagePage } from '../message/message';
import { HttpClient } from '@angular/common/http';
import { PopoverPage } from '../popover/popover';
import { CreatePage } from '../create/create';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";
import 'rxjs/add/operator/map';
import { ListgroupPage } from '../listgroup/listgroup';
import { ProfilePage } from '../profile/profile';
import { Listgroup2Page } from '../listgroup2/listgroup2';

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

  cara1(showherba) {
    showherba = showherba || 'Nope!';

    this.navCtrl.push(MessagePage, {
      data: showherba
    });
  }
  cara2(param : any) : void
  {
     this.navCtrl.push(MessagePage, param);
  }


  add(){
    this.navCtrl.push(CreatePage)
  }

  toProfile(){
    this.navCtrl.push(ProfilePage)
  }
  toListGroup(){
    this.navCtrl.push(ListgroupPage)
  }
  toListGroup2(){
    this.navCtrl.push(Listgroup2Page)
  }

  create(){
    this.navCtrl.push(CreatePage);
  }
  

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage, { });
    popover.present({
      ev: myEvent
    });
  }
}
