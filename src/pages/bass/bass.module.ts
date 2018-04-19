import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BassPage } from './bass';

@NgModule({
  declarations: [
    BassPage,
  ],
  imports: [
    IonicPageModule.forChild(BassPage),
  ],
})
export class BassPageModule {}
