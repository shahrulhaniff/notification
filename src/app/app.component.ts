import { Component,ViewChild } from '@angular/core';
import { Nav, Platform, Events, Icon } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { ListgroupPage } from '../pages/listgroup/listgroup';
import { Listgroup2Page } from '../pages/listgroup2/listgroup2';
import { ProfilePage } from '../pages/profile/profile';

import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;
  public user : any;
  pages: Array<{title: string, component: any,Icon:any}>;
  namadata="";
  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              public storage: Storage,
              public events: Events,
              private push: Push, private alertCtrl: AlertController
              ) {

    events.subscribe('user:created', (user) => {this.namadata=user;});

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.pushSetup();
      this.pages = [
        { title: 'Home', component: HomePage , Icon :'home'},
        { title: 'My Profile', component: ProfilePage , Icon :'person'},
        { title: 'My Group', component: ListgroupPage , Icon :'people'},
        { title: 'Join Group', component: Listgroup2Page , Icon :'md-paper-plane'},
        { title: 'Log Out', component: LogoutPage, Icon :'log-out' }
      ];
      this.storage.get('user').then((user) => {
        this.user = user; console.log("data kat dalam app.co-->"+this.user); 
        if(this.user==null) { this.rootPage =LoginPage;}
        else {this.rootPage=HomePage; }; 
        });
    });
  }
  
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  pushSetup(){
    const options: PushOptions = {
      android: {
        senderID: '1012486531089'
      },
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      }
   }
   
   const pushObject: PushObject = this.push.init(options);
   
   
   pushObject.on('notification').subscribe((notification: any) => {
     if(notification.addtionalData.foreground){
       let youralert = this.alertCtrl.create({
         title: 'First Try',
         message: notification.message,
       });
       youralert.present();
     }
   });
   
   //pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
   //pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
   //pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
   
  }
}

