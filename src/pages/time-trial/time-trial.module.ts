import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimeTrialPage } from './time-trial';

@NgModule({
  declarations: [
    TimeTrialPage,
  ],
  imports: [
    IonicPageModule.forChild(TimeTrialPage),
  ],
})
export class TimeTrialPageModule {}
