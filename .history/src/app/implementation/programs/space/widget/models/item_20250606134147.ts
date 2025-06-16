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
export class TITLE {
  id: string;
  type: string = 'title';
  name: string = '标题';
  style: any = {
    content: '请输入标题', // 固定写死
    color: '#ed7d31', // 标题颜色
    fontWeight: 'bold', // 标题font-weight:  normal / bold
    fontSize: '22px', // 写死22px
    lines: 1, // 写死1
    textAlign: 'left', // 对齐方式  left 、 center 、  right
  };
  constructor() {
    this.id = this.type + '-' + uuid.v4();
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
export const createNewItem = (type: string) => {
  switch (type) {
    case ComponentType.SLOT:
      return new SLOT();
    case ComponentType.SINGLE_COLUMN:
      return new SINGLE_COLUMN();
    case ComponentType.MULTI_COLUMN:
      return new MULTI_COLUMN();
    // 其他类型可以继续补充
    default:
      throw new Error('未知的组件类型: ' + type);
  }
};
