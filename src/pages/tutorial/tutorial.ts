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
  private trebleCleffImg = new Image();
  private bassCleffImg = new Image();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.trebleCleffImg.src = "https://d30y9cdsu7xlg0.cloudfront.net/png/923017-200.png";
    this.bassCleffImg.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/FClef.svg/691px-FClef.svg.png";
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');

    this.canvas = this.canvasEl.nativeElement;
    this.canvas.width = 320;
    this.canvas.height = 450;


    this.initialiseCanvas();
    //this.drawStaffLine(10);
    //this.drawTrebleClef();
    //this.drawBassClef();
    this.drawGrandStaff();
    this.c.drawImage(this.trebleCleffImg, 0, 17, 80, 80);
    this.c.drawImage(this.bassCleffImg, 18, 119, 39, 39);
    //this.trebleCleffImg.onload = this.c.drawImage(this.trebleCleffImg, 0, 17, 80, 80);
  }

  initialiseCanvas() : void{
      if(this.canvas.getContext)
      {
         this.setupCanvas();
      }
   }

   setupCanvas() : void{
      this.c = this.canvas.getContext('2d');
      //this.c.fillStyle = "#ffffff";
      //this.c.fillRect(0, 0, 800, 500);
   }

   drawStaffLine(linePos: number) : void{
     this.c.fillStyle = "#000000"
     this.c.fillRect(0, linePos, this.canvas.width, 2);
   }

   drawTrebleClef(){
     for (var i = 2; i < 7; i++) {
       this.drawStaffLine(i * 13);
     }
   }

   drawBassClef(){
     for (var i = 9; i < 14; i++) {
       this.drawStaffLine(i * 13);
     }
   }

   drawGrandStaff(){
     this.drawTrebleClef();
     this.drawBassClef();
   }

}
