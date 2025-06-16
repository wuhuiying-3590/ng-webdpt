import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CanvasDataService } from '../../services/canvas-data.service';
import { ComponentDataService } from '../../services/component-data.service';
import { EditPopService } from '../../services/edit-pop.service';
import { ListItemComponent } from '../list-item/list-item.component';
import { getComponentByType } from '../constants';
@Component({
  selector: 'app-design-canvas',
  templateUrl: './design-canvas.component.html',
  styleUrls: ['./design-canvas.component.less'],
})
export class DesignCanvasComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('listItem') listItemComponent: ListItemComponent;
  @ViewChild('designCanvas') designCanvasRef: ElementRef;
  selectedComponent: any = null; // 新增
  @Input() root: any = {};
  @Input() treeData: any[] = [];
  getComponentByType = getComponentByType;
  constructor(
    private canvasDataService: CanvasDataService,
    private componentDataService: ComponentDataService,
    private editPopService: EditPopService
  ) {}
  ngAfterViewInit(): void {
    // 这里可以安全访问 @ViewChild 获取到的 DOM 元素*
    // console.log(this.designCanvasRef);
    this.editPopService.setDesignCanvas(this.designCanvasRef.nativeElement);
    // this.editPopService.setSelectBox(this.selectBoxRef.nativeElement);
  }

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
      this.editPopService.setSelectEl(null);
      this.canvasDataService.setSelectedComponent(component);
    }
  }
  isSelected(component: any): boolean {
    return (
      this.selectedComponent && this.selectedComponent?.id === component?.id
    );
  }
  showRemove = false;
  showCopy = false;
  evaluateShowRemove() {
    if (this.editPopService.selectEl) {
      // console.log(this.editPopService.selectEl);
      // console.log(
      //   this.editPopService.selectEl.classList.contains('slot-component')
      // );
      const isSlot =
        this.editPopService.selectEl.classList.contains('slot-component');
      if (isSlot) {
        const parentNode = this.editPopService.selectEl.parentNode;
        const childrenLength = Array.from(parentNode.children).length;
        this.showRemove = childrenLength > 1;
      } else {
        this.showRemove = true;
      }
    } else {
      this.showRemove = false;
    }
  }
  evaluateShowCopy() {
    if (this.editPopService.selectEl) {
      const isTitle =
        this.editPopService.selectEl.classList.contains('title-component');
      if (isTitle) {
        this.showCopy = false;
      } else {
        const parentNode = this.editPopService.selectEl.parentNode;
        const childrenLength = Array.from(parentNode.children).length;
        const parentClassNames = parentNode.className;
        console.log('parentClassNames', parentClassNames);
        if (
          parentClassNames.includes('columnLayout-child') ||
          parentClassNames.includes('columnLayout1_1_1-child')
        ) {
          this.showCopy = childrenLength < 6;
        } else if (
          parentClassNames.includes('scrollLayout-child') ||
          parentClassNames.includes('listLayout-child')
        ) {
          this.showCopy = childrenLength < 20;
        } else {
          this.showCopy = true;
        }
      }
    } else {
      this.showCopy = false;
    }
  }
  cloneComponent(): void {
    this.canvasDataService.cloneComponent();
    setTimeout(() => {
      this.editPopService.changeSelectBorderPosition();
      this.evaluateShowCopy();
      this.evaluateShowRemove();
    }, 0);
  }
  // 删除选中组件
  removeComponent(): void {
    // this.showRemove();
    this.canvasDataService.removeComponent();
    setTimeout(() => {
      this.editPopService.changeSelectBorderPosition();
      this.evaluateShowCopy();
      this.evaluateShowRemove();
    }, 0);
  }
  ngOnInit(): void {
    console.log('ngOnInit');
    this.canvasDataService.selectedComponent$.subscribe((selected) => {
      console.log('selectedroot:', selected);
      // 这里可以处理选中组件变化
      this.selectedComponent = selected;
      // this.evaluateShowRemove();
      // this.evaluateShowCopy();
    });
  }
  ngOnDestroy(): void {
    this.canvasDataService.setSelectedComponent(null);
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
    fallbackOnBody: true,
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
        // console.log(pId, cIndex);
        this.canvasDataService.addComponent(componentType, pId, cIndex);
      }
    },
    onMove: (evt) => {
      const relatedEl = evt.related; // 当前 hover 的目标位置元素
      const componentType = relatedEl.getAttribute('data-type');
      const relatedIndex = [...evt.to.children].indexOf(relatedEl);
      console.log(componentType, relatedIndex);
      // 如果想阻止拖到标题（index 0）前
      if (componentType === 'title' && relatedIndex === 0) {
        this.canvasDataService.setNeedChangeTitlePosition(true);
        return true; // 阻止拖拽
      }
      return true;
    },
    onEnd: (evt) => {
      console.log('onEnd---rootSortableOptions', evt);
      if (this.canvasDataService.needChangeTitlePosition) {
        const pId = evt.from.dataset.pId;
        const cIndex = evt.oldIndex;
        evt.to.removeChild(evt.item);
        this.canvasDataService.changeTitlePosition(pId, cIndex);
        this.canvasDataService.setNeedChangeTitlePosition(false);
      }
      // 拖拽结束后清理 dragPreview
      const dragPreview = document.getElementById('custom-drag-preview');
      if (dragPreview) {
        dragPreview.remove(); // 或 document.body.removeChild(dragPreview);
      }
    },
  };
}
