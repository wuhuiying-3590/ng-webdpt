import * as uuid from 'uuid';
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
export class SLOT {
  id: string;
  type: string = 'slot';
  name: string = '插槽';
  style: any = {
    lineSpace: '4px',
    internalSpace: '2px',
    positionX: 'left',
    positionY: 'top',
  };
  children: any[];
  constructor(options?) {
    this.id = this.type + '-' + uuid.v4();
    this.children = [];
    if (options) {
      Object.assign(this, options);
      if (options.style) {
        this.style = { ...this.style, ...options.style };
      }
    }
  }
}

export class SINGLE_COLUMN {
  id: string;
  type: string = 'columnLayout';
  name: string = '单列';
  style: any = {
    backgroundType: 'transparent',
    lineSpace: '4px',
    internalSpace: '2px',
    borderRadius: '8px',
  };
  children: SLOT[];

  constructor(options?) {
    this.id = this.type + '-' + uuid.v4();
    this.children = [new SLOT()];
    if (options) {
      Object.assign(this, options);
      if (options.style) {
        this.style = { ...this.style, ...options.style };
      }
    }
  }
}

export class MULTI_COLUMN {
  id: string;
  type: string = 'columnLayout1_1_1';
  name: string = '多列组件';
  style: any = {
    backgroundType: 'transparent',
    lineSpace: '4px',
    internalSpace: '2px',
    borderRadius: '8px',
  };
  children: SLOT[];

  constructor(options?) {
    this.id = this.type + '-' + uuid.v4();
    this.children = [new SLOT(), new SLOT(), new SLOT()];
    if (options) {
      Object.assign(this, options);
      if (options.style) {
        this.style = { ...this.style, ...options.style };
      }
    }
  }
}
export class HORIZONTAL {
  id: string;
  type: string = 'scrollLayout';
  name: string = '横滑组件';
  style: any = {
    backgroundType: 'transparent',
    lineSpace: '4px',
    internalSpace: '2px',
    borderRadius: '8px',
  };
  children: SLOT[];

  constructor(options?) {
    this.id = this.type + '-' + uuid.v4();
    this.children = [new SLOT(), new SLOT(), new SLOT(), new SLOT()];
    if (options) {
      Object.assign(this, options);
      if (options.style) {
        this.style = { ...this.style, ...options.style };
      }
    }
  }
}
export class LIST {
  id: string;
  type: string = 'listLayout';
  name: string = '列表组件';
  style: any = {
    backgroundType: 'transparent',
    lineSpace: '4px',
    internalSpace: '2px',
    borderRadius: '8px',
  };
  children: SLOT[];

  constructor(options?) {
    this.id = this.type + '-' + uuid.v4();
    this.children = [new SLOT(), new SLOT(), new SLOT()];
    if (options) {
      Object.assign(this, options);
      if (options.style) {
        this.style = { ...this.style, ...options.style };
      }
    }
  }
}
export class TITLE {
  id: string;
  type: string = 'title';
  name: string = '标题';
  style: any = {
    content: '请输入标题',
    color: '#ed7d31',
    fontWeight: 'bold',
    fontSize: '22px',
    lines: 1,
    textAlign: 'left',
  };
  constructor(options?) {
    this.id = this.type + '-' + uuid.v4();
    if (options) {
      Object.assign(this, options);
      if (options.style) {
        this.style = { ...this.style, ...options.style };
      }
    }
  }
}
export class CONTENT {
  id: string;
  type: string = 'text';
  name: string = '文本内容组件';
  style: any = {
    color: '#000000',
    content: '请输入文本',
    cycleFlag: true,
    fontSize: '14px',
    fontWeight: 'normal',
    lines: 3,
    textAlign: 'left',
  };
  // 允许传入部分属性的配置对象
  constructor(options?) {
    this.id = this.type + '-' + uuid.v4();
    // 如果传入了配置对象
    if (options) {
      // 覆盖除style外的其他属性
      Object.assign(this, options);
      // 特殊处理style：合并而非替换
      if (options.style) {
        this.style = { ...this.style, ...options.style };
      }
    }
  }
}
export class DIVIDER {
  id: string;
  type: string = 'divider';
  name: string = '分割线组件';
  style: any = {
    color: '#d9d9d9',
    marginTop: 'none',
    marginBottom: 'none',
    borderType: 'solid',
  };
  constructor(options?) {
    this.id = this.type + '-' + uuid.v4();
    if (options) {
      Object.assign(this, options);
      if (options.style) {
        this.style = { ...this.style, ...options.style };
      }
    }
  }
}
export class IMAGE {
  id: string;
  type: string = 'image';
  name: string = '图片组件';
  style: any = {
    src: 'https://kai-wis-test.apps.digiwincloud.com.cn/assets/img/flow/custom-template/image-view.png',
    mode: 'fixed',
    fixedSize: 'large',
    customWidth: 420,
    customHeight: 800,
    cycleFlag: true,
  };
  constructor(options?) {
    this.id = this.type + '-' + uuid.v4();
    if (options) {
      Object.assign(this, options);
      if (options.style) {
        this.style = { ...this.style, ...options.style };
      }
    }
  }
}
export class BUTTON {
  id: string;
  type: string = 'button';
  name: string = '按钮组件';
  style: any = {
    content: '按钮',
    enableLines: false,
    size: 'small',
    actionType: 'execute_plugin_tools',
    backgroundColor: '#ffffff',
    color: '#000000',
    disabledAfterOperation: true,
    lines: 1,
    textAlign: 'center',
    type: 'primary',
    width: 'hug',
    widthPx: 420,
  };
  constructor(options?) {
    this.id = this.type + '-' + uuid.v4();
    if (options) {
      Object.assign(this, options);
      if (options.style) {
        this.style = { ...this.style, ...options.style };
      }
    }
  }
}
export const createNewItem = (type: string, options?) => {
  switch (type) {
    case ComponentType.SLOT:
      return new SLOT(options);
    case ComponentType.SINGLE_COLUMN:
      return new SINGLE_COLUMN(options);
    case ComponentType.MULTI_COLUMN:
      return new MULTI_COLUMN(options);
    case ComponentType.HORIZONTAL:
      return new HORIZONTAL(options);
    case ComponentType.LIST:
      return new LIST(options);
    case ComponentType.TITLE:
      return new TITLE(options);
    case ComponentType.CONTENT:
      return new CONTENT(options);
    case ComponentType.DIVIDER:
      return new DIVIDER(options);
    case ComponentType.IMAGE:
      return new IMAGE(options);
    case ComponentType.BUTTON:
      return new BUTTON(options);
    // 其他类型可以继续补充
    default:
      throw new Error('未知的组件类型: ' + type);
  }
};
