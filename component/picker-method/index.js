// component/picker-method/index.js
import{getMethod} from '../../utils/request/api'
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
    list:[]
  },
  ready:function(){
    console.log('Component-1 >> ready',this.data.selected);
    this.getMethodDate()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getMethodDate: function(){
      getMethod().then((res) => {
        if (0 === res.code) {
          const data = res.data
          var list = new Array()
          for(var i = 0; i<data.length;i++){
            list.push({id:data[i].id,tag:data[i].transactionType,logo:i})
          }
          this.setData({list})
        }
      }).catch((err) => {
        console.log("getAmountData error:",err) 
      });
    },
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
