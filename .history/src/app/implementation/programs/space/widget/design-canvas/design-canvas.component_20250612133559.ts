import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { CanvasDataService } from '../../services/canvas-data.service';
import { ComponentDataService } from '../../services/component-data.service';
import { ListItemComponent } from '../list-item/list-item.component';
import { componentList } from '../constants';
@Component({
  selector: 'app-design-canvas',
  templateUrl: './design-canvas.component.html',
  styleUrls: ['./design-canvas.component.less'],
})
export class DesignCanvasComponent implements OnInit {
  @ViewChild('listItem') listItemComponent: ListItemComponent;
  selectedComponent: any = null; // 新增
  @Input() root: any = {};
  @Input() treeData: any[] = [];
  customDragEl: HTMLElement | null = null; // 自定义拖拽元素
  constructor(
    private canvasDataService: CanvasDataService,
    private componentDataService: ComponentDataService,
    private cdr: ChangeDetectorRef
  ) {}

  // 获取组件样式
  getComponentStyles(component: any): any {
    return this.componentDataService.getComponentStyles(component);
  }
  getComponentChildStyles(component: any): any {
    return this.componentDataService.getComponentChildStyles(component);
  }

  // 选择组件
  selectComponentItem(event: MouseEvent, component: any): void {
    // 阻止事件冒泡
    event.stopPropagation();
    if (
      !this.selectedComponent ||
      this.selectedComponent?.id !== component.id
    ) {
      // this.listItemComponent.closeEditPop();
      this.selectedComponent = component; // 记录当前选中
      this.canvasDataService.setSelectedComponent(component);
    }
  }
  isSelected(component: any): boolean {
    return (
      this.selectedComponent && this.selectedComponent?.id === component?.id
    );
  }

  ngOnInit(): void {
    this.canvasDataService.selectedComponent$.subscribe((selected) => {
      // console.log('selectedroot:', selected);
      // 这里可以处理选中组件变化
      this.selectedComponent = selected;
    });
  }

  rootSortableOptions = {
    group: {
      name: 'share',
      pull: true, // 列表容器内的列表单元(单列、多列...)可以被移出
      put: true, // 列表容器可以从其他列表容器内放入列表单元；
    },
    sort: true, // 列表单元可以在列表容器内进行拖拽排序
    filter: '.no-drag',
    ghostClass: 'sortable-ghost',
    dragClass: 'sortable-drag',
    // 列表单元添加到本列表容器的回调函数
    onAdd: (evt) => {
      console.log('onAdd---rootSortableOptions', evt, this.treeData);
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
      console.log('onStart---rootSortableOptions');
      const originalItem = evt.item;
      return;
      const componentName = originalItem.textContent.trim(); // 获取组件文本
      const componentType = originalItem.getAttribute('data-component-type');
      const imgSrc = componentList.find((el) => el.type === componentType).icon; // 默认图片

      this.customDragEl = document.createElement('div');
      this.customDragEl.style.cssText = `
        position: fixed;
        pointer-events: none; /* 确保不影响鼠标事件 */
        display: flex;
        align-items: center;
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid #ddd;
        padding: 5px 10px;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        z-index: 9999;
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

      document.body.appendChild(this.customDragEl);

      // 初始位置
      this.customDragEl.style.left = evt.originalEvent.clientX + 'px';
      this.customDragEl.style.top = evt.originalEvent.clientY + 'px';
    },
    onMove: (evt) => {
      console.log(evt);
      console.log(evt.draggedRect, evt.relatedRect);
      // this.customDragEl.style.left = evt.originalEvent.clientX + 'px';
      // this.customDragEl.style.top = evt.originalEvent.clientY + 'px';
    },
    onEnd: (evt) => {
      console.log('onEnd---rootSortableOptions');
      if (this.customDragEl && document.body.contains(this.customDragEl)) {
        document.body.removeChild(this.customDragEl);
        this.customDragEl = null;
      }
    },
  };
}
