import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { createNewItem } from '../widget/models/item';
import { NzMessageService } from 'ng-zorro-antd/message';
@Injectable({
  providedIn: 'root',
})
export class CanvasDataService {
  constructor(private message: NzMessageService) {}
  // 画布根节点数据
  private rootSubject = new BehaviorSubject<any>(null);
  root$ = this.rootSubject.asObservable();

  // 组件树数据
  private treeDataSubject = new BehaviorSubject<any[]>([]);
  treeData$ = this.treeDataSubject.asObservable();

  // 选中的组件
  private selectedComponentSubject = new BehaviorSubject<any>(null);
  selectedComponent$ = this.selectedComponentSubject.asObservable();

  // hover的组件
  private hoverComponentSubject = new BehaviorSubject<any>(null);
  hoverComponent$ = this.hoverComponentSubject.asObservable();
  needChangeTitlePosition = false;
  // 获取当前值
  get root() {
    return this.rootSubject.value;
  }
  get treeData() {
    return this.treeDataSubject.value;
  }
  get selectedComponent() {
    return this.selectedComponentSubject.value;
  }
  get hoverComponent() {
    return this.hoverComponentSubject.value;
  }
  setNeedChangeTitlePosition(needChangeTitlePosition: boolean) {
    this.needChangeTitlePosition = needChangeTitlePosition;
  }
  // 设置 root
  setRoot(root: any) {
    this.rootSubject.next(root);
  }

  // 设置 treeData
  setTreeData(treeData: any[]) {
    this.treeDataSubject.next(treeData);
  }
  // 设置 selectedComponent
  setSelectedComponent(component: any) {
    this.selectedComponentSubject.next(component);
  }
  // 设置 hoverComponent
  setHoverComponent(component: any) {
    this.hoverComponentSubject.next(component);
  }
  createNewComponent(componentType, options?) {
    const newComponent = createNewItem(componentType, options);
    return newComponent;
  }

  addTitleComponent(newComponent) {
    const treeData = this.treeData;
    if (treeData?.[0]?.type !== 'title') {
      treeData.unshift(newComponent);
      return true;
    } else {
      this.message.create('warning', `只可以添加一个标题组件`);
      return false;
    }
  }
  addComponentInRoot(newComponent, cIndex = -1) {
    const treeData = this.treeData;
    if (newComponent.type === 'title') {
      if (this.addTitleComponent(newComponent)) {
        this.setTreeData(treeData);
      }
    } else {
      if (cIndex >= 0) {
        if (this.needChangeTitlePosition && cIndex === 0) {
          this.message.create('warning', `标题组件只能放在卡片首位`);
        } else {
          treeData.splice(cIndex, 0, newComponent);
        }
      } else {
        treeData.push(newComponent);
      }
      this.setTreeData(treeData);
    }
  }
  addComponentInTreeData(
    newComponent,
    pId,
    cIndex = -1,
    allowInLayout = false
  ) {
    const treeData = this.treeDataSubject.value;
    const updateComponentInTree = (nodes: any[]): boolean => {
      for (const node of nodes) {
        if (node.id === pId) {
          if (
            allowInLayout &&
            [
              'scrollLayout',
              'listLayout',
              'columnLayout',
              'columnLayout1_1_1',
            ].includes(node.type)
          ) {
            this.message.create(
              'warning',
              '布局组件第一层子元素,只能放插槽组件'
            );
            return false;
          }
          if (newComponent.type === 'title') {
            const msg = '标题组件只能放在卡片首位';
            // if (pId.includes('title')) {
            //   msg = '只可以添加一个标题组件';
            // }
            this.message.create('warning', msg);
            return false;
          }
          // 布局组件第一层子元素  只能放 插槽组件
          if (node.children) {
            cIndex >= 0
              ? node.children.splice(cIndex, 0, newComponent)
              : node.children.push(newComponent);
          }
          return true; // 找到后返回
        }
        if (node.children && Array.isArray(node.children)) {
          if (updateComponentInTree(node.children)) {
            return true;
          }
        }
      }
      return false;
    };
    // console.log('addComponent', treeData);
    if (updateComponentInTree(treeData)) {
      this.setTreeData(treeData); // 通知所有订阅者
    }
  }

  // 添加组件到 treeData
  addComponent(
    componentType: string,
    pId = this.selectedComponentSubject.value?.id || 'root',
    cIndex = -1,
    allowLayout = true
  ) {
    console.log('componentType:', componentType);
    console.log('selectedComponent:', this.selectedComponentSubject.value);
    const newComponent = this.createNewComponent(componentType);
    if (pId === 'root') {
      this.addComponentInRoot(newComponent, cIndex);
    } else {
      this.addComponentInTreeData(newComponent, pId, cIndex, allowLayout);
    }
  }

  // 布局组件删到最后一个插槽是不是要删除该布局组件？
  removeEmptyLayouts = (nodes: any[]): boolean => {
    let hasChanged = false;
    // 从后往前遍历，以便安全地删除元素
    for (let i = nodes.length - 1; i >= 0; i--) {
      const node = nodes[i];

      // 首先递归检查子节点
      if (node.children && Array.isArray(node.children)) {
        if (this.removeEmptyLayouts(node.children)) {
          hasChanged = true;
        }
      }

      // 检查当前节点是否为 scrollLayout 且没有子节点
      if (
        [
          'scrollLayout',
          'listLayout',
          'columnLayout',
          'columnLayout1_1_1',
        ].includes(node.type) &&
        (!node.children || node.children.length === 0)
      ) {
        nodes.splice(i, 1);
        hasChanged = true;
      }
    }
    return hasChanged;
  };
  removeSortableItem() {
    const treeData = this.treeDataSubject.value;
    // 递归查找并更新
    function removeNode(nodes: any[]): boolean {
      for (let i = 0; i < nodes.length; i++) {
        if (!nodes[i]?.id) {
          nodes.splice(i, 1); // 删除该节点
          return true;
        }
        if (nodes[i].children && Array.isArray(nodes[i].children)) {
          if (removeNode(nodes[i].children)) {
            return true;
          }
        }
      }
      return false;
    }
    if (removeNode(treeData)) {
      // this.removeEmptyLayouts(treeData);
      // console.log(treeData);
      this.setTreeData(treeData);
    }
  }

  // 删除组件（默认删除选中组件）
  removeComponent(component: any = this.selectedComponent) {
    const treeData = this.treeDataSubject.value;
    // 递归查找并更新
    function removeNode(nodes: any[]): boolean {
      for (let i = 0; i < nodes.length; i++) {
        if (!nodes[i]?.id || nodes[i]?.id === component.id) {
          nodes.splice(i, 1); // 删除该节点
          return true;
        }
        if (nodes[i].children && Array.isArray(nodes[i].children)) {
          if (removeNode(nodes[i].children)) {
            return true;
          }
        }
      }
      return false;
    }
    if (removeNode(treeData)) {
      // this.removeEmptyLayouts(treeData);
      // console.log(treeData);
      this.setTreeData(treeData);
    }
    // 清空选中组件
    if (
      this.selectedComponentSubject.value &&
      this.selectedComponentSubject.value.id === component.id
    ) {
      this.selectedComponentSubject.next(null); // 通知所有订阅者
    }
  }

  // 更新指定组件的 style
  updateComponentStyle(componentId: string, newStyle: any) {
    const rootData = this.rootSubject.value;
    if (componentId === rootData.id) {
      Object.assign(rootData.style, newStyle);
      this.rootSubject.next(rootData);
    } else {
      const treeData = this.treeDataSubject.value;
      // 递归查找并更新
      function updateStyleInTree(nodes: any[]): boolean {
        for (const node of nodes) {
          if (node.id === componentId) {
            Object.assign(node.style, newStyle);
            return true; // 找到后返回
          }
          if (node.children && Array.isArray(node.children)) {
            if (updateStyleInTree(node.children)) {
              return true;
            }
          }
        }
        return false;
      }
      if (updateStyleInTree(treeData)) {
        this.setTreeData(treeData);
      }
    }
  }
  createCloneComponent(component: any) {
    if (!component) {
      return null;
    }

    // 创建组件属性的深拷贝，以便不修改原始组件
    const clonedProperties = JSON.parse(JSON.stringify(component));

    // 删除旧的id，因为createNewItem会生成新的id
    delete clonedProperties.id;

    // 递归克隆子组件
    if (clonedProperties.children && Array.isArray(clonedProperties.children)) {
      clonedProperties.children = clonedProperties.children.map((child) =>
        this.createCloneComponent(child)
      );
    }

    // 使用createNewItem方法创建新组件，并将克隆的属性作为选项传入
    // createNewItem会生成新的id，并根据clonedProperties设置其他属性（包括递归克隆后的children）
    const newComponent = this.createNewComponent(
      component.type,
      clonedProperties
    );
    return newComponent;
  }
  getParentComponentId(component: any) {
    const treeData = this.treeDataSubject.value;
    let parentId = 'root';
    function getParentIdInTreeData(nodes, c, pId = 'root') {
      for (const node of nodes) {
        if (node.id === c.id) {
          parentId = pId;
          return;
        } else {
          if (node.children && Array.isArray(node.children)) {
            const _pId = node.id;
            getParentIdInTreeData(node.children, c, _pId);
          }
        }
      }
    }
    getParentIdInTreeData(treeData, component);
    // console.log('getParentComponentId', parentId);
    return parentId;
  }
  // 复制组件
  cloneComponent() {
    // 默认复制选中组件
    const component = this.selectedComponent;
    const pId = this.getParentComponentId(component);
    const newComponent = this.createCloneComponent(component);
    // console.log('cloneComponent', component, newComponent, pId);

    if (pId === 'root') {
      this.addComponentInRoot(newComponent);
    } else {
      this.addComponentInTreeData(newComponent, pId);
    }
  }

  findAndReplaceTitle = (components, componentToInsert, pId, cIndex) => {
    for (let i = 0; i < components.length; i++) {
      if (components[i].id === pId) {
        components[i].children.splice(cIndex, 0, componentToInsert);
      }
      if (components[i].children && components[i].children.length > 0) {
        this.findAndReplaceTitle(
          components[i].children,
          componentToInsert,
          pId,
          cIndex
        );
      }
    }
  };
  changeTitlePosition = (pId, cIndex) => {
    console.log('changeTitlePosition', pId, cIndex);
    const treeData = this.treeDataSubject.value;
    // 此处必须深拷贝
    const firstComponent = JSON.parse(JSON.stringify(treeData[0]));
    treeData.shift();
    if (pId === 'root') {
      treeData.splice(cIndex, 0, firstComponent);
    } else {
      this.findAndReplaceTitle(treeData, firstComponent, pId, cIndex);
    }
    this.message.create('warning', '标题组件只能放在卡片首位');
    this.setTreeData(treeData);
  };
}
