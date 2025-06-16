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
export class SINGLE_COLUMN {
  name: string;
  uId: string;
  children: any[];

  constructor(options: { name? = '单列'; children?: any[] }) {
    this.name = options.name;
    this.uId = uuid.v4();
    this.children = options.children || [];
  }
}
export class MULTI_COLUMN {
  name: string;
  uId: string;
  children: any[];

  constructor(options: { name: string; children?: any[] }) {
    this.name = options.name;
    this.uId = uuid.v4();
    this.children = options.children || [];
  }
}
