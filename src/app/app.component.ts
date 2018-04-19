import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { TreblePage } from '../pages/treble/treble';
import { BassPage } from '../pages/bass/bass';
import { GrandStaffPage } from '../pages/grand-staff/grand-staff';
import { TimeTrialPage } from '../pages/time-trial/time-trial';
import { StatsPage } from '../pages/stats/stats';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Tutorial', component: TutorialPage},
      { title: 'Treble', component: TreblePage},
      { title: 'Bass', component: BassPage},
      { title: 'Grand Staff', component: GrandStaffPage},
      { title: 'Time Trial', component: TimeTrialPage},
      { title: 'Stats', component: StatsPage}

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
