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
      this.removeComponent(component);
      this.closeEditPop();
    });
  }

  // 选择组件
  selectComponentItem(event: MouseEvent, component: any): void {
    // console.log(component);
    // 阻止事件冒泡
    event.stopPropagation();
    if (
      !this.selectedComponent ||
      this.selectedComponent?.id !== component.id
    ) {
      this.selectedComponent = component; // 记录当前选中
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
  // 复制组件
  cloneComponent(component, pId?: string) {
    // console.log('cloneComponent', pId);
    this.canvasDataService.cloneComponent(component, pId);
  }
  // 删除组件
  removeComponent(component): void {
    this.canvasDataService.removeComponent(component);
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
  // getCustomDrapData(componentType) {
  //   const curComponent = componentList.find((el) => el.type === componentType);
  //   const imgSrc = curComponent.icon; // 默认图片
  //   const componentName = curComponent.name;
  //   return { imgSrc, componentName };
  // }
  // componentSortablejsOptions = {
  //   group: {
  //     name: 'share',
  //     pull: true, // app-list-item内列表单元可以被移出
  //     put: true, // 列表容器不可以从其他列表容器内放入列表单元；
  //   },
  //   sort: true,
  //   filter: '.no-drag',
  //   ghostClass: 'sortable-ghost',
  //   dragClass: 'sortable-drag',
  //   setData: (dataTransfer, dragEl) => {
  //     // console.log(dataTransfer, dragEl);
  //     const type = dragEl.getAttribute('data-type');
  //     // console.log(type);
  //     const { icon: imgSrc, name: componentName } =
  //       this.getComponentByType(type);
  //     let dragPreview = document.getElementById('custom-drag-preview');
  //     if (!dragPreview) {
  //       dragPreview = document.createElement('div');
  //       dragPreview.id = 'custom-drag-preview';
  //       const img = document.createElement('img');
  //       img.src = imgSrc;
  //       img.style.cssText = `
  //       width: 30px;
  //       height: 20px;
  //       margin-right: 8px;
  //     `;
  //       const text = document.createElement('span');
  //       text.textContent = componentName || '未知组件';
  //       text.style.cssText = `
  //       font-size: 12px;
  //       color: #3e59cc;
  //     `;
  //       dragPreview.appendChild(img);
  //       dragPreview.appendChild(text);
  //       document.body.appendChild(dragPreview);
  //     }
  //     // 确保 preview 被插入且有尺寸
  //     const rect = dragPreview.getBoundingClientRect();
  //     const offsetX = rect.width;
  //     const offsetY = rect.height;

  //     // 偏移控制：设置显示在鼠标右下角，例如右20、下20
  //     // dataTransfer.setDragImage(dragPreview, -20, -20);
  //     dataTransfer.setDragImage(dragPreview, -offsetX, -offsetY);
  //   },
  //   onAdd: (evt) => {
  //     console.log('onAdd---componentSortablejsOptions');
  //     const item = evt.item;
  //     // 确认是否是左侧拖拽过来的组件数据
  //     const componentType = item.getAttribute('data-component-type');
  //     if (componentType) {
  //       evt.to.removeChild(item);
  //       this.canvasDataService.removeComponent();
  //       const pId = evt.to.dataset.pId;
  //       const cIndex = evt.newIndex;
  //       console.log(pId, cIndex);
  //       this.canvasDataService.addComponent(componentType, pId, cIndex);
  //     }
  //   },

  //   onEnd: (evt) => {
  //     console.log('onEnd---componentSortablejsOptions');
  //     // 拖拽结束后清理 dragPreview
  //     const dragPreview = document.getElementById('custom-drag-preview');
  //     if (dragPreview) {
  //       dragPreview.remove(); // 或 document.body.removeChild(dragPreview);
  //     }
  //   },
  // };
  SortablejsOptions = {
    group: {
      name: 'share',
      pull: false, // app-list-item内列表单元可以被移出
      put: false, // 列表容器不可以从其他列表容器内放入列表单元；
    },
    sort: false,
  };
}
