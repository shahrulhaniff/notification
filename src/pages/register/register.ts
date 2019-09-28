import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GlobalProvider } from "../../providers/global/global";


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;
  public form     : FormGroup;

  private baseURI : string  = this.global.mysite;
  
  
  constructor(  public global: GlobalProvider,
                public navCtrl    : NavController, 
                public navParams  : NavParams, 
                public http       : HttpClient,
                private alertCtrl : AlertController,
                public fb         : FormBuilder) {
                  /* Buat validation */
                  this.form = fb.group({
                    "username"    : ["", Validators.required],
                    "name"        : ["", Validators.required],
                    "phone"       : ["", Validators.required],
                    "password"    : ["", Validators.required],
                    "password2"   : ["", Validators.required]
                 });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    
    //this.register();
  }

  public usr;
  public pwd;
  
  register() : void
   {
      console.log('Masuk fungsi register'); 
      let usr     : string    = this.form.controls["username"].value,
          name     : string    = this.form.controls["name"].value,
          phone     : string    = this.form.controls["phone"].value,
          pwd     : string    = this.form.controls["password"].value,
          pwd2    : string    = this.form.controls["password2"].value;
      if (pwd!=pwd2) { this.showPopup("Nope", "Check your password."); }
      else { this.createUser(usr, name, phone, pwd);  } 
      
    console.log('usr-->', usr , 'pwd-->', pwd); //undefine bosku
   }

   createUser(usr : string, name : string, phone : string, pwd : string) : void
   {
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "usr" : usr, "nama" : name, "phone" : phone, "pwd" : pwd },
          url       : any   = this.baseURI + "B_Register.php";

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((record : any) =>
      {
         // If the request was successful notify the user
        this.createSuccess = true;
        this.showPopup("Success", "Account created.");
      },
      error => {
        this.showPopup("Cant Register", error);
      });
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