import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CanvasDataService } from '../services/canvas-data.service';
import { HttpServerService } from '../services/http-server.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.less'],
})
export class WidgetComponent implements OnInit, OnDestroy {
  title = '按钮组件2';
  saveTime = '已保存 16:20:45';
  id: string = '';
  showLeft = true;
  showRight = true;
  // 选中的组件
  selectedComponent: any = null;
  root: any = {};
  treeData: any[] = [];
  private subscriptions = new Subscription();
  constructor(
    private location: Location,
    private canvasDataService: CanvasDataService,
    private httpServerService: HttpServerService,
    private route: ActivatedRoute
  ) {}
  goBack() {
    this.location.back();
  }
  // 处理选中组件
  handleSelectComponent(component: any): void {
    this.selectedComponent = component;
  }

  // 保存为模板
  saveAsTemplate(): void {
    console.log('保存为模板', this.root, this.treeData);
  }

  // 临时保存
  saveTemporary(): void {
    console.log('临时保存');
    // 更新保存时间
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    this.saveTime = `已保存 ${hours}:${minutes}:${seconds}`;
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
  handleOpenRightPanel() {
    this.showRight = true;
  }
  ngOnInit(): void {
    this.subscriptions.add(
      this.route.paramMap.subscribe((params) => {
        this.id = params.get('id');
      })
    );

    // 1. 请求接口获取 webStyleData
    // this.httpServerService.getTemplateData().subscribe((canvasData: any) => {
    //   const webStyleData = JSON.parse(canvasData.webStyleData);
    //   console.log('webStyleData:', webStyleData);
    //   // 2. 设置 root 和 treeData
    //   this.canvasDataService.setRoot(webStyleData.root);
    //   this.canvasDataService.setTreeData(webStyleData.treeData);
    //   // this.canvasDataService.setTreeData([]);
    // });

    // 3. 订阅 root$ 和 treeData$
    this.subscriptions.add(
      this.canvasDataService.root$.subscribe((root) => {
        this.root = root;
      })
    );
    this.subscriptions.add(
      this.canvasDataService.treeData$.subscribe((treeData) => {
        this.treeData = treeData;
      })
    );
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
