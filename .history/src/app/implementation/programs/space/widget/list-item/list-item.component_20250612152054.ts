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
import { componentList } from '../constants';
import { DIVIDER } from '../models/item';
@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.less'],
})
export class ListItemComponent implements OnInit {
  @Input() components: any[] = [];
  selectedComponent: any = null; // 新增
  hoverComponentStack: any[] = [];
  private overlayRef: OverlayRef | null = null;
  customDragEl: HTMLElement | null = null; // 自定义拖拽元素
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
  componentSortablejsOptions = {
    group: {
      name: 'share',
      pull: true, // app-list-item内列表单元可以被移出
      put: true, // 列表容器不可以从其他列表容器内放入列表单元；
    },
    sort: true,
    filter: '.no-drag',
    ghostClass: 'sortable-ghost',
    dragClass: 'sortable-drag',
    setData: function (dataTransfer, dragEl) {
      console.log(dataTransfer, dragEl);
      let dragPreview = document.getElementById('custom-drag-preview');
      if (!dragPreview) {
        dragPreview = document.createElement('div');
        dragPreview.id = 'custom-drag-preview';
        dragPreview.style.position = 'absolute';
        dragPreview.style.top = '-9999px'; // 放到屏幕外隐藏
        dragPreview.style.pointerEvents = 'none';
        dragPreview.style.padding = '10px';
        dragPreview.style.background = '#fff';
        dragPreview.style.border = '1px solid #ccc';
        dragPreview.style.borderRadius = '4px';
        dragPreview.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
        dragPreview.innerHTML = `
        <img src="https://via.placeholder.com/50" style="display:block;margin-bottom:5px;" />
        <div style="text-align:center;">拖拽中...</div>
      `;
        document.body.appendChild(dragPreview);
      }
      dataTransfer.setDragImage(aa, -20, -20);
    },
    onAdd: (evt) => {
      console.log('onAdd---componentSortablejsOptions');
      const item = evt.item;
      // 确认是否是左侧拖拽过来的组件数据
      const componentType = item.getAttribute('data-component-type');
      if (componentType) {
        evt.to.removeChild(item);
        this.canvasDataService.removeComponent();
        const pId = evt.to.dataset.pId;
        const cIndex = evt.newIndex;
        console.log(pId, cIndex);
        this.canvasDataService.addComponent(componentType, pId, cIndex);
      }
    },
    onStart: (evt) => {
      console.log('onStart---componentSortablejsOptions', evt);
      const originalItem = evt.item;
      const componentType = originalItem.getAttribute('data-type');
      const curComponent = componentList.find(
        (el) => el.type === componentType
      );
      const imgSrc = curComponent.icon; // 默认图片
      const componentName = curComponent.name;
      this.customDragEl = document.createElement('div');
      this.customDragEl.style.cssText = `
        position: absolute; /* 修改为 absolute */
        top: 0; /* 初始位置 */
        left: 0; /* 初始位置 */
        pointer-events: none; /* 确保不影响鼠标事件 */
        display: flex;
        align-items: center;
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid #4e6fff;
        padding: 5px 10px;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        z-index: 9999;
        opacity:0.8;
      `;

      const img = document.createElement('img');
      img.src = imgSrc;
      img.style.cssText = `
        width: 24px;
        height: 24px;
        margin-right: 8px;
      `;
      this.customDragEl.appendChild(img);
      const text = document.createElement('span');
      text.textContent = componentName || '未知组件';
      text.style.cssText = `
        font-size: 14px;
        color: #333;
      `;
      this.customDragEl.appendChild(text);

      // 确保 evt.item 具有定位上下文
      evt.clone.style.position = 'relative';
      // originalItem.appendChild(this.customDragEl);
      evt.clone.appendChild(this.customDragEl);
    },
    onMove: (evt) => {
      const dragEl = document.getElementsByClassName('sortable-drag')[0];
      console.log(dragEl);
      // console.log(evt);
      // console.log(evt.draggedRect, evt.relatedRect);
      // 移除原有的位置更新逻辑，因为 customDragEl 现在是 absolute 定位，跟随父元素
      // const width = Math.floor(this.customDragEl.offsetWidth / 2);
      // const height = Math.floor(this.customDragEl.offsetHeight / 2);
      // this.customDragEl.style.left = evt.originalEvent.pageX - width + 'px';
      // this.customDragEl.style.top = evt.originalEvent.pageY - height + 'px';
    },
    onEnd: (evt) => {
      console.log('onEnd---componentSortablejsOptions');
      if (this.customDragEl && evt.item.contains(this.customDragEl)) {
        evt.item.removeChild(this.customDragEl); // 从 evt.item 中移除
        this.customDragEl = null;
      }
      // 恢复 originalItem 的 position 样式，如果它之前不是 relative
      evt.item.style.position = ''; // 或者设置为原来的值
    },
  };
}
