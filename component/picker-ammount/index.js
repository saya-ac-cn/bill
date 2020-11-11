// component/ammount/index.js
import{getAmount} from '../../utils/request/api'
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
    payAmmount:[],
    incomeAmmount:[]
  },
  ready:function(){
    console.log('Component-1 >> ready');
    this.getAmountDate()
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
    getAmountDate: function(){
      getAmount().then((res) => {
        if (0 === res.code) {
          const data = res.data
          var payAmmount = new Array()
          var incomeAmmount = new Array()
          for(var i = 0; i<data.length;i++){
            if(1 == data[i].flog){
              incomeAmmount.push({id:data[i].id,tag:data[i].tag,logo:i})
            }
            if(2 == data[i].flog){
              payAmmount.push({id:data[i].id,tag:data[i].tag,logo:i})
            }
          }
          this.setData({incomeAmmount,payAmmount})
        }
      }).catch((err) => {
        console.log("getAmountData error:",err) 
      });
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
