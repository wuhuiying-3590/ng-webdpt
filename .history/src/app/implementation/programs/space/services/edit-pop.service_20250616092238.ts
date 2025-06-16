import {
  Injectable,
  Renderer2,
  RendererFactory2,
  OnDestroy,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CanvasDataService } from './canvas-data.service';
@Injectable({
  providedIn: 'root',
})
export class EditPopService implements OnDestroy {
  private renderer!: Renderer2;
  private selectElSubject = new BehaviorSubject<any>(null);
  selectElSubject$ = this.selectElSubject.asObservable();
  designCanvas = null;
  selectBox = null;
  constructor(
    private canvasDataService: CanvasDataService,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.canvasDataService.selectedComponent$.subscribe((selected) => {
      console.log('selected:', selected);
      // 这里可以处理选中组件变化
      if (!selected) {
        this.setSelectEl(null);
      }
    });
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
  setSelectBox(selectBox: HTMLElement) {
    this.selectBox = selectBox;
  }
  isElementInHorizontalView(container, element: HTMLElement) {
    const containerLeft = container.scrollLeft;
    const containerRight = containerLeft + container.clientWidth;

    const elementLeft = element.offsetLeft;
    const elementRight = elementLeft + element.offsetWidth;

    const isInView =
      elementRight > containerLeft && elementLeft < containerRight;
    // console.log('isInView', isInView);
    return isInView;
  }
  getOffsetRelativeToContainer(child: HTMLElement, container: HTMLElement) {
    const childRect = child.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    // console.log(
    //   childRect,
    //   containerRect,
    //   container.scrollLeft,
    //   container.scrollTop
    // );
    return {
      left: childRect.left - containerRect.left + container.scrollLeft,
      top: childRect.top - containerRect.top + container.scrollTop,
    };
  }
  changeSelectBorderPosition() {
    if (!this.selectEl) {
      return;
    }
    const element = this.selectEl;
    const { left, top } = this.getOffsetRelativeToContainer(
      this.selectEl,
      this.designCanvas
    );
    // console.log(left, top);
    // 获取宽度和高度
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    const style = window.getComputedStyle(element);
    const borderRadius = style.borderRadius;

    // console.log(width, height, left, top, borderRadius);
    this.renderer.setStyle(this.selectBox, 'width', width + 'px');
    this.renderer.setStyle(this.selectBox, 'height', height + 'px');
    // this.renderer.setStyle(this.selectEl, 'borderRadius', borderRadius);
    this.renderer.setStyle(
      this.selectBox,
      'transform',
      `translate3d(${left}px, ${top}px, 0px)`
    );
  }
  ngOnDestroy(): void {
    // 取消订阅防止内存泄漏
  }
}
