import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagrammingComponent } from './diagramming.component';

describe('DiagrammingComponent', () => {
  let component: DiagrammingComponent;
  let fixture: ComponentFixture<DiagrammingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagrammingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagrammingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialise canvas with correct context and properties', () => {
    const canvasEl = fixture.nativeElement.querySelector('canvas');
    expect(canvasEl).toBeTruthy();
    
    const ctxSpy = jasmine.createSpyObj('CanvasRenderingContext2D', ['beginPath', 'moveTo', 'lineTo', 'stroke']); //spy on getContext
    spyOn(canvasEl, 'getContext').and.returnValue(ctxSpy);

    component.ngAfterViewInit();

    expect(canvasEl.width).toBeGreaterThan(0);
    expect(canvasEl.height).toBeGreaterThan(0);
    expect(component['cx']).toBe(ctxSpy);
    expect(component['cx']?.lineWidth).toBe(3);
    expect(component['cx']?.lineCap).toBe('round');
    expect(component['cx']?.strokeStyle).toBe('#000000');
  });

  it('should change the current color', () => {
    component.changeColor('#FF0000');
    expect(component.currentColor).toBe('#FF0000');
  });

  it('should clear the canvas', () => {
    const canvasEl = fixture.nativeElement.querySelector('canvas');
    const ctxSpy = jasmine.createSpyObj('CanvasRenderingContext2D', ['clearRect']);
    spyOn(canvasEl, 'getContext').and.returnValue(ctxSpy);

    component.clearCanvas();
    expect(ctxSpy.clearRect).toHaveBeenCalledWith(0, 0, canvasEl.width, canvasEl.height);
  });

  it('should call drawOnCanvas() on mouse events', () => {
    const canvasEl: HTMLCanvasElement = fixture.nativeElement.querySelector('canvas');
    const drawSpy = spyOn<any>(component, 'drawOnCanvas'); //spy on the method before triggering events

    component.ngAfterViewInit();
    fixture.detectChanges();

    canvasEl.dispatchEvent(new MouseEvent('mousedown', { clientX: 10, clientY: 10 })); //mouse movement simulation
    canvasEl.dispatchEvent(new MouseEvent('mousemove', { clientX: 15, clientY: 15 }));
    canvasEl.dispatchEvent(new MouseEvent('mousemove', { clientX: 20, clientY: 20 }));
    canvasEl.dispatchEvent(new MouseEvent('mouseup'));

    expect(drawSpy).toHaveBeenCalled(); //should be called
  });

  it('should set canvas width and height from innerDiagrammingBox', () => {
    const innerBox = fixture.nativeElement.querySelector('.innerDiagrammingBox');

    spyOnProperty(innerBox, 'clientWidth', 'get').and.returnValue(500); //make element report sizes
    spyOnProperty(innerBox, 'clientHeight', 'get').and.returnValue(400);
    component.ngAfterViewInit();
    fixture.detectChanges();

    const canvasEl = fixture.nativeElement.querySelector('canvas');
    expect(canvasEl.width).toBe(500);
    expect(canvasEl.height).toBe(400);
  });
});
