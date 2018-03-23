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
  private quarterNoteImg= new Image();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.trebleCleffImg.src = "https://d30y9cdsu7xlg0.cloudfront.net/png/923017-200.png";
    this.bassCleffImg.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/FClef.svg/691px-FClef.svg.png";
    this.quarterNoteImg.src = "https://images.vexels.com/media/users/3/143592/isolated/preview/87a7de8e3d9f7b1760a9f5453b72b55c-quarter-note-isolated-by-vexels.png";
    this.loadImages(this.trebleCleffImg);

  }


  ionViewDidLoad(){
    console.log('ionViewDidLoad TutorialPage');

    this.canvas = this.canvasEl.nativeElement;
    this.canvas.width = 320;
    this.canvas.height = 450;


    this.initialiseCanvas();
    this.drawGrandStaff();
    this.drawQuarterNote("t","f");
    this.drawQuarterNote("t","a");
    this.drawQuarterNote("t","c");
    this.drawQuarterNote("t","e");
    //this.trebleCleffImg.onload = this.c.drawImage(this.trebleCleffImg, 0, 17, 80, 80};
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
     this.c.drawImage(this.trebleCleffImg, 0, 17, 80, 80);
   }

   drawBassClef(){
     for (var i = 9; i < 14; i++) {
       this.drawStaffLine(i * 13);
     }
     this.c.drawImage(this.bassCleffImg,18,119,39,39);
   }

   drawGrandStaff(){
     this.drawTrebleClef();
     this.drawBassClef();
   }

   drawQuarterNote(clef: string, note:string){
     if (clef.localeCompare("t") == 0) {
       console.log("jsdjls");
       if (note.localeCompare("f")) {
         this.c.drawImage(this.quarterNoteImg, this.canvas.width/2 - 15, 30, 50, 50);
       }
       if(note.localeCompare("a")){
         this.c.drawImage(this.quarterNoteImg, this.canvas.width/2 - 15, 17, 50, 50);
         console.log("blarg");
       }
       if(note.localeCompare("c")){
         this.c.drawImage(this.quarterNoteImg, this.canvas.width/2 - 15, 4, 50, 50);
         console.log("far out");
       }
       if(note.localeCompare("e")){
         this.c.drawImage(this.quarterNoteImg, this.canvas.width/2 - 15, -9, 50, 50);
       }
     }
     
   }

   ////////All Currently Unused Funcitons/////////

   drawPianoImage(img:HTMLImageElement, xpos:number, ypos:number, width:number, height:number){
     this.c.drawImage(img, xpos, ypos, width, height);
   }

   imagesLoaded(){
     //this.drawGrandStaff();
     //alert("Loaded");
     //this.canvas.redraw();
   }

   loadImages(img:HTMLImageElement){
     img.addEventListener('load', this.imagesLoaded);
   }

}
