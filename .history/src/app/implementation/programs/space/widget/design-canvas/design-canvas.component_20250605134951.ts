import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { webStyleData } from './webData';
import { CanvasDataService } from '../../services/canvas-data.service';
import { ComponentDataService } from '../../services/component-data.service';
@Component({
  selector: 'app-design-canvas',
  templateUrl: './design-canvas.component.html',
  styleUrls: ['./design-canvas.component.less'],
})
export class DesignCanvasComponent implements OnInit {
  @Input() components: any[] = [];
  @Output() selectComponent = new EventEmitter<any>();
  root = {};
  treeData: any[] = [];
  constructor(
    private canvasDataService: CanvasDataService,
    private componentDataService: ComponentDataService
  ) {}
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
  // 获取组件样式
  getComponentStyles(component: any): any {
    return this.componentDataService.getComponentStyles(component);
  }
  // 允许拖放
  onDragOver(event: DragEvent): void {
    event.preventDefault();
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
    console.log(webStyleData);
    this.root = webStyleData.root;
    this.treeData = webStyleData.treeData;
  }
}
