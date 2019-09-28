import { Component, ɵConsole } from '@angular/core';
import { IonicPage, NavController, PopoverController,NavParams } from 'ionic-angular';
import { MessagePage } from '../message/message';
import { HttpClient } from '@angular/common/http';
import { PopoverPage } from '../popover/popover';
import { CreatePage } from '../create/create';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';

@IonicPage()
@Component({  
  selector: 'page-listgroup',
  templateUrl: 'listgroup.html',
})
export class ListgroupPage {

  today = Date.now();
  public items : Array<any> = [];
  private baseURI : string  = this.global.mysite;
  public showherba;

  constructor(public navCtrl: NavController,
              public popoverCtrl: PopoverController,
              public navParams: NavParams,
              public global: GlobalProvider,
              public http     : HttpClient,
              public storage  : Storage ) {

  }
  
  ionViewWillEnter(){ 
    this.load();
    console.log("Willenter home");
  }

  load() : void
  { 
     this.storage.get('user').then((user) => {
      let    url : any = this.baseURI+'C_GroupList.php?id='+user;
     this.http.get(url).subscribe((data : any) =>
     {
        console.dir(data);
        this.items = data;
     },
     (error : any) =>
     {
        console.dir(error);
     });
   }); //close storage
  }

  viewMessagesYIE(param :any) {
    this.navCtrl.push(MessagePage, param);
  }

  viewMessagesSATU(showherba) {
    showherba = showherba || '(Nama Group)';

    this.navCtrl.push(MessagePage, {
      data: showherba
    });
  }
  
  viewMessages(param : any) : void
  {
     this.navCtrl.push(MessagePage, param);
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage, { });
    popover.present({
      ev: myEvent
    });
  }

  add(){
    this.navCtrl.push(CreatePage)
  }
  navtohome(){
    this.navCtrl.setRoot(HomePage);
  }



}
