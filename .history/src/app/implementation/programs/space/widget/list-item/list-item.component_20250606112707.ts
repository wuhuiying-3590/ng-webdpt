import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ComponentDataService } from '../../services/component-data.service';
import { CanvasDataService } from '../../services/canvas-data.service';
@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.less'],
})
export class ListItemComponent implements OnInit {
  @Input() components: any[] = [];
  selectedComponent: any = null; // 新增
  hoverComponent: any = null;
  constructor(
    private componentDataService: ComponentDataService,
    private canvasDataService: CanvasDataService
  ) {}
  // 允许拖放
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }
  // 处理组件拖拽事件
  onDrop(event: DragEvent): void {
    event.preventDefault();

    if (event.dataTransfer) {
      const componentData = event.dataTransfer.getData('component');
      if (componentData) {
        const component = JSON.parse(componentData);
        // this.components.push({ ...component, id: Date.now() });
      }
    }
  }
  // 处理组件在画布内部的排序
  onComponentDrop(event: CdkDragDrop<any[]>): void {
    // moveItemInArray(this.components, event.previousIndex, event.currentIndex);
  }
  // 选择组件
  selectComponentItem(event: MouseEvent, component: any): void {
    // this.selectComponent.emit(component);
    // 阻止事件冒泡
    event.stopPropagation();
    this.selectedComponent = component; // 记录当前选中
    this.canvasDataService.setSelectedComponent(component);
  }

  isSelected(component: any): boolean {
    return this.selectedComponent === component;
  }
  // 删除组件
  removeComponent(index: number): void {
    // this.components.splice(index, 1);
  }
  // 获取组件样式
  getComponentStyles(component: any): any {
    return this.componentDataService.getComponentStyles(component);
  }
  onMouseEnter(event: MouseEvent, component: any) {
    console.log('onMouseEnter', component);
    event.stopPropagation();
    if (event.target === event.currentTarget) {
      this.hoverComponent = component;
      this.canvasDataService.setHoverComponent(component);
    }
  }

  onMouseLeave(event: MouseEvent, component: any) {
    console.log('onMouseLeave', component);
    event.stopPropagation();
    if (event.target === event.currentTarget) {
      // 判断鼠标是否还在父元素区域
      const parentElement = (event.currentTarget as HTMLElement).parentElement;
      console.log(parentElement);
      if (
        parentElement &&
        parentElement.contains(event.relatedTarget as Node)
      ) {
        // 鼠标还在父元素内，手动设置父元素为 hover
        // 你需要能拿到父组件的 component 数据
        // const parentComponent = this.getParentComponent(component);
        // if (parentComponent) {
        //   this.hoverComponent = parentComponent;
        //   this.canvasDataService.setHoverComponent(parentComponent);
        //   return;
        // }
      }
      // 否则正常清空
      this.hoverComponent = null;
      this.canvasDataService.setHoverComponent(null);
    }
  }
  isHover(component: any): boolean {
    return this.hoverComponent === component;
  }
  ngOnInit(): void {
    this.canvasDataService.selectedComponent$.subscribe((selected) => {
      // console.log('selected:', selected);
      // 这里可以处理选中组件变化
      this.selectedComponent = selected;
    });
    this.canvasDataService.hoverComponent$.subscribe((hover) => {
      // console.log('selected:', selected);
      // 这里可以处理选中组件变化
      this.hoverComponent = hover;
    });
  }
}
