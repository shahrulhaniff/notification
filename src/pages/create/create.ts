import { Component, ViewChild , ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GlobalProvider } from "../../providers/global/global";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { COMMON_DEPRECATED_I18N_PIPES } from '@angular/common/src/pipes/deprecated';

@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {

  public form     : FormGroup;
  createSuccess = false;
  private baseURI : string  = this.global.mysite;
  public items : Array<any> = [];
  public allPlayers : Array<any> = [];
  teamPlayers: string[];


  //public ic = ['Lool', 'asd']; // Checkbox list

  checkedItems:boolean[]; // Check which one is ticked (True = Ticked | False = Not ticked)
  public confirmedItems : Array<any> = []; // Ni untuk PUSH ticked(chosen) values je. Saje untuk test.


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public global: GlobalProvider,
              public fb         : FormBuilder,
              private alertCtrl : AlertController,
              public http       : HttpClient,
              public elementRef: ElementRef,
              public storage  : Storage ) {
                this.checkedItems = new Array(this.ic.length);
                /* Buat validation */
                this.form = fb.group({
                  "nama_kumpulan"    : ["", Validators.required],
               });
               
               //this.teamPlayers.forEach(ic => this.form.get(cb).setValue(true));
               //this is COMMENTED, try another way THAT USING NGMODULE BUT NOT FORMCONTROLNAME
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
    this.load();
  }

  load(){
    this.storage.get('user').then((user) => {
    let    url : any = this.baseURI+'E_FriendList.php?id='+user; 
   console.log('url debug' + url);    
   this.http.get(url).subscribe((data : any) =>
   {
      console.dir(data);
      this.items = data;
      this.selectEntry(data); console.log("data mende ",data.length);
   },
   (error : any) =>
   {
      console.dir(error);
    });
  }); //close storage
  }

  public arraynama: Array<any> = [];

  selectEntry(item: any): void {
    for (let i = 0; i < this.items.length; i++) {
    //this.arraynama = item[i].nama;
    //array_push(this.arraynama , item[i].nama);
    this.arraynama.push(item[i].ic); //tukar ic
    }
    console.log("show nama :",this.arraynama);
  }
  public ic = this.arraynama;

    
  register() : void
   {
    //this.teamPlayers = this.form.controls["cb"].value;
    console.log('Masuk fungsi register'); 

      //ahli: string[] = this.form.get(item).value;

      //if (pwd!=pwd2) { this.showPopup("Nope", "Check your password."); }else { this.createGroup(nama_kumpulan, surah_terakhir);  } 

    //################################################
    //#######################   ######################
    //#####################   ########################
    //##################   ###########################
    //#####  ########   ##############################
    //#######  ####   ################################
    //########     ###################################
    //################################################
    //minsa minsa checkbox minsa
    this.confirmedItems = [];

    for(let z = 0; z <= this.ic.length; z++){

      //It will check which value is ticked on the checkbox. Kalau ticked, dia akan PUSH value tu ke dalam variable confirmedItems. 
      //So, boleh buat query SQL INSERT sini je.
      if(this.checkedItems[z]==true){
        this.confirmedItems.push(this.ic[z]);
      }

    }

    
    let nama_kumpulan     : string    = this.form.controls["nama_kumpulan"].value,
    ahli     : string[]    = this.confirmedItems; //shahrul!

    //Yang ni untuk test je keluar alert nak cek value.
    /* let alert = this.alertCtrl.create({
      title: 'SUCCESS',
      subTitle: ''+this.confirmedItems,
      buttons: ['OK']
    });
    alert.present(); */
    //minsa minsa checkbox minsa    
    //################################################
    //#######   ######   #############################
    //#######   ######   #############################
    //#######            #############################
    //#######   ######   #############################
    //#######   ######   #############################
    //#######   ######   #############################
    //################################################


      this.createGroup(nama_kumpulan,ahli);
      console.log('nama_kumpulan-->', nama_kumpulan ); //undefine bosku
   }
   
   createGroup(nama_kumpulan : string, ahli : string[]) : void
   {
     console.log("siapa ahli",ahli);
    this.storage.get('user').then((user) => {
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= {"ic_pengguna" : user, "nama_kumpulan" : nama_kumpulan,  "ahli" : ahli },
          url       : any   = this.baseURI + "D_createGroup.php";

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((record : any) =>
      {
        this.createSuccess = true;
        this.showPopup("Success", "Group created.");
      },
      error => {
        this.showPopup("Cant Register", error);
      }); 
    }); //close storage
   }

  @ViewChild('myInput') myInput: ElementRef;
  resize() {
    var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
    var scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + 'px';
    this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';

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
              this.navCtrl.popToRoot();
              return false; 
            }
          }
        }
      ]
    });
    alert.present(); 
  }

  

}
