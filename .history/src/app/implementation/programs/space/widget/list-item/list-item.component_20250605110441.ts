import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { webStyleData } from '../design-canvas/webData';
import { ComponentType } from '../component-panel/component-panel.component';
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
  // Calculate styles for a component based on its style object
  getComponentStyles(component: any): any {
    const style = component.style || {};
    const result: any = {};

    // 背景类型：透明：transparent  或者 颜色:color  #222222 的颜色值
    if (style.backgroundType && style.backgroundType !== 'transparent') {
      result.backgroundColor = style.backgroundType;
    }

    // 行间距
    if (style.lineSpace) {
      if (component.type === ComponentType.SINGLE_COLUMN) {
        result.columnGap = style.lineSpace;
      } else if (component.type === ComponentType.SLOT) {
        result.rowGap = style.lineSpace;
      }
    }
    // 内边距
    if (style.internalSpace) {
      result.padding = style.internalSpace;
    }
    // 外框圆角
    if (style.borderRadius) {
      result.borderRadius = style.borderRadius;
    }

    if (style.positionX) {
      result.alignItems = 'flex-start';
    }

    if (style.positionY) {
      result.justifyContent = 'flex-start';
    }

    // Handle text styling
    if (style.color) {
      result.color = style.color;
    }

    if (style.fontWeight) {
      result.fontWeight = style.fontWeight;
    }

    if (style.fontSize) {
      result.fontSize = style.fontSize;
    }

    if (style.textAlign) {
      result.textAlign = style.textAlign;
    }

    return result;
  }
  ngOnInit(): void {
    this.treeData = webStyleData.treeData;
  }
}
