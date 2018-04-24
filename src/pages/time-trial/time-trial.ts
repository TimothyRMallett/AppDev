import { Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PianoDrawProvider } from '../../providers/piano-draw/piano-draw';


@IonicPage()
@Component({
  selector: 'page-time-trial',
  templateUrl: 'time-trial.html',
})
export class TimeTrialPage {
@ViewChild('canvas') canvasElement: ElementRef;
  private ctx: any;
  private clef: number;
  public correctClicks = "0"; public correctClicksNum = 0;
  public incorrectClicks = "0"; public incorrectClicksNum = 0;
  public timeStarted = false;
  public intervalId = 0;
  public seconds = 4;
  public timeLeft = "30";



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
    //this.drawServ.drawRandomNote(this.clef);
    this.ctx.drawImage(this.drawServ.canvas, 0, 0);

  }

  drawRandIfCorrect(letter:number){//draws new random note on bass or treble clef
    this.canvasElement.nativeElement.width = 320;
    this.clef = Math.floor(Math.random() * 2); 
    if(this.clef == 0){
    	if(this.drawServ.drawNewTrebleNote(letter) === 1){
        this.incrementCorrect();
      }
      else{
        this.incrementIncorrect();
      }
    }
    else if(this.clef == 1){
    	if(this.drawServ.drawNewBassNote(letter)){
        this.incrementCorrect();
      }
      else{
        this.incrementIncorrect();
      }
	}
    this.ctx.drawImage(this.drawServ.canvas, 0, 0);
  }

  popPage(){ //pops page
    this.navCtrl.pop();
  }

  incrementCorrect(){
    this.correctClicksNum++;
    this.correctClicks = this.correctClicksNum.toString();
  }

  incrementIncorrect(){
    this.incorrectClicksNum++;
    this.incorrectClicks = this.incorrectClicksNum.toString();
  }

  clearTimer() { clearInterval(this.intervalId); }

  //ngOnInit()    { this.start(); }
  ngOnDestroy() { this.clearTimer(); }

  start(){ 
    if(this.timeStarted){
      
    }
    else{
      this.timeStarted = true;
      this.drawServ.drawRandomNote(this.clef);
      this.ctx.drawImage(this.drawServ.canvas, 0, 0);
      this.countDown(); 
    }
  }
  stop()  {
    this.clearTimer();
  }

  private countDown() : number {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds--;
      this.timeLeft = this.seconds.toString();
      if (this.seconds <= 0) {
        this.seconds = 30;
        stop();
        return 1;
      }
    }, 1000);
    return 0;
  }

}


