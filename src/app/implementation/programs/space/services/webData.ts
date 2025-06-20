export const webStyleData = {
  root: {
    // 根组件的配置对象
    id: 'root', // id 固定是root
    type: 'root', // type 固定是root
    name: 'root', // name 固定是root
    style: {
      backgroundType: 'transparent', // 背景类型：透明：transparent  或者 颜色:color  #222222 的颜色值
      lineSpace: '4px', // 行间距
      internalSpace: '4px', // 内边距
    },
  },
  treeData: [
    {
      id: 'title-82e23383-bef0-483b-b1a4-de33187be605', // 唯一值 可以uuid 包生成
      name: '标题', // 写死
      type: 'title', // 固定类型 title
      style: {
        content: '请输入标题', // 固定写死
        color: '#ed7d31', // 标题颜色
        fontWeight: 'bold', // 标题font-weight:  normal / bold
        fontSize: '22px', // 写死22px
        lines: 1, // 写死1
        textAlign: 'left', // 对齐方式  left 、 center 、  right
      },
    },
    {
      id: 'scrollLayout-0edb09f5-d6b9-4b5f-8f5e-11a551ba7d6a', // 唯一值 可以uuid 包生成
      name: '横滑组件', // 写死
      type: 'scrollLayout', // 固定类型 scrollLayout
      style: {
        backgroundType: 'transparent', // 背景类型：透明：transparent  或者 颜色:color 的颜色值
        lineSpace: '4px', // 行间距
        internalSpace: '2px', // 内边距  padding
        borderRadius: '8px', // 外框圆角
      },
      children: [
        // 布局的横滑组件的 内部 槽位 组件， 第一层对象对应一个槽位
        {
          id: 'slot-b1805747-6eab-4db0-92d6-9f4061c0a7bb', // 随机生成
          type: 'slot', // 固定
          children: [
            {
              id: 'text-d037d663-6194-4289-bf6d-da80085b4a51', // 内容组件的id
              name: '文本内容组件', // 固定
              type: 'text', // 固定
              style: {
                content: '请输入文本', // 固定   内容组件在模板中的占位内容
                color: '#000000', // 字体颜色
                fontWeight: 'normal', // 同标题组件
                fontSize: '14px', // 字体大小  小 12px  常规： 14px   大： 16px
                textAlign: 'left', // 文字对齐  left / center / right
                lines: 3, // 最多展示几行内容 显示...
                cycleFlag: false, // 循环渲染   是否循环：true 开启循环；false 不开启循环
              },
            },
          ],
          style: {
            lineSpace: '4px', // 插槽组件的内部元素的 行间距
            internalSpace: '2px', // 插槽组件的 内边距
            positionX: 'left', //  水平对齐  left / middle / right
            positionY: 'top', // 垂直对齐 top / center / bottom
          },
        },
        {
          id: 'slot-91b31328-8d20-4b02-823a-445434a6e3be',
          type: 'slot',
          children: [
            {
              id: 'divider-d829ce75-b480-42b9-89de-45c7e6cb1f3f', // 分割线组件的id随机生成
              type: 'divider', // 分割线组件的 类型 固定
              name: '分割线组件', // 固定
              style: {
                color: '#d9d9d9', // 分割线的 线条颜色
                marginTop: 'none', // 分割线组件的上边距
                marginBottom: 'none', // 分割线组件的下边距
                borderType: 'solid', // 分割线的线形  直线 solid / 虚线1 dashed / 虚线2 dotted
              },
            },
          ],
          style: {
            lineSpace: '4px',
            internalSpace: '2px',
            positionX: 'left',
            positionY: 'top',
          },
        },
        {
          id: 'slot-3162b28a-3592-47c8-9cc9-f0a34973f534',
          type: 'slot',
          children: [
            {
              id: 'button-bca1b3ef-c2c7-4d51-8b12-942c1dbf7a37', // 按钮组件的id,可随机生成
              name: '按钮组件', // 固定
              type: 'button', // 按钮组件的类型  固定
              style: {
                content: '按钮', // 固定
                backgroundColor: '#ffffff', // 按钮背景颜色 废弃字段
                color: '#000000', // 按钮字体颜色 废弃字段
                type: 'primary', // 按钮类型， primary / second / third / fourth / text / warn
                enableLines: false, // 是否启用行数限制  弃用字段
                lines: 1, // 弃用
                disabledAfterOperation: false, // 触发按钮后禁用： disabledAfterOperation: true #触发禁用开关 true false
                actionType: 'execute_plugin_tools', // 操作类型 操作行为类型，枚举值： execute_plugin_tools（插件执行）， open_url（打开URL页面）
                size: 'small', // 启用    尺寸： mini 小 small 中 large 大
                width: 'hug', // 宽度： hug: 自适应   fill: 拉伸   fixed: 固定宽度
                widthPx: 172, //  width_v 当 width=fixed 时生效取值数值， 其他属性为null
                textAlign: 'center', // 按钮文本对齐方式： left center right
              },
            },
          ],
          style: {
            lineSpace: '4px',
            internalSpace: '2px',
            positionX: 'left',
            positionY: 'top',
          },
        },
      ],
    },
    {
      id: 'listLayout-fab50997-492a-4ed0-ba71-097c881a5c45',
      name: '列表组件',
      type: 'listLayout',
      style: {
        backgroundType: 'transparent',
        lineSpace: '4px',
        internalSpace: '2px',
        borderRadius: '8px',
      },
      children: [
        {
          id: 'slot-21dfc401-6bb6-467b-93a6-4eabc72e0ae4',
          type: 'slot',
          children: [],
          style: {
            lineSpace: '4px',
            internalSpace: '2px',
            positionX: 'left',
            positionY: 'top',
          },
        },
        {
          id: 'slot-614b1dfc-098d-43a4-b56f-7198835377c0',
          type: 'slot',
          children: [
            {
              id: 'image-16393efe-7e45-4bf5-9109-06f77284b674', // 图片组件id
              name: '图片组件', // 固定
              type: 'image', // 固定
              style: {
                src: 'https://kai-wis-test.apps.digiwincloud.com.cn/assets/img/flow/custom-template/image-view.png', // 固定
                mode: 'fixed', // #样式-模式 宽度固定：fixed 宽度铺满：fill
                fixedSize: 'medium', // #尺寸大小 ：大：large(200*200)，中:medium (80*80)，小:small (40*40)，自定义：customize
                customWidth: 124, // 开启自定义尺寸时的宽
                customHeight: 124, // 开启自定义尺寸时的高
                cycleFlag: false, // 是否循环：true 开启循环；false 不开启循环
              },
            },
          ],
          style: {
            lineSpace: '4px',
            internalSpace: '2px',
            positionX: 'left',
            positionY: 'top',
          },
        },
      ],
    },
    {
      id: 'columnLayout-8dc1d08b-24fe-4083-9eba-20b51f9a2870',
      type: 'columnLayout',
      name: '单列',
      style: {
        backgroundType: '#a9d18e',
        lineSpace: '16px',
        internalSpace: '8px',
        borderRadius: '8px',
      },
      children: [
        {
          id: 'slot-8d8f52a2-ed5a-4c7c-8327-72368e90f3bd',
          type: 'slot',
          children: [],
          style: {
            lineSpace: '4px',
            internalSpace: '2px',
            positionX: 'left',
            positionY: 'top',
          },
        },
        {
          id: 'slot-a5fa6b94-4cd7-49ac-a80e-83b0c5d2831f',
          type: 'slot',
          children: [],
          style: {
            lineSpace: '4px',
            internalSpace: '2px',
            positionX: 'left',
            positionY: 'top',
          },
        },
      ],
    },
    {
      id: 'columnLayout1_1_1-6d092573-09e7-4046-9b22-3924de62cfdc',
      name: '多列组件',
      type: 'columnLayout1_1_1',
      style: {
        backgroundType: '#ffe699',
        lineSpace: '4px',
        internalSpace: '2px',
        borderRadius: '8px',
      },
      children: [
        {
          id: 'slot-b430c2f9-31c6-4a70-96f5-b9000250d70a',
          type: 'slot',
          children: [],
          style: {
            lineSpace: '4px',
            internalSpace: '2px',
            positionX: 'left',
            positionY: 'top',
          },
        },
        {
          id: 'slot-17411de9-5ae5-4918-b9dc-3f83d84202a9',
          type: 'slot',
          children: [
            {
              id: 'text-876a056f-6d38-4e11-b091-8c8ee86c61a2',
              name: '文本内容组件',
              type: 'text',
              style: {
                content: '请输入文本',
                color: '#000000',
                fontWeight: 'normal',
                fontSize: '14px',
                textAlign: 'left',
                lines: 3,
                cycleFlag: false,
              },
            },
            {
              id: 'divider-a2321768-ce8c-4f29-81e8-973bad28e773',
              type: 'divider',
              name: '分割线组件',
              style: {
                color: '#d9d9d9',
                marginTop: 'none',
                marginBottom: 'none',
                borderType: 'solid',
              },
            },
            {
              id: 'button-8bfd986f-b5ad-47a0-90b9-1af8b5063a87',
              name: '按钮组件',
              type: 'button',
              style: {
                content: '按钮',
                backgroundColor: '#ffffff',
                color: '#000000',
                type: 'primary',
                enableLines: false,
                lines: 1,
                disabledAfterOperation: false,
                actionType: 'execute_plugin_tools',
                size: 'small',
                width: 'hug',
                widthPx: 172,
                textAlign: 'center',
              },
            },
          ],
          style: {
            lineSpace: '8px',
            internalSpace: '8px',
            positionX: 'left',
            positionY: 'top',
          },
        },
      ],
    },
    {
      id: 'text-b28a65e1-d1ad-4cd6-b119-94a13401fef5',
      name: '文本内容组件',
      type: 'text',
      style: {
        content: '请输入文本',
        color: '#ffc000',
        fontWeight: 'normal',
        fontSize: '16px',
        textAlign: 'left',
        lines: 3,
        cycleFlag: true,
      },
    },
    {
      id: 'divider-dc166615-3a60-4bd6-a1dc-db95bec27ca9',
      type: 'divider',
      name: '分割线组件',
      style: {
        color: '#70ad47',
        marginTop: 'large',
        marginBottom: 'large',
        borderType: 'dotted',
      },
    },
    {
      id: 'image-b282b53e-ecdf-44dc-8e57-d3827711de97',
      name: '图片组件',
      type: 'image',
      style: {
        src: 'https://kai-wis-test.apps.digiwincloud.com.cn/assets/img/flow/custom-template/image-view.png',
        mode: 'fixed',
        fixedSize: 'large',
        customWidth: 420,
        customHeight: 800,
        cycleFlag: true,
      },
    },
    {
      id: 'button-2ffa93c0-d0b5-4cbb-8add-745aa08d194b',
      name: '按钮组件',
      type: 'button',
      style: {
        content: '按钮',
        backgroundColor: '#ffffff',
        color: '#000000',
        type: 'warn',
        enableLines: false,
        lines: 1,
        disabledAfterOperation: true,
        actionType: 'execute_plugin_tools',
        size: 'small',
        width: 'fixed',
        widthPx: 420,
        textAlign: 'left',
      },
    },
  ],
};
