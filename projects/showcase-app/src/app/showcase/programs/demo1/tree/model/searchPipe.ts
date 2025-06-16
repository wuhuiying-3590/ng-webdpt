import { Pipe, PipeTransform } from '@angular/core';
import { DataModel } from '../model/model';

@Pipe({
  name: 'ShowcaseTreeSearchPipe'
})
export class ShowcaseTreeSearchPipe implements PipeTransform {
  transform(datas: DataModel[], ...args: any[]): any {
    // console.log(datas.filter(item => item.name.toLowerCase().indexOf(args[0].toLowerCase()) !== -1));
    return datas.filter(item => {
      return this.checkIfhasChildren(item, ...args);
      // item.name.toLowerCase().indexOf(args[0].toLowerCase()) !== -1
    });
  }
  checkIfhasChildren(item: DataModel, ...args: any[]): boolean {
    let treeHasName = false;
    if (item.name.toLowerCase().indexOf(args[0].toLowerCase()) !== -1) {
      treeHasName = true;
    }
    // 子node有,父node也要出現
    if (item.hasOwnProperty('children')) {
      for (const child of item.children) {
        if (child.name.toLowerCase().indexOf(args[0].toLowerCase()) !== -1) {
          treeHasName = true;
          if (args[0]) {
            item.expand = true;
          }
        }
      }
    }
    return treeHasName;
  }
}
