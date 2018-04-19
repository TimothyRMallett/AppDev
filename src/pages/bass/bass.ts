import { Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PianoDrawProvider } from '../../providers/piano-draw/piano-draw';

@IonicPage()
@Component({
  selector: 'page-bass',
  templateUrl: 'bass.html',
})
export class BassPage {

  @ViewChild('canvas') canvasElement: ElementRef;
  private ctx: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public drawServ: PianoDrawProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BassPage');

    this.drawServ.outerPos = false;//without this the toggle will be incorrect when page is changed
  	this.canvasElement.nativeElement.width = 320;
    this.canvasElement.nativeElement.height = 260;
    this.ctx = this.canvasElement.nativeElement.getContext('2d');
    this.drawServ.clearCanvas();
    //this.ctx.drawImage(this.drawServ.canvas, 0, 0);
    //this.drawServ.clearCanvas();
    this.drawServ.drawGrandStaff();
    this.drawServ.drawRandomNote(1);
    this.ctx.drawImage(this.drawServ.canvas, 0, 0);

  }

  drawRandIfCorrect(letter:number){ //draws new random note on bass clef
    this.canvasElement.nativeElement.width = 320;
    this.drawServ.drawNewBassNote(letter);
    this.ctx.drawImage(this.drawServ.canvas, 0, 0);
  }

  toggleOuterNotes(){ //toggles the outerNotes boolean to allow for the notes outside the staff to be seen
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
/*//Currently unused
  drawAfterImageLoads(){
    while(this.drawServ.imgLoadedCount < this.drawServ.imgCount){
      console.log("woooork");
    }
    this.ctx.drawImage(this.drawServ.canvas, 0, 0);
  }
  */
}