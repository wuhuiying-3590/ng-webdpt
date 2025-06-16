import { Injectable, Renderer2, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CanvasDataService } from './canvas-data.service';
@Injectable({
  providedIn: 'root',
})
export class EditPopService implements OnDestroy {
  private renderer!: Renderer2;
  private selectElSubject = new BehaviorSubject<any>(null);
  selectElSubject$ = this.selectElSubject.asObservable();
  private dataSubscription: Subscription;
  designCanvas = null;
  constructor(private canvasDataService: CanvasDataService) {
    // this.dataSubscription = this.selectElSubject.subscribe((selectEl) => {
    //   console.log('selectElSubject:', selectEl);
    //   // 这里可以处理选中组件变化
    //   if (selectEl) {
    //     this.changeSelectBorderPosition();
    //   }
    // });
  }

  get selectEl() {
    return this.selectElSubject.value;
  }
  setSelectEl(selectEl: HTMLElement) {
    this.selectElSubject.next(selectEl);
  }
  setDesignCanvas(designCanvas: HTMLElement) {
    this.designCanvas = designCanvas;
  }
  getOffsetRelativeToContainer(child: HTMLElement, container: HTMLElement) {
    // const childRect = child.getBoundingClientRect();
    // const containerRect = container.getBoundingClientRect();
    // console.log(
    //   childRect,
    //   containerRect,
    //   container.scrollLeft,
    //   container.scrollTop
    // );
    // return {
    //   left: childRect.left - containerRect.left + container.scrollLeft,
    //   top: childRect.top - containerRect.top + container.scrollTop,
    // };
  }
  changeSelectBorderPosition() {
    console.log('changeSelectBorderPosition', this.selectEl, this.designCanvas);
    // const element = this.selectEl;
    // const { left, top } = this.getOffsetRelativeToContainer(
    //   this.selectEl,
    //   this.designCanvas
    // );
    // // 获取宽度和高度
    // const width = element.offsetWidth;
    // const height = element.offsetHeight;
    // const style = window.getComputedStyle(element);
    // const borderRadius = style.borderRadius;

    // console.log(width, height, left, top, borderRadius);
    // this.renderer.setStyle(this.selectEl, 'width', width + 'px');
    // this.renderer.setStyle(this.selectEl, 'height', height + 'px');
    // // this.renderer.setStyle(this.selectEl, 'borderRadius', borderRadius);
    // this.renderer.setStyle(
    //   this.selectEl,
    //   'transform',
    //   `translate3d(${left}px, ${top}px, 0px)`
    // );
  }
  ngOnDestroy(): void {
    // 取消订阅防止内存泄漏
    this.dataSubscription?.unsubscribe();
  }
}
