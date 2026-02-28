import { Component, Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators'

@Component({
  selector: 'app-canvas',
  templateUrl: './diagramming.component.html',
  styleUrls: ['./diagramming.component.css']
})
export class DiagrammingComponent implements AfterViewInit {

  @ViewChild('canvas') public canvas!: ElementRef;

  @Input() public width = 1000;
  @Input() public height = 1000;

  private cx: CanvasRenderingContext2D | null = null;
  public currentColor: string = '#000000'; //default color black
  //list of color options
  public colors: string[] = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF'];

  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    const innerDiagrammingBoxEl = document.querySelector('.innerDiagrammingBox') as HTMLElement;

    if (innerDiagrammingBoxEl) {
      const width = innerDiagrammingBoxEl.clientWidth;
      const height = innerDiagrammingBoxEl.clientHeight;

      canvasEl.width = width;  //set the canvas width from the innerDiagrammingBox size
      canvasEl.height = height;  //set the canvas height from the innerDiagrammingBox size
    }

    this.cx = canvasEl.getContext('2d');

    if (this.cx) {
      this.cx.lineWidth = 3;
      this.cx.lineCap = 'round';
      this.cx.strokeStyle = this.currentColor; //set initial pen color black

      this.captureEvents(canvasEl);
    }
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    fromEvent <MouseEvent>(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          return fromEvent <MouseEvent>(canvasEl, 'mousemove')
            .pipe(
              //stop (and unsubscribe) once the user releases the mouse, this will trigger a 'mouseup' event    
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              //also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              //pairwise gets the previous value to draw a line from the previous point to the current point    
              pairwise()
            )
        })
      )
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();

        //previous and current position with the offset
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };

        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
    if (!this.cx) { return; }

    this.cx.beginPath();
    this.cx.strokeStyle = this.currentColor;

    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y); //from
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
  }

  public changeColor(color: string): void {
    this.currentColor = color;
  }

  public clearCanvas() {
    const canvasEl = this.canvas.nativeElement;  
    const context = canvasEl.getContext('2d');   

    if (context) {
      context.clearRect(0, 0, canvasEl.width, canvasEl.height);  //clear the canvas
    }
  }
}
