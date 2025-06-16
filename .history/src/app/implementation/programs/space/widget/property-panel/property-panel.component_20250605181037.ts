import {
  Component,
  Input,
  OnChanges,
  EventEmitter,
  Output,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CanvasDataService } from '../../services/canvas-data.service';
import {
  lineSpaceOptions,
  internalSpaceOptions,
  borderRadiusOptions,
  backgroundTypeOptions,
} from '../constants/index';
@Component({
  selector: 'app-property-panel',
  templateUrl: './property-panel.component.html',
  styleUrls: ['./property-panel.component.less'],
})
export class PropertyPanelComponent implements OnInit {
  selectedComponent: any;
  @Output() closePanel = new EventEmitter<any>();
  propertyForm: FormGroup;
  lineSpaceOption = [];
  internalSpaceOption = [];
  borderRadiusOption = [];
  backgroundTypeOption = [];
  constructor(
    private fb: FormBuilder,
    private canvasDataService: CanvasDataService,
    private cdr: ChangeDetectorRef
  ) {
    this.propertyForm = this.fb.group({
      backgroundType: [''],
      lineSpace: [''],
      internalSpace: [''],
      borderRadius: [''],
    });
  }
  initData() {
    this.lineSpaceOption = lineSpaceOptions;
    this.internalSpaceOption = internalSpaceOptions;
    this.borderRadiusOption = borderRadiusOptions;
    this.backgroundTypeOption = backgroundTypeOptions;
  }
  watchChange() {
    if (this.selectedComponent) {
      // console.log('selectedComponent:', this.selectedComponent);
      // 根据选中的组件类型加载不同的属性配置
      this.loadComponentProperties();
    }
  }

  loadComponentProperties(): void {
    // 基于组件类型设置不同的表单控件值
    // console.log('loadComponentProperties:', this.selectedComponent.style);
    const props = this.selectedComponent.style || {};
    console.log('props:', props);
    this.propertyForm.patchValue({
      backgroundType: props.backgroundType || '',
      lineSpace: props.lineSpace || '',
      internalSpace: props.internalSpace || '',
      borderRadius: props.borderRadius || '',
    });
  }

  saveProperties(): void {
    console.log(11111);
    if (!this.selectedComponent) {
      return;
    }

    // 保存属性到组件对象
    // this.selectedComponent.properties = {
    //   ...this.selectedComponent.properties,
    //   ...this.propertyForm.value,
    // };
    console.log(this.propertyForm.value);
    console.log('属性已保存', this.selectedComponent);
  }
  handleClosePanel() {
    this.closePanel.emit();
  }
  backgroundTypeChange(e) {
    //
    console.log(e);
  }
  ngOnInit(): void {
    this.canvasDataService.selectedComponent$.subscribe((selected) => {
      console.log('selected:', selected);
      // 这里可以处理选中组件变化
      this.selectedComponent = selected;
      this.watchChange();
    });
    this.initData();
  }
}
