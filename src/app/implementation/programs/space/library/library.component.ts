import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateUtilsService } from '../../../../utils/date-utils.service';
import { Router } from '@angular/router';
import * as uuid from 'uuid';
import { HttpServerService } from '../services/http-server.service';

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
    // {
    //   id: '3d9b416c-ee44-4eed-a59d-bdb424e8914e',
    //   name: '按钮钮2',
    //   type: 'company',
    //   createName: '蒋二情',
    //   updateTime: '2025/06/03 16:45:53',
    //   status: false,
    // },
  ];

  constructor(
    private fb: FormBuilder,
    private dateUtilsService: DateUtilsService,
    private router: Router,
    private httpServerService: HttpServerService
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
  getTableData() {
    this.httpServerService.getTemplateList().subscribe((listData: any) => {
      // console.log(listData);
      this.listOfData = listData;
    });
  }
  createModule() {
    const id = uuid.v4();
    this.httpServerService.addTemplate({ id }).subscribe((data: any) => {
      console.log(data);
      this.getTableData();
    });
    // this.router.navigate(['/space/widget', u]);
  }
  editItem(id: string) {
    this.router.navigate(['/space/widget', id]);
  }
  deleteItem(id: string) {
    this.httpServerService.deleteTemplate({ id }).subscribe((data: any) => {
      console.log(data);
      this.getTableData();
    });
  }
  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      rangePickerTime: [[]],
      moduleType: [null],
      moduleState: [null],
    });
    this.getTableData();
  }
}
