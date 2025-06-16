import { RequestInfo } from 'angular-in-memory-web-api';
import { IDwMockData } from '@webdpt/framework/mock';
const mockResponse = require('../../mock-response.json');
import { demo2ExtraFieldsOrderModel } from './order.model';

class Demo2ExtraFieldsOrderModifyMockData implements IDwMockData {

  get data(): any {
    const mockData = demo2ExtraFieldsOrderModel.mockData;

    return mockData;
  }

  getMethod(reqInfo: any): any {
    return reqInfo.collection;
  }

  postMethod(reqInfo: any): any {
    let params;
    try {
      params = JSON.parse(reqInfo.req.body);
    } catch (error) {
      params = reqInfo.req.body;
    }
    const collectionDb = <any>demo2ExtraFieldsOrderModel.mockData;
    const collection = {
      'master': [...collectionDb.master],
      'detail': [...collectionDb.detail]
    };

    const mockResp = <any>JSON.parse(JSON.stringify(mockResponse));
    mockResp.response = {
      'status': false,
      'description': '修改失敗'
    };

    // 模擬API查詢結果
    const paramsOrderId: string = params.master.orderId;
    // 訂單編號
    if (paramsOrderId !== '') {
      // 單頭
      collection.master = collection.master.map((mapData) => {
        const orderId: string = mapData.orderId;
        if (orderId.indexOf(paramsOrderId) !== -1) {
          mapData = params.master;
        }
        return mapData;
      });

      // 單身
      collection.detail = collection.detail.map((mapData) => {
        const orderId: string = mapData.orderId;
        if (orderId.indexOf(paramsOrderId) !== -1) {
          mapData.detail = params.detail;
        }
        return mapData;
      });
    }

    demo2ExtraFieldsOrderModel.mockData = collection;

    mockResp.response.status = true;
    mockResp.response.description = paramsOrderId + ' 修改成功';

    return mockResp;
  }

  deleteMethod({ collection, collectionName, headers, id, url }: RequestInfo): any {
    return [];
  }

  putMethod({ collection, collectionName, headers, id, req, url }: RequestInfo): any {
    return [];
  }
}

export const demo2ExtraFieldsOrderModify = new Demo2ExtraFieldsOrderModifyMockData();
