import { Component, ElementRef, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const page = document;
const canvas = document.createElement("canvas");
canvas.height = 200;
canvas.width = 320;

/*
  Generated class for the PianoDrawProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
@Component({
  selector: '../../pages/tutorial/page-tutorial',
  templateUrl: '../../pages/tutorial/tutorial.html',
})
export class PianoDrawProvider {

	//@ViewChild('canvas') canvasEl: ElementRef;

	//private canvas: any;
	private c: any;
	private lineWidth = 14; //if this is edited, the staff wont neccesarilly draw properly without editing for-loops
	private staffPos = 3; //edit this to change the vertical pos of the staff
	private lastLetterDrawn: number[];
	private notePos:number[][];//stores info of where to draw each note
	private treble = 0; private bass = 1; private outertreb = 2; private outerbass = 3; //pos in notePos array 1st dimension
	//private anote = 0; private bnote = 1; private cnote = 2; private dnote = 3; private enote = 4; private fnote = 5; private gnote = 6;

  private trebleCleffImg = new Image();
 	private bassCleffImg = new Image();
  private quarterNoteImg= new Image();


  constructor() {

  	//canvas = "htmlCanvas";
    //canvas.width = 320;
    //canvas.height = 200;
    this.trebleCleffImg.src = "https://d30y9cdsu7xlg0.cloudfront.net/png/923017-200.png";
    this.bassCleffImg.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/FClef.svg/691px-FClef.svg.png";
    this.quarterNoteImg.src = "https://images.vexels.com/media/users/3/143592/isolated/preview/87a7de8e3d9f7b1760a9f5453b72b55c-quarter-note-isolated-by-vexels.png";
    //this.loadImages(this.trebleCleffImg);
    this.notePos = [[-6,-14,-20,-28,-34,8,0],[106, 98, 92, 84, 78, 70, 64],[15,-42],[]];
    this.lastLetterDrawn = [9,9,9,9];

  }

  giveCanvasElement(pageCanvas: any){
    pageCanvas = canvas;
  }

  retCanvasElement():HTMLCanvasElement{
    return canvas;
  }

  initialiseCanvas() : void{
      if(canvas.getContext){
         this.setupCanvas();
      }
      else{
      	//error message for no browser support of canvas
      }
   }
//set canvas context
   setupCanvas() : void{
      this.c = canvas.getContext('2d');
      console.log("Canvas Setup Successful");
      //this.c.fillStyle = "#ffffff";
      //this.c.fillRect(0, 0, 800, 500);
   }
//draws single line of staff
   drawStaffLine(linePos: number) : void{
     this.c.fillStyle = "#000000"
     this.c.fillRect(0, linePos, canvas.width, 2);

   }

   drawTrebleClef(){
     for (var i = this.staffPos; i < this.staffPos + 5; i++) {
       this.drawStaffLine(i * this.lineWidth);
     }
     this.c.drawImage(this.trebleCleffImg, 0, -10 + this.staffPos * this.lineWidth, 85, 85);
   }

   drawBassClef(){
     for (var i = this.staffPos + 7; i < this.staffPos + 12; i++) {
       this.drawStaffLine(i * this.lineWidth);
     }
     this.c.drawImage(this.bassCleffImg,18, 100 + this.staffPos * this.lineWidth,42,42);
   }

   drawGrandStaff(){
     this.drawTrebleClef();
     this.drawBassClef();
     console.log("Grandstaff Drawn Successful");
   }

   drawQuarterNote(clef: number, note:number){
   	this.drawNote(clef, note, this.quarterNoteImg);
   }

   drawNote(clef: number, note:number, noteType: HTMLImageElement){
   	this.c.drawImage(noteType, canvas.width/2 - 15, this.notePos[clef][note] + this.staffPos * this.lineWidth, 50, 50);
   }
   //clears the whole canvas
   clearCanvas(){
   	this.c.closePath();
   	this.c.beginPath();
   	canvas.width = canvas.width;
   }
   //redraws whole grandstaff
   redrawCanvas(){
   	this.clearCanvas();
   	this.setupCanvas();
   	this.drawGrandStaff();
   }
   //draws a random note given the clef, as a number 0 - 3
   drawRandomNote(clef:number):number{
   	var newLetter = 0;
   	while(newLetter == 0){
   		var num = Math.floor((Math.random() * 7));
	   	if(this.lastLetterDrawn[clef] == num){

	   	}
	   	else{
		   	this.drawQuarterNote(clef, num);
		   	this.lastLetterDrawn[clef] = num;
		   	newLetter++;
	   }
	}
	for(var i = 1; i < 4; i++){
		this.lastLetterDrawn[(clef + i) % 4] = 9;//gets rid of last drawn numbers on other clef
	}
   	return 0;
   }
   //called by button click event to draw new note on treble clef if the correct note is clicked
   drawNewTrebleNote(letter:number):number{
   	var correctLetterClicked = 0;
   	for(var i = 0; i < 4; i++){
	   	if (letter == this.lastLetterDrawn[i]) {
	   		correctLetterClicked++;
	   	}
   	}
   	if(correctLetterClicked > 0){
	   	this.redrawCanvas();
	   	this.drawRandomNote(this.treble);
	   	return 1;
   	}
   	return 0;
   }
   //add drawNewBassNote and drawNewNote, potentially drawNewOuterNote

}
