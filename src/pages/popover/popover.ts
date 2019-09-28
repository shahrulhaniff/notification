import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreatePage } from '../create/create';
import { SelectPage } from '../select/select';
import { InvitePage } from '../invite/invite';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { LogoutPage } from '../logout/logout';

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 * 
 <ion-item (click)="create()">Create new group    
    </ion-item>
    <ion-item (click)="join()">Join
    </ion-item>
    <ion-item (click)="invite()">Invite
    </ion-item>
 * 
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',

  template: `
    
    <ion-item (click)="logout()">Logout
    </ion-item>
    `
})
export class PopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage  : Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  create(){
    this.navCtrl.push(CreatePage);
  }

  join(){
    this.navCtrl.push(SelectPage)
  }

  invite(){
    this.navCtrl.push(InvitePage)
  }

  public logout() {
    this.navCtrl.push(LogoutPage);
  }

}
