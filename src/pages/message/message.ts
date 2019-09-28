import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content , AlertController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalProvider } from "../../providers/global/global";
import { ListgroupPage } from '../listgroup/listgroup';

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  @ViewChild(Content) content: Content;
  constructor(
    public navCtrl  : NavController, 
    private alertCtrl : AlertController,
    public navParams: NavParams,
    public storage  : Storage,
    public global   : GlobalProvider,
    public toastCtrl  : ToastController,
    public http     : HttpClient) {
  }

  nama_kumpulan :any;
  lastMessage:any;
  timestamp:any;
  anc : any;
  juz : any;
  surah :any;
  lead : any;
  idk : any;
  createSuccess = false;

  private baseURI : string  = this.global.mysite;

  toUser = {
    _id: '534b8e5aaa5e7afc1b23e69b',
    pic: 'assets/img/avatar/ian-avatar.png',
    username: 'Ammar',
  };

  user = {
    _id: '534b8fb2aa5e7afc1b23e69c',
    pic: 'assets/img/avatar/marty-avatar.png',
    username: 'Nasrul',
  };

  public messageForm: any;
  chatBox: any;


  doneLoading = false;

  messages = [
    {
      _id: 1,
      date: new Date(),
      userId: this.user._id,
      username: this.user.username,
      pic: this.user.pic,
      text: 'I,ve done my part.'
    },
    {
      _id: 2,
      date: new Date(),
      userId: this.toUser._id,
      username: this.toUser.username,
      pic: this.toUser.pic,
      text: 'Class will be annouced later'
    },
    {
      _id: 3,
      date: new Date(),
      userId: this.toUser._id,
      username: this.toUser.username,
      pic: this.toUser.pic,
      text: 'Seen'
    },
    {
      _id: 4,
      date: new Date(),
      userId: this.user._id,
      username: this.user.username,
      pic: this.user.pic,
      text: 'Which part will be continue?'
    },
    {
      _id: 5,
      date: new Date(),
      userId: this.user._id,
      username: this.user.username,
      pic: this.user.pic,
      text: 'I`ve done',
    },
    {
      _id: 6,
      date: new Date(),
      userId: this.toUser._id,
      username: this.toUser.username,
      pic: this.toUser.pic,
      text: 'Nice'
    }
  ];


  ionViewWillEnter(): void {

    this.selectEntry(this.navParams.get("record"));
    //this.getNamaLead();

    /*if (this.navParams.get("chat")) {
      this.selectEntry(this.navParams.get("chat"));
    } */
  }

  selectEntry(item: any): void {
    console.log(item);
    this.nama_kumpulan = item.nama_kumpulan;
    this.lastMessage = item.lastMessage;
    this.timestamp = item.timestamp;
    this.surah = item.surah_terakhir;
    this.lead = item.lead;
    this.juz = item.ayat_terakhir;
    this.idk = item.idk;
    this.anc = item.anc;
    
    this.getNamaLead();
  }

  send(message) {
    if (message && message !== '') {
      // this.messageService.sendMessage(chatId, message);

      const messageData =
        {
          toId: this.toUser._id,
          _id: 6,
          date: new Date(),
          userId: this.user._id,
          username: this.toUser.username,
          pic: this.toUser.pic,
          text: message
        };

      this.messages.push(messageData);
      this.scrollToBottom();

      setTimeout(() => {
        const replyData =
          {
            toId: this.toUser._id,
            _id: 6,
            date: new Date(),
            userId: this.toUser._id,
            username: this.toUser.username,
            pic: this.toUser.pic,
            text: 'Just a quick reply'
          };
        this.messages.push(replyData);
        this.scrollToBottom();
      }, 1000);
    }
    this.chatBox = '';
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 100);
  }
  
  leaveGroup() : void
  {
     this.storage.get('user').then((user) => {
     let
         headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
         options 	: any		= { "idk" : this.idk, "user" : user},
         //url      : any   = this.baseURI + "F_LeaveGroup.php";
         url      : any   = this.baseURI + "F_LeaveGroup.php?idk="+this.idk+"&user="+user;
         console.log("USER N IDK", this.idk,user);

     this.http.post(url, JSON.stringify(options), headers).subscribe(data =>
     {
        this.sendNotification(`Group ${this.nama_kumpulan} leaved.`);
        this.navCtrl.setRoot(ListgroupPage);
     },
     (error : any) =>
     {
       console.dir(error);
        this.sendNotification(`Something went wrong for  ${this.nama_kumpulan} `);
     });
  }); //tutup storage
  }

  sendNotification(message : string)  : void
  {
     let notification = this.toastCtrl.create({
         message       : message,
         duration      : 3000
     });
     notification.present();
  }











  public buttonClicked: boolean = false;
  public buttonClicked2: boolean = true;
  public onButtonClick() {
    this.buttonClicked = !this.buttonClicked;
    this.buttonClicked2 = !this.buttonClicked2;
      console.log("hide n show");
  }











  editPin(){
    this.storage.get('user').then((user) => {
    this.update(this.anc,this.surah, this.juz, this.idk, user);
    console.log("To update: SURAH",this.surah,"-JUZ-",this.juz);
  });
  }

  update(anc : string, surah : string, juz : string, idk : string, user : string) : void
 {
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= {"anc" : anc, "surah" : surah, "juz" : juz, "idk" : idk, "user" : user },
        url       : any   = this.baseURI + "K_editPin.php";

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((record : any) =>
    {
       // If the request was successful notify the user
       this.createSuccess = true;
      this.showPopup("Success", "Pin updated.");
      // takyah this.navCtrl.setRoot(ProfilePage);
    this.buttonClicked = !this.buttonClicked;
    this.buttonClicked2 = !this.buttonClicked2;
    this.lead = user;
    this.getNamaLead();
    },
    error => {
      this.showPopup("Update Fail", "Please try again");
    });
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

  public profiles : Array<any> = [];
  public icdataarray : Array<any> = [];
  namalead ="";
  public namalead_array : Array<any> = [];

getNamaLead () {

  console.log("masuk fungsi getNamaLead");
     let    url : any = this.baseURI+'G_RetrieveProfile.php?id='+this.lead;
     this.http.get(url).subscribe((data2 : any) =>
     {
        console.dir(data2);
        this.profiles = data2;
        console.log("profile.length->",this.profiles.length);
        this.icdataarray = this.profiles.map(profiles => profiles.ic);
        this.namalead_array = this.profiles.map(profiles => profiles.nama);
        console.log("this.nama-data-array->", this.namalead_array);
       for(let i = 0; i < this.profiles.length; i++){
         if(this.lead == this.icdataarray[i]){
           this.namalead = this.namalead_array[i];
           console.log("nama leader",this.namalead);
           break;
         }
       }
     },
     (error : any) =>
     {
        console.dir(error);
     });
     console.log("nama leader2",this.namalead);
 }
}
