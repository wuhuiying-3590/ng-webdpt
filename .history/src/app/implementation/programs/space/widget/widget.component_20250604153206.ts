import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.less'],
})
export class WidgetComponent implements OnInit {
  title = '按钮组件2';
  saveTime = '已保存 16:20:45';
  showLeft = true;
  showRight = true;
  // 选中的组件
  selectedComponent: any = null;

  // 画布上的组件列表
  canvasComponents: any[] = [];
  constructor(private location: Location) {}
  goBack() {
    this.location.back();
  }
  // 处理选中组件
  handleSelectComponent(component: any): void {
    this.selectedComponent = component;
  }

  // 保存为模板
  saveAsTemplate(): void {
    console.log('保存为模板', this.canvasComponents);
  }

  // 临时保存
  saveTemporary(): void {
    console.log('临时保存', this.canvasComponents);
    // 更新保存时间
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    this.saveTime = `已保存 ${hours}:${minutes}:${seconds}`;
  }

  // 处理组件添加到画布
  handleComponentAdded(component: any): void {
    this.canvasComponents.push({ ...component, id: Date.now() });
  }
  handleCloseLeftPanel() {
    this.showLeft = false;
  }
  handleOpenLeftPanel() {
    this.showLeft = true;
  }
  handleCloseRightPanel() {
    this.showRight = false;
  }
  ngOnInit(): void {}
}
