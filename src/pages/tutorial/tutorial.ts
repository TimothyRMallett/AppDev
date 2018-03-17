import { Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {

	@ViewChild('canvas') canvasEl: ElementRef;

	private _CANVAS: any;
	private _CONTEXT: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');

    this._CANVAS = this.canvasEl.nativeElement;
    this._CANVAS.width = 200;
    this._CANVAS.height = 200;


    this.initialiseCanvas();
    //this.drawCircle();

  }

  initialiseCanvas() : void
   {
      if(this._CANVAS.getContext)
      {
         this.setupCanvas();
      }
   }

   setupCanvas() : void
   {
      this._CONTEXT = this._CANVAS.getContext('2d');
      this._CONTEXT.fillStyle = "#3e3e3e";
      this._CONTEXT.fillRect(0, 0, 500, 500);
   }



}
