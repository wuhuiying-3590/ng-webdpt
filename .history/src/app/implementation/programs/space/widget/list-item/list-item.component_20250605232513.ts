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
    console.log(component);
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
  onMouseEnter(event: MouseEvent) {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    target.classList.add('hover');
  }

  onMouseLeave(event: MouseEvent) {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    target.classList.remove('hover');
  }
  ngOnInit(): void {}
}
