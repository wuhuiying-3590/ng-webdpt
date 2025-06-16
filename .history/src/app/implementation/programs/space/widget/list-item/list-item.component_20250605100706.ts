import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { webStyleData } from '../design-canvas/webData';
@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.less'],
})
export class ListItemComponent implements OnInit {
  treeData: any[] = [];
  componentTypeMap = {
    title: '标题',
    text: '文本内容组件',
    divider: '分割线组件',
    button: '按钮组件',
    image: '图片组件',
    scrollLayout: '横滑组件',
    listLayout: '列表组件',
    columnLayout: '单列',
    columnLayout1_1_1: '多列组件',
    slot: '槽位',
  };
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
  ngOnInit(): void {
    this.treeData = webStyleData.treeData;
  }
}
