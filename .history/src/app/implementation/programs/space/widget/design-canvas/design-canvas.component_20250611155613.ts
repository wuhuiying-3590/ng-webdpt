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
      pull: true, // 这个列表容器移动出去的设置
      put: true,
    },
    filter: '.no-drag',
    ghostClass: 'sortable-ghost',
    dragClass: 'sortable-drag',
    // 列表单元添加到本列表容器的回调函数
    onAdd: (evt) => {
      console.log('onAdd---rootSortableOptions', this.treeData);
      // 获取拖拽过来的组件数据
      const item = evt.item;
      const componentType = item.getAttribute('data-component-type');
      // 确认是否是左侧拖拽过来的组件数据
      if (componentType) {
        // console.log('onAdd', evt, componentType);
        // 移除SortableJS自动添加的DOM元素，因为我们将在Angular中通过treeData管理DOM
        evt.to.removeChild(item);
        this.canvasDataService.removeSortableItem();
        // 将拖入的组件添加到canvasDataService中，这将触发treeData的更新和Angular的渲染
        const pId = evt.to.dataset.pId;
        const cIndex = evt.newIndex;
        this.canvasDataService.addComponent(componentType, pId, cIndex);
      }
    },
    // onMove: (evt) => {
    //   console.log('onMove', evt);
    //   return true;
    // },
    // 列表单元拖放结束后的回调函数
    onEnd: (evt) => {
      console.log('onEnd', evt, this.treeData);
      // this.cdr.markForCheck();
      // this.cdr.detectChanges();
      // 数据已经是调整嵌套顺序后的
      // const { item, from, to, oldIndex, newIndex } = evt;
      // this.canvasDataService.updateComponent(
      //   item.dataset.cId,
      //   from.dataset.pId,
      //   to.dataset.pId,
      //   oldIndex,
      //   newIndex
      // );
    },
  };
  emptySortableOptions = {
    group: {
      name: 'share',
      pull: false,
      put: true,
    },
    onAdd: (evt) => {
      // 获取拖拽过来的组件数据
      const item = evt.item;
      const componentType = item.getAttribute('data-component-type');
      this.canvasDataService.addComponent(componentType, 'root');
    },
  };
}
