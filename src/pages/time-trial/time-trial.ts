import { Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PianoDrawProvider } from '../../providers/piano-draw/piano-draw';

/**
 * Generated class for the TimeTrialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-time-trial',
  templateUrl: 'time-trial.html',
})
export class TimeTrialPage {
@ViewChild('canvas') canvasElement: ElementRef;
  private ctx: any;
  private clef: number;
  private correctClicks: number;
  private incorrectClicks: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public drawServ: PianoDrawProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BassPage');

    this.clef = Math.floor(Math.random() * 2);
    this.drawServ.outerPos = true;
  	this.canvasElement.nativeElement.width = 320;
    this.canvasElement.nativeElement.height = 260;
    this.ctx = this.canvasElement.nativeElement.getContext('2d');
    this.drawServ.clearCanvas();
    //this.ctx.drawImage(this.drawServ.canvas, 0, 0);
    //this.drawServ.clearCanvas();
    this.drawServ.drawGrandStaff();
    this.drawServ.drawRandomNote(this.clef);
    this.ctx.drawImage(this.drawServ.canvas, 0, 0);

  }

  drawRandIfCorrect(letter:number){//draws new random note on bass or treble clef
    this.canvasElement.nativeElement.width = 320;
    this.clef = Math.floor(Math.random() * 2); 
    if(this.clef == 0){
    	this.drawServ.drawNewTrebleNote(letter);
    }
    else if(this.clef = 1){
    	this.drawServ.drawNewBassNote(letter);
	}
    this.ctx.drawImage(this.drawServ.canvas, 0, 0);
  }

  

  popPage(){ //pops page
    this.navCtrl.pop();
  }

}
