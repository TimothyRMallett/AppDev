import { Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PianoDrawProvider } from '../../providers/piano-draw/piano-draw';


@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {

	@ViewChild('canvas') canvasElement: ElementRef;
  private ctx: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public drawServ: PianoDrawProvider) {

  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad TutorialPage');

    this.drawServ.outerPos = false;//without this the toggle will be incorrect when page is changed
    this.canvasElement.nativeElement.width = 320;
    this.canvasElement.nativeElement.height = 260;
    this.ctx = this.canvasElement.nativeElement.getContext('2d');
    this.drawServ.clearCanvas();
    //this.ctx.drawImage(this.drawServ.canvas, 0, 0);
    //this.drawServ.clearCanvas();
    this.drawServ.drawGrandStaff();
    this.drawServ.drawRandomNote(0);
    this.ctx.drawImage(this.drawServ.canvas, 0, 0);
    //this.drawAfterImageLoads();
    //this.drawServ.initialiseCanvas();
    //this.drawServ.drawGrandStaff();
    //this.drawServ.drawRandomNote(0);
    //this.drawServ.drawQuarterNote(0,5);

  }

  drawRandIfCorrect(letter:number){//same as others, this page will be tutorial but is for testing at the moment
    this.canvasElement.nativeElement.width = 320;
    this.drawServ.drawNewTrebleNote(letter);
    this.ctx.drawImage(this.drawServ.canvas, 0, 0);
  }
  toggleOuterNotes(){ //same as others
    if(this.drawServ.outerPos){
      this.drawServ.outerPos = false;
    }
    else{
      this.drawServ.outerPos = true;
    }
    console.log(this.drawServ.outerPos);
  }

  popPage(){ //same as others
    this.navCtrl.pop();
  }

  /*currently unused
  drawAfterImageLoads(){
    while(this.drawServ.imgLoadedCount < this.drawServ.imgCount){
      console.log("woooork");
    }
    this.ctx.drawImage(this.drawServ.canvas, 0, 0);
  }*/

}