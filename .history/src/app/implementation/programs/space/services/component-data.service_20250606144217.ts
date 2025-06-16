import { Injectable } from '@angular/core';
import { ComponentType } from '../widget/models/item';
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
      // if (component.type === ComponentType.SINGLE_COLUMN) {
      //   result.columnGap = style.lineSpace;
      // } else if (
      //   component.type === ComponentType.SLOT ||
      //   component.type === ComponentType.ROOT ||
      //   component.type === ComponentType.LIST
      // ) {
      //   result.rowGap = style.lineSpace;
      // }
      result.gap = style.lineSpace;
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
