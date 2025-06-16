import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { webStyleData } from '../design-canvas/webData';
import { ComponentUtilsService } from '../../../../../utils/component-utils.service';
@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.less'],
})
export class ListItemComponent implements OnInit {
  @Input() components: any[] = [];
  constructor(private componentUtilsService: ComponentUtilsService) {}
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
  selectComponentItem(component: any): void {
    // this.selectComponent.emit(component);
  }

  // 删除组件
  removeComponent(index: number): void {
    // this.components.splice(index, 1);
  }
  // 获取组件样式
  getComponentStyles(component: any): any {
    return this.componentUtilsService.getComponentStyles(component);
  }
  ngOnInit(): void {}
}
