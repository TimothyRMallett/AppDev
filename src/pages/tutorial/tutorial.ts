import { Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {

	@ViewChild('canvas') canvasEl: ElementRef;

	private canvas: any;
	private c: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');

    this.canvas = this.canvasEl.nativeElement;
    this.canvas.width = 320;
    this.canvas.height = 200;


    this.initialiseCanvas();
    //this.drawStaffLine(10);
    this.drawTrebleClef();
    this.drawBassClef();

  }

  initialiseCanvas() : void{
      if(this.canvas.getContext)
      {
         this.setupCanvas();
      }
   }

   setupCanvas() : void{
      this.c = this.canvas.getContext('2d');
      this.c.fillStyle = "#ffffff";
      this.c.fillRect(0, 0, 800, 500);
   }

   drawStaffLine(linePos: number) : void{
     this.c.fillStyle = "#000000"
     this.c.fillRect(0, linePos, this.canvas.width, 2);
   }

   drawTrebleClef(){
     for (var i = 2; i < 7; i++) {
       this.drawStaffLine(i * 9);
     }
   }

   drawBassClef(){
     for (var i = 9; i < 14; i++) {
       this.drawStaffLine(i * 9);
     }
   }

}
