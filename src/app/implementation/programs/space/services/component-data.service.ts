import { Injectable } from '@angular/core';
import { ComponentType } from '../widget/models/item';
const HORIZONTAL_STYLE = {
  left: 'flex-start',
  middle: 'center',
  right: 'flex-end',
};
const VERTICAL_STYLE = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
};
const MARGIN_STYLE = {
  none: 0,
  small: 2,
  middle: 4,
  large: 6,
};
const FIXEDSIZE_STYLE = {
  large: 200,
  medium: 80,
  small: 40,
};
@Injectable({
  providedIn: 'root',
})
export class ComponentDataService {
  constructor() {}
  getComponentStyles(component: any): any {
    const style = component?.style || {};
    const result: any = {};

    // 背景类型：透明：transparent  或者 颜色:color  #222222 的颜色值
    if (style.backgroundType && style.backgroundType !== 'transparent') {
      result.backgroundColor = style.backgroundType;
    }
    // 内边距
    if (style.internalSpace) {
      result.padding = style.internalSpace;
    }
    // 外框圆角
    if (style.borderRadius) {
      result.borderRadius = style.borderRadius;
    }

    return result;
  }
  getComponentChildStyles(component: any): any {
    const style = component?.style || {};

    const result: any = {};

    // 行间距
    if (style.lineSpace) {
      result.gap = style.lineSpace;
    }
    //  水平对齐  left / middle / right
    if (style.positionX) {
      result.alignItems = HORIZONTAL_STYLE[style.positionX];
    }
    // 垂直对齐 top / center / bottom
    if (style.positionY) {
      result.justifyContent = VERTICAL_STYLE[style.positionY];
    }

    if (style.color) {
      if (component.type === ComponentType.DIVIDER) {
        result.border = `1px ${style.borderType} ${style.color}`;
      } else {
        result.color = style.color;
      }
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

    if (style.marginTop) {
      result.marginTop = MARGIN_STYLE[style.marginTop] + 'px';
    }

    if (style.marginBottom) {
      result.marginBottom = MARGIN_STYLE[style.marginBottom] + 'px';
    }

    if (style.mode) {
      if (style.mode === 'fixed') {
        if (style.fixedSize === 'customize') {
          result.width = style.customWidth + 'px';
          result.height = style.customHeight + 'px';
        } else {
          result.width = FIXEDSIZE_STYLE[style.fixedSize] + 'px';
          result.height = FIXEDSIZE_STYLE[style.fixedSize] + 'px';
        }
      }
    }
    if (style.width) {
      if (style.width === 'fixed') {
        result.width = style.widthPx + 'px';
      } else if (style.width === 'fill') {
        result.width = '100%';
      }
    }
    // if (component.type === 'image') {
    //   console.log(result);
    // }
    return result;
  }
}
