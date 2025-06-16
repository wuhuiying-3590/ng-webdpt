import { DigiMiddlewareAuthApp } from './app-auth-token';
import { IDWDmcUserInfo } from '@webdpt/framework/config';

// 開發環境變數
export const SYSTEM_CONFIG: IAppConfig = {
  dwAppId: 'sampleApp1',
  dwAppName: '範例應用',
  defaultApp: '/',
  dwLogoPath: './assets/img/i18n/zh_CN/logo/dwLogo.svg',
  dwDateFormat: 'yyyy/MM/dd',
  dwTimeFormat: 'HH:mm:ss',
  dwUsingTab: false,
  dwTabMultiOpen: false,
  defaultLogin: '/login',
  dwAppAuthToken: DigiMiddlewareAuthApp,
  dwLoginTenantSelectMode: 'select',
  dwLoadMaskHttp: true,
  dwLoadMaskDelay: 0,
  dwDmcUserInfo: {
    username: '',
  },
  dwTabStoreStrategy: 'session'
};

export interface IAppConfig {
  dwAppId: string; // Application ID(對應到互聯應用管理中心)
  dwAppName: string; // Application NAME(對應到互聯應用管理中心)
  defaultApp: string; // 首頁路徑
  dwLogoPath: string; // Logo圖檔路徑
  dwDateFormat: string; // 日期格式
  dwTimeFormat: string; // 時間格式
  dwUsingTab: boolean; // 是否啟用多頁佈局
  dwTabMultiOpen: boolean; // 多頁佈局預設是否可重覆開啟作業
  defaultLogin: string; // 登入頁路徑
  dwAppAuthToken: string; // IAM 的 digi-middleware-auth-app [各應用系統的AppToken].
  dwLoginTenantSelectMode: 'select' | 'ignore'; // 登入租戶選擇方式。select:登入時選擇。ignore:忽略不選擇。
  dwLoadMaskHttp: boolean; // HTTP加載遮罩是否啟用
  dwLoadMaskDelay: number; // 延遲顯示加載效果的時間毫秒
  dwDmcUserInfo: IDWDmcUserInfo; // 文檔中心的登入帳密
  dwTabStoreStrategy?: 'session' | 'local' | 'none'; // 多頁籤儲存策略
}

function loadJSON(filePath: string): any {
  const json = loadTextFileAjaxSync(filePath, 'application/json');
  const obj = JSON.parse(json);
  return obj;
}

function loadTextFileAjaxSync(filePath: string, mimeType: string): string {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', filePath, false);
  if (mimeType != null) {
    if (xmlhttp.overrideMimeType) {
      xmlhttp.overrideMimeType(mimeType);
    }
  }
  xmlhttp.send();
  if (xmlhttp.status === 200) {
    return xmlhttp.responseText;
  } else {
    return null;
  }
}
