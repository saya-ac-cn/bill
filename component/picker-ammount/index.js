// component/ammount/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    defaultDate:{
      type: Number,
      value: 1
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
      '/resource/img/ammount/train-fill.svg','/resource/img/ammount/train-fill.svg',
      '/resource/img/ammount/train-fill.svg','/resource/img/ammount/train-fill.svg',
      '/resource/img/ammount/train-fill.svg','/resource/img/ammount/train-fill.svg',
      '/resource/img/ammount/train-fill.svg','/resource/img/ammount/train-fill.svg',
      '/resource/img/ammount/train-fill.svg','/resource/img/ammount/train-fill.svg',
      '/resource/img/ammount/train-fill.svg','/resource/img/ammount/train-fill.svg',
      '/resource/img/ammount/train-fill.svg','/resource/img/ammount/train-fill.svg',
      '/resource/img/ammount/train-fill.svg','/resource/img/ammount/train-fill.svg',
      '/resource/img/ammount/train-fill.svg'
    ],
    payAmmount:[
      {id:1,tag:'服饰美容',logo:0},
      {id:2,tag:'餐饮美食',logo:1},
      {id:3,tag:'交通出行',logo:2},
      {id:4,tag:'住房物业',logo:3},
      {id:5,tag:'户外运动',logo:4},
      {id:6,tag:'养车',logo:5},
      {id:7,tag:'亲子',logo:6},
      {id:8,tag:'医疗健康',logo:7},
      {id:9,tag:'奖金红包',logo:8},
      {id:10,tag:'转账',logo:9},
      {id:11,tag:'退款',logo:10},
      {id:12,tag:'其它人情',logo:11},
      {id:13,tag:'酒店旅行',logo:12},
      {id:14,tag:'教育专项开支',logo:13},
      {id:15,tag:'研发专项开支',logo:14},
      {id:16,tag:'日常生活日用',logo:15},
      {id:17,tag:'通讯物流',logo:16},
      {id:19,tag:'家电家具家装',logo:18},
      {id:20,tag:'购物',logo:19}
    ],
    incomeAmmount:[
      {id:18,tag:'职业酬劳',logo:17},
      {id:21,tag:'生意',logo:20},
      {id:22,tag:'投资',logo:21},
      {id:23,tag:'其它人情',logo:22},
      {id:24,tag:'转账',logo:23},
      {id:25,tag:'退款',logo:24}
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectAmmount: function(e){
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
