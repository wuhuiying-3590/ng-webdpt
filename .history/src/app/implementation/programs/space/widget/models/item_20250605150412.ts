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
    backgroundType: 'transparent',
    lineSpace: '16px',
    internalSpace: '8px',
    borderRadius: '8px',
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
    lineSpace: '16px',
    internalSpace: '8px',
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
  type: string = 'columnLayout';
  name: string = '单列';
  style: any = {
    backgroundType: 'transparent',
    lineSpace: '16px',
    internalSpace: '8px',
    borderRadius: '8px',
  };
  children: SLOT[];

  constructor() {
    this.id = this.type + '-' + uuid.v4();
    this.children = [new SLOT()];
  }
}
