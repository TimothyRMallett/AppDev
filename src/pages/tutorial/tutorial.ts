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
	private lineWidth = 14;
	private lastLetterDrawn: string;
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
    this.canvas.height = 200;


    this.initialiseCanvas();
    this.drawGrandStaff();
    //this.drawRandomNote();
    this.drawNote("t","f");
  }

  initialiseCanvas() : void{
      if(this.canvas.getContext){
         this.setupCanvas();
      }
      else{
      	//error message for no browser support
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
       this.drawStaffLine(i * this.lineWidth);
     }
     this.c.drawImage(this.trebleCleffImg, 0, 19, 85, 85);
   }

   drawBassClef(){
     for (var i = 9; i < 14; i++) {
       this.drawStaffLine(i * this.lineWidth);
     }
     this.c.drawImage(this.bassCleffImg,18,127,43,43);
   }

   drawGrandStaff(){
     this.drawTrebleClef();
     this.drawBassClef();
   }

   drawQuarterNote(note:string){

   }

   drawNote(clef: string, note:string){
     if (clef.localeCompare("t") == 0) {
       if (note.localeCompare("f") == 0) {
         this.c.drawImage(this.quarterNoteImg, this.canvas.width/2 - 15, 36, 50, 50);
       }
       else if(note.localeCompare("a") == 0){
         this.c.drawImage(this.quarterNoteImg, this.canvas.width/2 - 15, 22, 50, 50);
       }
       else if(note.localeCompare("c") == 0){
         this.c.drawImage(this.quarterNoteImg, this.canvas.width/2 - 15, 8, 50, 50);
       }
       else if(note.localeCompare("e") == 0){
         this.c.drawImage(this.quarterNoteImg, this.canvas.width/2 - 15, -6, 50, 50);
       }
     else if(note.localeCompare("g") == 0){
         this.c.drawImage(this.quarterNoteImg, this.canvas.width/2 - 15, 23, 50, 50);
     }
     else if(note.localeCompare("b") == 0){
         this.c.drawImage(this.quarterNoteImg, this.canvas.width/2 - 15, 10, 50, 50);
     }
     else if(note.localeCompare("d") == 0){
         this.c.drawImage(this.quarterNoteImg, this.canvas.width/2 - 15, -9, 50, 50);
     }
 	}
 	else if(clef.localeCompare("ot") == 0){

 	}	
   }

   clearCanvas(){
   	this.c.closePath();
   	this.c.beginPath();
   	this.canvas.width = this.canvas.width;
   }

   redrawCanvas(){
   	this.clearCanvas();
   	this.setupCanvas();
   	this.drawGrandStaff();
   }

   drawRandomNote(){
   	var num = Math.floor((Math.random() * 4) + 1);
   	console.log(num);
   	if(num == 1){ 		
   		this.drawNote("t", "f");
   		this.lastLetterDrawn = "f";
   	}
   	else if(num == 2){
   		this.drawNote("t", "a");
   		this.lastLetterDrawn = "a";
   	}
   	else if(num == 3){
   		this.drawNote("t", "c");
   		this.lastLetterDrawn = "c";
   	}
   	else if(num == 4){
   		this.drawNote("t", "e");
   		this.lastLetterDrawn = "e";
   	}
   }

   drawNewNote(letter:string){
   	if (letter.localeCompare(this.lastLetterDrawn) == 0) {
   		this.redrawCanvas();
   		this.drawRandomNote();
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
