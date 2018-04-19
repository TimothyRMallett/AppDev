import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TreblePage } from './treble';

@NgModule({
  declarations: [
    TreblePage,
  ],
  imports: [
    IonicPageModule.forChild(TreblePage),
  ],
})
export class TreblePageModule {}
