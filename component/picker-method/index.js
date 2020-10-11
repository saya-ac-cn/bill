// component/picker-method/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    defaultData:{
      type: null,
      value: 1,
      observer: function(newVal, oldVal) {
        // 可能会存在死循环的问题
        this.setData({selected:newVal})
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selected:{id:-1,tag:''},
    logo:[
      '/resource/img/ammount/train-fill.svg','/resource/img/ammount/train-fill.svg',
      '/resource/img/ammount/train-fill.svg','/resource/img/ammount/train-fill.svg',
      '/resource/img/ammount/train-fill.svg','/resource/img/ammount/train-fill.svg',
      '/resource/img/ammount/train-fill.svg','/resource/img/ammount/train-fill.svg',
      '/resource/img/ammount/train-fill.svg'
    ],
    list:[
      {id:1,tag:'现金',logo:0},
      {id:2,tag:'微信',logo:1},
      {id:3,tag:'支付宝',logo:2},
      {id:4,tag:'QQ转账',logo:3},
      {id:5,tag:'信用卡',logo:4},
      {id:6,tag:'借记卡',logo:5},
      {id:7,tag:'网银',logo:6},
      {id:8,tag:'社保',logo:7},
      {id:9,tag:'购物卡',logo:8}
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectMethod: function(e){
      let _this = this
      const id = parseInt(e.currentTarget.dataset.id);
      const tag = e.currentTarget.dataset.tag
      _this.setData({selected:{id:id,tag:tag}})
    },
    onConfirm: function(e) {
      // 自定义组件向父组件传值
      let _this = this
      const selected = _this.data.selected
      const val = {val: selected}
      // myevent自定义名称事件，父组件中使用
      _this.triggerEvent('onConfirm', val)
       /*
        在父组件中写上bind:onConfirm="get_emit",在父组件中就需要调用get_emit事件
       */
    },
  }
})
