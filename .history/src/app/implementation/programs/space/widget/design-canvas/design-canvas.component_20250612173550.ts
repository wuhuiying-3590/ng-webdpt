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
import { getComponentByType } from '../constants';
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
  getComponentByType = getComponentByType;
  needChangeTitlePosition = false;
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
    setData: (dataTransfer, dragEl) => {
      // console.log(dataTransfer, dragEl);
      const type = dragEl.getAttribute('data-type');
      // console.log(type);
      const { icon: imgSrc, name: componentName } =
        this.getComponentByType(type);
      let dragPreview = document.getElementById('custom-drag-preview');
      if (!dragPreview) {
        dragPreview = document.createElement('div');
        dragPreview.id = 'custom-drag-preview';
        const img = document.createElement('img');
        img.src = imgSrc;
        img.style.cssText = `
        width: 30px;
        height: 20px;
        margin-right: 8px;
      `;
        const text = document.createElement('span');
        text.textContent = componentName || '未知组件';
        text.style.cssText = `
        font-size: 12px;
        color: #3e59cc;
      `;
        dragPreview.appendChild(img);
        dragPreview.appendChild(text);
        document.body.appendChild(dragPreview);
      }
      // 确保 preview 被插入且有尺寸
      const rect = dragPreview.getBoundingClientRect();
      const offsetX = rect.width;
      const offsetY = rect.height;

      // 偏移控制：设置显示在鼠标右下角，例如右20、下20
      dataTransfer.setDragImage(dragPreview, -20, -20);
      // dataTransfer.setDragImage(dragPreview, -offsetX, -offsetY);
    },
    // 列表单元添加到本列表容器的回调函数
    onAdd: (evt) => {
      console.log('onAdd---rootSortableOptions', evt, this.treeData);
      const item = evt.item;
      // 确认是否是左侧拖拽过来的组件数据
      const componentType = item.getAttribute('data-component-type');
      if (componentType) {
        evt.to.removeChild(item);
        this.canvasDataService.removeSortableItem();
        const pId = evt.to.dataset.pId;
        const cIndex = evt.newIndex;
        console.log(pId, cIndex);
        this.canvasDataService.addComponent(componentType, pId, cIndex);
      }
    },
    onMove: (evt) => {
      const relatedEl = evt.related; // 当前 hover 的目标位置元素
      const componentType = relatedEl.getAttribute('data-type');
      const relatedIndex = [...evt.to.children].indexOf(relatedEl);
      // console.log(componentType, relatedEl, relatedIndex);
      // 如果想阻止拖到标题（index 0）前
      if (componentType === 'title' && relatedIndex === 0) {
        this.needChangeTitlePosition = true;
        return true; // 阻止拖拽
      }
      return true;
    },
    onEnd: (evt) => {
      console.log('onEnd---rootSortableOptions', evt);
      console.log(this.treeData);
      // 拖拽结束后清理 dragPreview
      const dragPreview = document.getElementById('custom-drag-preview');
      if (dragPreview) {
        dragPreview.remove(); // 或 document.body.removeChild(dragPreview);
      }
    },
  };
}
