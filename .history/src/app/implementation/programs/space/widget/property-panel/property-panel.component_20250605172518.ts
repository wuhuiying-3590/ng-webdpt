import {
  Component,
  Input,
  OnChanges,
  EventEmitter,
  Output,
  OnInit,
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
    private canvasDataService: CanvasDataService
  ) {
    this.propertyForm = this.fb.group({
      backgroundType: [''],
      width: [''],
      height: [''],
      padding: [''],
      textContent: [''],
      fontSize: [''],
      fontWeight: [''],
      color: [''],
      backgroundColor: [''],
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
    const props = this.selectedComponent.properties || {
      backgroundType: 'transparent',
    };

    this.propertyForm.patchValue({
      name: this.selectedComponent.name || '',
      width: props.width || '',
      height: props.height || '',
      padding: props.padding || '',
      textContent: props.textContent || '',
      fontSize: props.fontSize || '',
      fontWeight: props.fontWeight || '',
      color: props.color || '',
      backgroundType: props.backgroundType || '',
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
