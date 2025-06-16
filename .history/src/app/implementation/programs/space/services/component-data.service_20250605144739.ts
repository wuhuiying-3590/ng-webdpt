import { Injectable } from '@angular/core';
// 组件类型枚举值

// eslint-disable-next-line no-shadow
export enum ComponentType {
  SINGLE_COLUMN = 'columnLayout', // 单列
  MULTI_COLUMN = 'columnLayout1_1_1', // 多列
  HORIZONTAL = 'scrollLayout', // 横向滑动
  LIST = 'listLayout', // 列表
  TITLE = 'title', // 标题
  CONTENT = 'text', // 内容
  DIVIDER = 'divider', // 分割线
  IMAGE = 'image', // 图片
  BUTTON = 'button', // 按钮
  TABLE = 'table', // 表格
  DYNAMIC_TABLE = 'dynamicTable', // 动态表格

  ROOT = 'root', // 根容器节点
  SLOT = 'slot', // 插槽   新增专用 其他人忽略
}
const horizontalStyle = {
  left: 'flex-start',
  middle: 'center',
  right: 'flex-end',
};
const verticalStyle = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
};
@Injectable({
  providedIn: 'root',
})
export class ComponentDataService {
  constructor() {}
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
      } else if (
        component.type === ComponentType.SLOT ||
        component.type === ComponentType.ROOT
      ) {
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
    //  水平对齐  left / middle / right
    if (style.positionX) {
      result.alignItems = horizontalStyle[style.positionX];
    }
    // 垂直对齐 top / center / bottom
    if (style.positionY) {
      result.justifyContent = verticalStyle[style.positionY];
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
}
