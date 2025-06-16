import { Injectable, OnInit } from '@angular/core';
import { DetailsInfoModel, MasterModel } from '../model';
import { GroupService } from '../service/group.service';

@Injectable()
export abstract class AbstractGroupAdd implements OnInit {

  public groupId: string;
  public master: MasterModel = new MasterModel({});
  public detail: DetailsInfoModel[] = <DetailsInfoModel[]>[];

  constructor(public groupService: GroupService) { }

  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  ngOnInit(): void {

  }


  /**
   * 新增明細
   *
   * @memberof GroupAddComponent
   */
  public addDetail(detail: DetailsInfoModel): void {
    this.detail = [...this.detail, Object.assign({}, detail)];
  }
  /**
   * 保存
   *
   * @memberof GroupAddComponent
   */
  public save(): void {
    this.onBeforeSaveGroup();
    this.groupService.addGroup(this.master, this.detail).subscribe(
      (response: any) => {
        this.onAfterSaveGroup(response);
      }
    );
  }

  /**
   * 保存資料前
   */
  abstract onBeforeSaveGroup(): void;

  /**
   * 保存資料後
   * @param result
   */
  abstract onAfterSaveGroup(result: any): void;
}
