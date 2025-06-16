import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
    private httpServerService: HttpServerService
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

  // 转换为可编辑组件的函数
  convertToEditableComponent(item, componentType) {
    const newComponent =
      this.canvasDataService.createNewComponent(componentType);
    // 清除原来的内容
    item = `
      <app-list-item
          class="root-child"
          [components]="[${newComponent}]"
          [style]="getComponentChildStyles(root)"
          [sortablejs]="[${newComponent}]"
          [sortablejsOptions]="sortablejsOptions"
          [attr.data-p-id]="${newComponent.id}"
        ></app-list-item>
    `;
    console.log(item);
  }
  sortableOptions = {
    group: {
      name: 'share',
      pull: true,
      put: true,
    },
    filter: '.no-drag',
    // 列表单元添加到本列表容器的回调函数
    onAdd: (evt) => {
      // console.log('onAdd', evt);
      // 获取拖拽过来的组件数据
      const item = evt.item;
      const componentType = item.getAttribute('data-component-type');
      console.log('onAdd', evt, componentType);

      // 移除SortableJS自动添加的DOM元素，因为我们将在Angular中通过treeData管理DOM
      // evt.to.removeChild(item);

      // 将拖入的组件添加到canvasDataService中，这将触发treeData的更新和Angular的渲染
      // this.canvasDataService.addComponent(componentType);
      // this.convertToEditableComponent(item, componentType); // 这行不再需要，因为我们不直接操作item
    },
    // 列表单元拖放结束后的回调函数
    onEnd: (evt) => {
      console.log('onEnd', evt);
      const { item, from, to, oldIndex, newIndex } = evt;
      this.canvasDataService.updateComponent(
        item.dataset.cId,
        from.dataset.pId,
        to.dataset.pId,
        oldIndex,
        newIndex
      );
    },
  };
}
