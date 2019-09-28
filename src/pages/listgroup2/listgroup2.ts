import { Component, ɵConsole } from '@angular/core';
import { IonicPage, NavController, PopoverController,NavParams, AlertController } from 'ionic-angular';
import { MessagePage } from '../message/message';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { PopoverPage } from '../popover/popover';
import { CreatePage } from '../create/create';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from "../../providers/global/global";
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';

@IonicPage()
@Component({  
  selector: 'page-listgroup2',
  templateUrl: 'listgroup2.html',
})
export class Listgroup2Page {

  today = Date.now();
  public items : Array<any> = [];
  private baseURI : string  = this.global.mysite;
  public showherba;
  createSuccess = false;

  constructor(public navCtrl: NavController,
              public popoverCtrl: PopoverController,
              public navParams: NavParams,
              private alertCtrl : AlertController,
              public global: GlobalProvider,
              public http     : HttpClient,
              public storage  : Storage ) {

  }
  lead = "";
  public leaddataarray : Array<any> = [];
  icdata ="";
  public icdataarray : Array<any> = [];
  namadata ="";
  public namadataarray : Array<any> = [];

  public idk : any;

  ionViewWillEnter(){ 
    this.load();
    console.log("Willenter home");
  }

  load() : void
  {
     this.storage.get('user').then((user) => {
     let    url : any = this.baseURI+'C_GroupList2.php?id='+user;
     this.http.get(url).subscribe((data : any) =>
     {
        console.dir(data);
        this.items = data;
        //endgame
        this.icdataarray = this.items.map(items => items.lead);
        this.leaddataarray = this.items.map(items => items.lead);
        for(let i = 0; i < this.items.length; i++){
          if(user == this.icdataarray[i]){
            this.icdata = this.icdataarray[i];
            this.lead = this.leaddataarray[i];
            break;
          }
      }
     },
     (error : any) =>
     {
        console.dir(error);
     });
   }); //close storage
  }


  joinGroup(idk :string) {
    this.storage.get('user').then((user) => {
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= {"ic" : user, "idk" : idk },
          url       : any   = this.baseURI + "D_JoinGroup.php";

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((record : any) =>
      {
        this.createSuccess = true;
        this.showPopup("Success", "Group Joined.");
      },
      error => {
        this.showPopup("Cant Join", error);
      }); 
    }); //close storage
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

  
   //Untuk Popup
   showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) { 
              //this.navCtrl.setRoot(HomePage);
              //alert.dismiss().then(()=>{this.navCtrl.setRoot(HomePage);})
              alert.dismiss(); 
              //this.navCtrl.popToRoot();
              this.navCtrl.setRoot(Listgroup2Page);
              return false; 
            }
          }
        }
      ]
    });
    alert.present(); 
  }






  public profiles : Array<any> = [];
  namalead ="";
  public namalead_array : Array<any> = [];
  public icdataarray2 : Array<any> = [];
  getNamaLead(){
     let    url : any = this.baseURI+'G_RetrieveProfile.php?id='+this.lead;
     this.http.get(url).subscribe((data2 : any) =>{
        console.dir(data2);
        this.profiles = data2;
        this.icdataarray2 = this.profiles.map(profiles => profiles.ic);
        this.namalead_array = this.profiles.map(profiles => profiles.nama);
       for(let i = 0; i < this.profiles.length; i++){
         if(this.lead == this.icdataarray2[i]){ 
           this.namalead = this.namalead_array[i];
           break;}}},(error : any) =>{console.dir(error);});
  }







}