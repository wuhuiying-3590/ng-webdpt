import { Component, OnInit } from '@angular/core';
import { webStyleData } from '../design-canvas/webData';
@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.less'],
})
export class ListItemComponent implements OnInit {
  treeData: any[] = [];
  constructor() {}
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
        this.components.push({ ...component, id: Date.now() });
      }
    }
  }
  // 处理组件在画布内部的排序
  onComponentDrop(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this.components, event.previousIndex, event.currentIndex);
  }
  // 选择组件
  selectComponentItem(component: any): void {
    this.selectComponent.emit(component);
  }

  // 删除组件
  removeComponent(index: number): void {
    this.components.splice(index, 1);
  }
  ngOnInit(): void {
    this.treeData = webStyleData.treeData;
  }
}
