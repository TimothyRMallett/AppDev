import { Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PianoDrawProvider } from '../../providers/piano-draw/piano-draw';
const htmlCanvas = document.createElement("canvas");
htmlCanvas.height = 200;
htmlCanvas.width = 320;


@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {

	@ViewChild('canvas') canvasEl: ElementRef;
/*
@ViewChild('canvas') canvasEl: ElementRef;
	private canvas: any;
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
*/
  //public drawer; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public drawer: PianoDrawProvider) {
    //drawer = new PianoDrawProvider(htmlCanvas);


    /*
    this.trebleCleffImg.src = "https://d30y9cdsu7xlg0.cloudfront.net/png/923017-200.png";
    this.bassCleffImg.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/FClef.svg/691px-FClef.svg.png";
    this.quarterNoteImg.src = "https://images.vexels.com/media/users/3/143592/isolated/preview/87a7de8e3d9f7b1760a9f5453b72b55c-quarter-note-isolated-by-vexels.png";
    //this.loadImages(this.trebleCleffImg);
    this.notePos = [[-6,-14,-20,-28,-34,8,0],[106, 98, 92, 84, 78, 70, 64],[15,-42],[]];
    this.lastLetterDrawn = [9,9,9,9];


    //initialise string array, first dimension "t", "ot", "b", and "ob". Second contains the note e.g. a, f or c. Third contains the draw info
    //this.notePos[this.treble][this.anote][0] = -6;
    //console.log(this.notePos[this.treble][this.anote][0]);
*/
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad TutorialPage');
/*
    this.canvas = this.canvasEl.nativeElement;
    this.canvas.width = 320;
    this.canvas.height = 200;
    */


    //this.drawServ.initialiseCanvas();
    //this.drawServ.drawGrandStaff();
    //this.drawServ.drawRandomNote(0);
    //this.drawQuarterNote(0,5);
  }
  /*
//checks for canvas browser support before setting up canvas
  initialiseCanvas() : void{
      if(this.canvas.getContext){
         this.setupCanvas();
      }
      else{
      	//error message for no browser support of canvas
      }
   }
//set canvas context
   setupCanvas() : void{
      this.c = this.canvas.getContext('2d');
      //this.c.fillStyle = "#ffffff";
      //this.c.fillRect(0, 0, 800, 500);
   }
//draws single line of staff
   drawStaffLine(linePos: number) : void{
     this.c.fillStyle = "#000000"
     this.c.fillRect(0, linePos, this.canvas.width, 2);
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
   }

   drawQuarterNote(clef: number, note:number){
   	this.drawNote(clef, note, this.quarterNoteImg);
   }

   drawNote(clef: number, note:number, noteType: HTMLImageElement){
   	this.c.drawImage(noteType, this.canvas.width/2 - 15, this.notePos[clef][note] + this.staffPos * this.lineWidth, 50, 50);
   }
   //clears the whole canvas
   clearCanvas(){
   	this.c.closePath();
   	this.c.beginPath();
   	this.canvas.width = this.canvas.width;
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
*/
}
////////All Currently Unused Funcitons/////////

   /*

   drawRandomNote():number{
   	var newLetter = 0;
   	while(newLetter == 0){
   		var num = Math.floor((Math.random() * 7) + 1);
	   	if(num == 1){
	   		if(this.lastLetterDrawn.localeCompare("f") == 0){}
	   		else{		
		   		this.drawQuarterNote("t", "f");
		   		this.lastLetterDrawn = "f";
		   		newLetter++;
	   		}
	   	}
	   	else if(num == 2){
	   		if(this.lastLetterDrawn.localeCompare("a") == 0){}
	   		else{		
		   		this.drawQuarterNote("t", "a");
		   		this.lastLetterDrawn = "a";
		   		newLetter++;
	   		}
	   	}
	   	else if(num == 3){
	   		if(this.lastLetterDrawn.localeCompare("c") == 0){}
	   		else{		
		   		this.drawQuarterNote("t", "c");
		   		this.lastLetterDrawn = "c";
		   		newLetter++;
	   		}
	   	}
	   	else if(num == 4){
	   		if(this.lastLetterDrawn.localeCompare("e") == 0){}
	   		else{		
		   		this.drawQuarterNote("t", "e");
		   		this.lastLetterDrawn = "e";
		   		newLetter++;
	   		}
	   	}
	   	else if(num == 5){
	   		if(this.lastLetterDrawn.localeCompare("g") == 0){}
	   		else{		
		   		this.drawQuarterNote("t", "g");
		   		this.lastLetterDrawn = "g";
		   		newLetter++;
	   		}
	   	}
	   	else if(num == 6){
	   		if(this.lastLetterDrawn.localeCompare("b") == 0){}
	   		else{		
		   		this.drawQuarterNote("t", "b");
		   		this.lastLetterDrawn = "b";
		   		newLetter++;
	   		}
	   	}
	   	else if(num == 7){
	   		if(this.lastLetterDrawn.localeCompare("d") == 0){}
	   		else{		
		   		this.drawQuarterNote("t", "d");
		   		this.lastLetterDrawn = "d";
		   		newLetter++;
	   		}
	   	}
   	}
   	newLetter++;
   	return 0;
   }

   drawNote(clef: string, note:string, noteType: HTMLImageElement){
     if (clef.localeCompare("t") == 0) {
     	if (note.localeCompare("f") == 0) {
         this.c.drawImage(noteType, this.canvas.width/2 - 15, 8 + this.staffPos * this.lineWidth, 50, 50);
       }
       	else if(note.localeCompare("a") == 0){
         this.c.drawImage(noteType, this.canvas.width/2 - 15, -6 + this.staffPos * this.lineWidth, 50, 50);
       }
       	else if(note.localeCompare("c") == 0){
         this.c.drawImage(noteType, this.canvas.width/2 - 15, -20 + this.staffPos * this.lineWidth, 50, 50);
       }
       	else if(note.localeCompare("e") == 0){
         this.c.drawImage(noteType, this.canvas.width/2 - 15, -34 + this.staffPos * this.lineWidth, 50, 50);
       }
     	else if(note.localeCompare("g") == 0){
         this.c.drawImage(noteType, this.canvas.width/2 - 15, 0 + this.staffPos * this.lineWidth, 50, 50);
     	}
     	else if(note.localeCompare("b") == 0){
         this.c.drawImage(noteType, this.canvas.width/2 - 15, -14 + this.staffPos * this.lineWidth, 50, 50);
     	}
     	else if(note.localeCompare("d") == 0){
         this.c.drawImage(noteType, this.canvas.width/2 - 15, -28 + this.staffPos * this.lineWidth, 50, 50);
     	}
 	}
 	else if(clef.localeCompare("ot") == 0){
 		if(note.localeCompare("e") == 0){
         this.c.drawImage(noteType, this.canvas.width/2 - 15, 15 + this.staffPos * this.lineWidth, 50, 50);
     	}
     	else if (note.localeCompare("f") == 0) {
         this.c.drawImage(noteType, this.canvas.width/2 - 15, -42 + this.staffPos * this.lineWidth, 50, 50);
       }
 	}
 	else if(clef.localeCompare("b") == 0){
 		if (note.localeCompare("a") == 0) {
         this.c.drawImage(noteType, this.canvas.width/2 - 15, 106 + this.staffPos * this.lineWidth, 50, 50);
       }
       else if (note.localeCompare("c") == 0) {
         this.c.drawImage(noteType, this.canvas.width/2 - 15, 92 + this.staffPos * this.lineWidth, 50, 50);
       }
       else if (note.localeCompare("e") == 0) {
         this.c.drawImage(noteType, this.canvas.width/2 - 15, 78 + this.staffPos * this.lineWidth, 50, 50);
       }
       else if (note.localeCompare("g") == 0) {
         this.c.drawImage(noteType, this.canvas.width/2 - 15, 64 + this.staffPos * this.lineWidth, 50, 50);
       }
       else if (note.localeCompare("b") == 0) {
         this.c.drawImage(noteType, this.canvas.width/2 - 15, 98 + this.staffPos * this.lineWidth, 50, 50);
       }
       else if (note.localeCompare("d") == 0) {
         this.c.drawImage(noteType, this.canvas.width/2 - 15, 84 + this.staffPos * this.lineWidth, 50, 50);
       }
       else if (note.localeCompare("f") == 0) {
         this.c.drawImage(noteType, this.canvas.width/2 - 15, 70 + this.staffPos * this.lineWidth, 50, 50);
       }
 	}	
   }

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


*/
