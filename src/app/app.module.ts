import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { TreblePage } from '../pages/treble/treble';
import { BassPage } from '../pages/bass/bass';
import { GrandStaffPage } from '../pages/grand-staff/grand-staff';
import { TimeTrialPage } from '../pages/time-trial/time-trial';
import { StatsPage } from '../pages/stats/stats';
import { WelcomePage } from '../pages/welcome/welcome';
import { UsersPage } from '../pages/users/users';
import { AddUserPage } from '../pages/add-user/add-user';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PianoDrawProvider } from '../providers/piano-draw/piano-draw';
import { Chart } from 'chart.js';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TutorialPage,
    TreblePage,
    BassPage,
    GrandStaffPage,
    TimeTrialPage,
    StatsPage,
    WelcomePage,
    UsersPage,
    AddUserPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ChartsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TutorialPage,
    TreblePage,
    BassPage,
    GrandStaffPage,
    TimeTrialPage,
    StatsPage,
    WelcomePage,
    UsersPage,
    AddUserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PianoDrawProvider
  ]
})
export class AppModule {}
