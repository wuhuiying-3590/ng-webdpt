import { Injectable, Renderer2, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CanvasDataService } from './canvas-data.service';
@Injectable({
  providedIn: 'root',
})
export class EditPopService implements OnDestroy {
  private dataSubscription: Subscription;
  constructor(
    private canvasDataService: CanvasDataService,
    private renderer: Renderer2
  ) {
    this.dataSubscription = this.canvasDataService.selectedComponent$.subscribe(
      (selected) => {
        // console.log('selectedroot:', selected);
        // 这里可以处理选中组件变化
        if (this.selectEl) {
          this.changeSelectBorderPosition();
        }
      }
    );
  }
  private selectElSubject = new BehaviorSubject<any>(null);
  selectElSubject$ = this.selectElSubject.asObservable();
  get selectEl() {
    return this.selectElSubject.value;
  }
  setSelectEl(selectEl: any) {
    this.selectElSubject.next(selectEl);
  }

  getOffsetRelativeToContainer(child: HTMLElement, container: HTMLElement) {
    const childRect = child.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    console.log(
      childRect,
      containerRect,
      container.scrollLeft,
      container.scrollTop
    );
    return {
      left: childRect.left - containerRect.left + container.scrollLeft,
      top: childRect.top - containerRect.top + container.scrollTop,
    };
  }
  changeSelectBorderPosition() {
    console.log(
      'changeSelectBorderPosition',
      this.selectEl,
      this.designCanvasRef.nativeElement
    );
    const element = this.selectEl;
    const { left, top } = this.getOffsetRelativeToContainer(
      this.selectEl,
      this.designCanvasRef.nativeElement
    );
    // 获取宽度和高度
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    const style = window.getComputedStyle(element);
    const borderRadius = style.borderRadius;

    console.log(width, height, left, top, borderRadius);
    this.renderer.setStyle(
      this.selectBoxRef.nativeElement,
      'width',
      width + 'px'
    );
    this.renderer.setStyle(
      this.selectBoxRef.nativeElement,
      'height',
      height + 'px'
    );
    this.renderer.setStyle(
      this.selectBoxRef.nativeElement,
      'borderRadius',
      borderRadius
    );
    this.renderer.setStyle(
      this.selectBoxRef.nativeElement,
      'transform',
      `translate3d(${left}px, ${top}px, 0px)`
    );
  }
  ngOnDestroy(): void {
    // 取消订阅防止内存泄漏
    this.dataSubscription?.unsubscribe();
  }
}
