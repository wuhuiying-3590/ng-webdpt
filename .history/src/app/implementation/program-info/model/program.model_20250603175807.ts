export const programData = [
  {
    id: 'home',
    module: 'root', // 沒有模組歸屬不做模組切分，不上傳到IAM做權限控管
    type: '',
    routerLink: '/',
  },
  {
    id: 'library',
    module: 'space',
    type: '',
    routerLink: '/space/library',
  },
  // {
  //   'id': 'library',
  //   'module': 'root',
  //   'type': '',
  //   'routerLink': * 填写路由(例如: /material/order) *
  // }
];
