import { Component, ElementRef, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
@Component({
  selector: '../../pages/tutorial/page-tutorial',
  templateUrl: '../../pages/tutorial/tutorial.html',
})
export class PianoDrawProvider {


  //public drawImg: Promise;
	public canvas: any;
  public ctx: any;

	private c: any;
	private lineWidth = 14; //if this is edited, the staff wont neccesarilly draw properly without editing for-loops
	private staffPos = 3; //edit this to change the vertical pos of the staff
	private lastLetterDrawn: number[];
	private notePos:number[][];//stores info of where to draw each note
  public outerPos = false;
	private treble = 0; private bass = 1; private outertreb = 2; private outerbass = 3; //pos in notePos array 1st dimension
  private imgTCleff = 0; private imgBCleff = 1; private imgQNote = 2;
	//private anote = 0; private bnote = 1; private cnote = 2; private dnote = 3; private enote = 4; private fnote = 5; private gnote = 6;
  
  //for attempting to load the images without refreshing
  private pianoImages = ['https://d30y9cdsu7xlg0.cloudfront.net/png/923017-200.png' //this stores the local images
                    ,'https://cdn.pixabay.com/photo/2013/07/12/12/30/bass-145826_960_720.png'
                    ,'https://images.vexels.com/media/users/3/143592/isolated/preview/87a7de8e3d9f7b1760a9f5453b72b55c-quarter-note-isolated-by-vexels.png'
                    ];
  public loadedImages = {}; //holds the images when the are generated into an HTML Image Element
  public imgCount = this.pianoImages.length;
  public imgLoadedCount = 0;


  constructor() {

    this.notePos = [[-6,-14,-20,-28,-34,8,0],[106, 98, 92, 84, 78, 70, 64],[15,-42],[]];
    this.lastLetterDrawn = [9,9,9,9];
    //setup canvas
    this.canvas = document.createElement('canvas');
    this.canvas.width = 320;
    this.canvas.height = 300;
    this.ctx = this.canvas.getContext('2d');

    for(var i = 0; i < 3; i++){
      this.loadedImages[i] = new Image();
      this.loadedImages[i].src = this.pianoImages[i];
      this.loadedImages[i].onload = this.incrementImgLoaded();
    }


    this.drawGrandStaff();
    this.drawQuarterNote(0, 5);

  }

  incrementImgLoaded(){ //for loading images, called by separate function, currently redundant
    this.imgLoadedCount++;
  }

  initialiseCanvas() : void{ //checks to see if the browser supports canvas'
      if(this.canvas.getContext){
         this.setupCanvas();
      }
      else{
      	//error message for no browser support of canvas
      }
   }
//set canvas context
   setupCanvas() : void{//sets canvas context and logs to console
      this.c = this.canvas.getContext('2d');
      console.log("Canvas Setup Successful");
      //this.ctx.fillStyle = "#ffffff";
      //this.ctx.fillRect(0, 0, 800, 500);
   }
//draws single line of staff
   drawStaffLine(linePos: number) : void{ // draws a single staff line given the verticle pos for it to be drawn
     this.ctx.fillStyle = "#000000"
     this.ctx.fillRect(0, linePos, this.canvas.width, 2);

   }

   drawTrebleClef(){ // draws the 5 staff lines and symbol of the treble clef
     for (var i = this.staffPos; i < this.staffPos + 5; i++) {
       this.drawStaffLine(i * this.lineWidth);
     }
     this.ctx.drawImage(this.loadedImages[this.imgTCleff], 0, -10 + this.staffPos * this.lineWidth, 85, 85);
   }

   drawBassClef(){ // draws the 5 staff lines and symbol of the bass clef
     for (var i = this.staffPos + 7; i < this.staffPos + 12; i++) {
       this.drawStaffLine(i * this.lineWidth);
     }
     this.ctx.drawImage(this.loadedImages[this.imgBCleff],18, 100 + this.staffPos * this.lineWidth,42,42);
   }

   drawGrandStaff(){ //draws the whole grandstaff
     while(this.imgLoadedCount < this.imgCount){
       console.log("pls work");
     }
     this.drawTrebleClef();
     this.drawBassClef();
     console.log("Grandstaff Drawn Successful");
   }

   
   drawNote(clef: number, note:number, noteType: HTMLImageElement){ //draws a note given a number for which clef, a number for the note, and an image which is the note type i.e. quarter note
     this.ctx.drawImage(noteType, this.canvas.width/2 - 15, this.notePos[clef][note] + this.staffPos * this.lineWidth, 50, 50);
   }

   drawQuarterNote(clef: number, note:number){ // the same as drawNote just specifically for quarternotes
   	this.drawNote(clef, note, this.loadedImages[this.imgQNote]);
   }

   //clears the whole canvas
   clearCanvas(){
   	this.ctx.closePath();
   	this.ctx.beginPath();
   	this.canvas.width = this.canvas.width;
   }
   //redraws whole grandstaff
   redrawCanvas(){
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
   	this.clearCanvas();
   	this.setupCanvas();
   	this.drawGrandStaff();
   }
   //draws a random note given the clef as a number 0 - 3
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
   //called by button click event to draw new note on treble clef if the correct note is clicked, it is passed a number representing the note clicked
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
//called by button click event to draw new note on bass clef if the correct note is clicked, it is passed a number representing the note clicked
    drawNewBassNote(letter:number):number{
     var correctLetterClicked = 0;
     for(var i = 0; i < 4; i++){
       if (letter == this.lastLetterDrawn[i]) {
         correctLetterClicked++;
       }
     }
     if(correctLetterClicked > 0){
       this.redrawCanvas();
       this.drawRandomNote(this.bass);
       return 1;
     }
     return 0;
   }
   //draws images on canvas on home pages because they dont show up anyway and it makes sure they load before going to one of the other pages
   drawImagesForPreLoad(){
     this.ctx.drawImage(this.loadedImages[this.imgTCleff], 0, -10 + this.staffPos * this.lineWidth, 85, 85);
     this.ctx.drawImage(this.loadedImages[this.imgBCleff],18, 100 + this.staffPos * this.lineWidth,42,42);
     this.drawQuarterNote(0,0);
   }

   //add drawNewOuterNote


}
