import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Popover } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MessagePage } from '../pages/message/message';
import { PopoverPage } from '../pages/popover/popover';
import { CreatePage } from '../pages/create/create';
import { SelectPage } from '../pages/select/select';
import { InvitePage } from '../pages/invite/invite';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { GlobalProvider } from '../providers/global/global';
import { TextAvatarDirective } from '../directives/text-avatar/text-avatar';
import { ListgroupPage } from '../pages/listgroup/listgroup';
import { ProfilePage } from '../pages/profile/profile';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { ChangepassPage } from '../pages/changepass/changepass';
import { Listgroup2Page } from '../pages/listgroup2/listgroup2';
import { Push } from '@ionic-native/push';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListgroupPage,
    Listgroup2Page,
    MessagePage,
    PopoverPage,
    CreatePage,
    SelectPage,
    InvitePage,
    LoginPage,
    LogoutPage,
    TextAvatarDirective,
    ProfilePage,
    EditprofilePage,
    ChangepassPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListgroupPage,
    Listgroup2Page,
    MessagePage,
    PopoverPage,
    CreatePage,
    SelectPage,
    InvitePage,
    LoginPage,
    LogoutPage,
    ProfilePage,
    EditprofilePage,
    ChangepassPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider
  ]
})
export class AppModule {}
