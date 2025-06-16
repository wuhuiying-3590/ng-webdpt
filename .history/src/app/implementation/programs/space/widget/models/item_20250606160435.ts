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
  };
  children: any[];
  constructor() {
    this.id = this.type + '-' + uuid.v4();
    this.children = [];
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

  constructor() {
    this.id = this.type + '-' + uuid.v4();
    this.children = [new SLOT()];
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

  constructor() {
    this.id = this.type + '-' + uuid.v4();
    this.children = [new SLOT(), new SLOT(), new SLOT()];
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

  constructor() {
    this.id = this.type + '-' + uuid.v4();
    this.children = [new SLOT(), new SLOT(), new SLOT(), new SLOT()];
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

  constructor() {
    this.id = this.type + '-' + uuid.v4();
    this.children = [new SLOT(), new SLOT(), new SLOT()];
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
  constructor() {
    this.id = this.type + '-' + uuid.v4();
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
  constructor() {
    this.id = this.type + '-' + uuid.v4();
  }
}
export class DIVIDER {
  id: string;
  type: string = 'divider';
  name: string = '分割线组件';
  style: any = {
    color: '#70ad47',
    marginTop: 'large',
    marginBottom: 'large',
    borderType: 'dotted',
  };
  constructor() {
    this.id = this.type + '-' + uuid.v4();
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
  constructor() {
    this.id = this.type + '-' + uuid.v4();
  }
}
export class BUTTON {
  id: string;
  type: string = 'button';
  name: string = '按钮组件';
  style: any = {
    content: '按钮',
    backgroundColor: '#ffffff',
    color: '#000000',
    type: 'warn',
    enableLines: false,
    lines: 1,
    disabledAfterOperation: true,
    actionType: 'execute_plugin_tools',
    size: 'small',
    width: 'fixed',
    widthPx: 420,
    textAlign: 'left',
  };
  constructor() {
    this.id = this.type + '-' + uuid.v4();
  }
}
export const createNewItem = (type: string) => {
  switch (type) {
    case ComponentType.SLOT:
      return new SLOT();
    case ComponentType.SINGLE_COLUMN:
      return new SINGLE_COLUMN();
    case ComponentType.MULTI_COLUMN:
      return new MULTI_COLUMN();
    case ComponentType.HORIZONTAL:
      return new HORIZONTAL();
    case ComponentType.LIST:
      return new LIST();
    case ComponentType.TITLE:
      return new TITLE();
    case ComponentType.CONTENT:
      return new CONTENT();
    case ComponentType.DIVIDER:
      return new DIVIDER();
    case ComponentType.IMAGE:
      return new IMAGE();
    case ComponentType.BUTTON:
      return new BUTTON();
    // 其他类型可以继续补充
    default:
      throw new Error('未知的组件类型: ' + type);
  }
};
