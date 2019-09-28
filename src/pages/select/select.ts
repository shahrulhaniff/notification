import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select',
  templateUrl: 'select.html',
})
export class SelectPage {

  public items : Array<any> = [];
  private baseURI : string  = this.global.mysite;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage  : Storage ,
              public http     : HttpClient,
              public global: GlobalProvider) {
  }

  ionViewWillEnter() {
    this.load(); 
    console.log('ionViewDidLoad SelectPage');
  }

  load() : void
  {
    
    this.storage.get('user').then((user) => { 
      let    url : any = this.baseURI+'retrieveGroup.php?id='+user;
            
     this.http.get(url).subscribe((data : any) =>
     {
        console.dir(data);
        this.items = data;
     },
     (error : any) =>
     {
        console.dir(error);
      }); });
  }

}
