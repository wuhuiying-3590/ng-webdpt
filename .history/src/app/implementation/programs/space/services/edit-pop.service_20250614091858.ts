import { Injectable } from '@angular/core';
import { CanvasDataService } from './canvas-data.service';
@Injectable({
  providedIn: 'root',
})
export class EditPopService {
  constructor(private canvasDataService: CanvasDataService) {}
  selectEl = null;
  setSelectEl(selectEl) {
    this.selectEl = selectEl;
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
    const element = this.canvasDataService.selectEl;
    const { left, top } = this.getOffsetRelativeToContainer(
      this.canvasDataService.selectEl,
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
}
