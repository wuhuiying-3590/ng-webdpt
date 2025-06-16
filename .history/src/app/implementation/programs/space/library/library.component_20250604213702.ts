import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateUtilsService } from '../../../../utils/date-utils.service';
import { Router } from '@angular/router';
import * as uuid from 'uuid';

interface TypeOption {
  label: string;
  value: string;
}
interface Resource {
  id: string;
  name: string;
  type: string;
  createName: string;
  updateTime: string;
  status: boolean;
}

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.less'],
})
export class LibraryComponent implements OnInit {
  validateForm!: FormGroup;
  moduleTypeOption: TypeOption[] = [
    { label: '企业', value: '1' },
    { label: '个人', value: '2' },
  ];
  moduleStateOption: TypeOption[] = [
    { label: '启用', value: '1' },
    { label: '停用', value: '2' },
  ];
  isCollapse = true;
  listOfData: Resource[] = [
    {
      id: '3d9b416c-ee44-4eed-a59d-bdb424e8914e',
      name: '按钮钮2',
      type: 'company',
      createName: '蒋二情',
      updateTime: '2025/06/03 16:45:53',
      status: false,
    },
  ];

  constructor(
    private fb: FormBuilder,
    private dateUtilsService: DateUtilsService,
    private router: Router
  ) {}
  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }
  search(): void {
    console.log(this.validateForm.value);
    console.log(this.validateForm.controls);
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      const raw = this.validateForm.value;
      const rangePickerTime = this.dateUtilsService.formatDate(
        raw.rangePickerTime
      );
      const payload = {
        ...raw,
        rangePickerTime,
      };
      console.log('payload', payload);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          // 显示红色错误边框样式
          control.markAsDirty();
          // 重新校验
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  resetForm(): void {
    this.validateForm.reset();
  }

  createModule() {
    const id = uuidv4();
    this.router.navigate(['/space/widget', id]);
  }
  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      rangePickerTime: [[]],
      moduleType: [null],
      moduleState: [null],
    });
  }
}
