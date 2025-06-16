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
  none: '0px',
  small: '2px',
  middle: '4px',
  large: '6px',
};
const FIXEDSIZE_STYLE = {
  large: {
    with: '200px',
    height: '200px',
  },
  medium: {
    with: '80px',
    height: '80px',
  },
  small: '40px',
  customize: '124px',
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
    // //  水平对齐  left / middle / right
    // if (style.positionX) {
    //   result.alignItems = HORIZONTAL_STYLE[style.positionX];
    // }
    // // 垂直对齐 top / center / bottom
    // if (style.positionY) {
    //   result.justifyContent = VERTICAL_STYLE[style.positionY];
    // }

    // // Handle text styling
    // if (style.color) {
    //   if (component.type === ComponentType.DIVIDER) {
    //     result.border = `1px ${style.borderType} ${style.color}`;
    //   } else {
    //     result.color = style.color;
    //   }
    // }
    // if (style.marginTop) {
    //   result.marginTop = MARGIN_STYLE[style.marginTop];
    // }
    // if (style.marginBottom) {
    //   result.marginBottom = MARGIN_STYLE[style.marginBottom];
    // }

    // if (style.fontWeight) {
    //   result.fontWeight = style.fontWeight;
    // }

    // if (style.fontSize) {
    //   result.fontSize = style.fontSize;
    // }

    // if (style.textAlign) {
    //   result.textAlign = style.textAlign;
    // }

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

    // // Handle text styling
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
      result.marginTop = MARGIN_STYLE[style.marginTop];
    }

    if (style.marginBottom) {
      result.marginBottom = MARGIN_STYLE[style.marginBottom];
    }
    if (style.mode) {
      if (style.mode === 'fixed') {
        result.width = FIXEDSIZE_STYLE[style.fixedSize];
        result.height = FIXEDSIZE_STYLE[style.fixedSize];
      }
    }
    return result;
  }
}
