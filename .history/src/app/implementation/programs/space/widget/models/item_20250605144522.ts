import * as uuid from 'uuid';

export class SINGLE_COLUMN {
  name: string;
  uId: string;
  children: any[];

  constructor(options: { name: string; children?: any[] }) {
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
