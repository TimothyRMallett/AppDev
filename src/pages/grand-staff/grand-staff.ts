import { Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PianoDrawProvider } from '../../providers/piano-draw/piano-draw';


@IonicPage()
@Component({
  selector: 'page-grand-staff',
  templateUrl: 'grand-staff.html',
})
export class GrandStaffPage {

  @ViewChild('canvas') canvasElement: ElementRef;
  private ctx: any;
  private clef: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public drawServ: PianoDrawProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BassPage');

    this.clef = Math.floor(Math.random() * 2);
    this.drawServ.outerPos = false;//without this the toggle will be incorrect when page is changed
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

  drawRandIfCorrect(letter:number){//draws new random note on bass clef
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

  toggleOuterNotes(){//toggles the outerNotes boolean to allow for the notes outside the staff to be seen
    if(this.drawServ.outerPos){
      this.drawServ.outerPos = false;
    }
    else{
      this.drawServ.outerPos = true;
    }
    console.log(this.drawServ.outerPos);
  }

  popPage(){ //pops the page back to home
    this.navCtrl.pop();
  }

}
