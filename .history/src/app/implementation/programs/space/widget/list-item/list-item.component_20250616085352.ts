import {
  Component,
  OnInit,
  Input,
  ViewContainerRef,
  ComponentRef,
  ChangeDetectorRef,
} from '@angular/core';
import { ComponentDataService } from '../../services/component-data.service';
import { CanvasDataService } from '../../services/canvas-data.service';
import { EditPopService } from '../../services/edit-pop.service';
import {
  Overlay,
  OverlayRef,
  OverlayPositionBuilder,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { EditPopComponent } from '../edit-pop/edit-pop.component';
// import { getComponentByType } from '../constants';
@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.less'],
})
export class ListItemComponent implements OnInit {
  @Input() components: any[] = [];
  @Input() componentSortablejsOptions: any = {};
  selectedComponent: any = null; // 新增
  hoverComponentStack: any[] = [];
  private overlayRef: OverlayRef | null = null;
  // getComponentByType = getComponentByType;
  constructor(
    private componentDataService: ComponentDataService,
    private canvasDataService: CanvasDataService,
    private editPopService: EditPopService,
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private vcr: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) {}
  closeEditPop() {
    console.log('closeEditPop', this.overlayRef);
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
  showEditPop(event: MouseEvent, slotElement: HTMLElement, component: any) {
    // 先关闭已有的 overlay
    this.closeEditPop();
    console.log('showEditPop', component);
    // 创建定位策略
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(slotElement)
      .withPositions([
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'top',
          offsetY: -40, // 如果你想悬浮在上方
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });
    console.log('overlayRef', this.overlayRef);
    const portal = new ComponentPortal(EditPopComponent, this.vcr);
    const componentRef: ComponentRef<EditPopComponent> =
      this.overlayRef.attach(portal);

    // 绑定事件
    componentRef.instance.add.subscribe(() => {
      // 你的 add 逻辑
      this.closeEditPop();
    });
    componentRef.instance.remove.subscribe(() => {
      // 你的 remove 逻辑
      this.removeComponent();
      this.closeEditPop();
    });
  }

  // 选择组件
  selectComponentItem(
    event: MouseEvent,
    component: any,
    selectEl: HTMLElement
  ): void {
    // console.log(component);
    // 阻止事件冒泡
    event.stopPropagation();
    if (
      !this.selectedComponent ||
      this.selectedComponent?.id !== component.id
    ) {
      this.selectedComponent = component; // 记录当前选中
      this.editPopService.setSelectEl(selectEl);
      this.canvasDataService.setSelectedComponent(component);
    }
  }

  isSelected(component: any): boolean {
    return (
      this.selectedComponent && this.selectedComponent?.id === component?.id
    );
  }
  isEmpty(component): boolean {
    return !component?.children || component?.children?.length === 0;
  }
  // 复制选中组件
  cloneComponent(): void {
    this.canvasDataService.cloneComponent();
  }
  // 删除选中组件
  removeComponent(): void {
    this.canvasDataService.removeComponent();
  }
  // 获取组件样式
  getComponentStyles(component: any): any {
    return this.componentDataService.getComponentStyles(component);
  }

  getComponentChildStyles(component: any): any {
    return this.componentDataService.getComponentChildStyles(component);
  }
  onMouseEnter(event: MouseEvent, component: any) {
    // console.log('onMouseEnter', component);
    event.stopPropagation();
    if (event.target === event.currentTarget) {
      this.hoverComponentStack.push(component);
      this.canvasDataService.setHoverComponent(this.hoverComponentStack);
    }
  }

  onMouseLeave(event: MouseEvent, component: any) {
    // console.log('onMouseLeave', component, event);
    event.stopPropagation();
    if (event.target === event.currentTarget) {
      const idx = this.hoverComponentStack.indexOf(component);
      if (idx !== -1) {
        this.hoverComponentStack.splice(idx, 1);
        this.canvasDataService.setHoverComponent(this.hoverComponentStack);
      }
    }
  }
  isHover(component: any): boolean {
    const top =
      this.hoverComponentStack[this.hoverComponentStack.length - 1] || null;
    return top === component;
  }
  ngOnInit(): void {
    this.canvasDataService.selectedComponent$.subscribe((selected) => {
      // console.log('selected:', selected);
      // 这里可以处理选中组件变化
      this.selectedComponent = selected;
    });
    this.canvasDataService.hoverComponent$.subscribe((hover) => {
      // console.log('hover:', hover);
      this.hoverComponentStack = hover || [];
    });
  }
  onScroll(event: MouseEvent) {
    const target = event.target;
    const select = this.editPopService.selectEl;
    if (select) {
      const selectParentNode = select.parentNode;
      // console.log(target === selectParentNode);
      if (target === selectParentNode) {
        const isInView = this.editPopService.isElementInHorizontalView(
          target,
          select
        );
        const selectBox = this.editPopService.selectBox;
        !isInView
          ? selectBox.classList.add('hidePop')
          : selectBox.classList.remove('hidePop');
        this.editPopService.changeSelectBorderPosition();
      }
    }
  }
  createObserver(slotElement: HTMLElement, scrollElem: HTMLElement) {
    const observer = new IntersectionObserver(
      (entries) => {
        // console.log(entries);
        this.cdr.detectChanges();
      },
      { root: scrollElem }
    );
    observer.observe(slotElement);
  }
  getEditPopStyles(slotElement: HTMLElement) {
    const rect = slotElement.getBoundingClientRect();
    return {
      position: 'fixed',
      left: rect.left + rect.width - 64 + 'px',
      top: rect.top - 40 + 'px',
    };
  }
}
