// component/picker-month/index.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '请选择月份'
    },
    color: {
      type: String,
      value: '#3eb575'
    },
    defaultDate: {
      type: String,
      // 请传入正常下标0开始
      value: (new Date().getFullYear()+"-"+(new Date().getMonth()))
    },
    minDate: {
      type: null,
      value: new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 6,
        new Date().getDate()
      )
    },
    maxDate: {
      type: null,
      value: new Date(),
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    years:[],
    initDate:(new Date().getFullYear()+"-"+(new Date().getMonth()))
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onConfirm: function(e) {
      // 自定义组件向父组件传值
      let _this = this
      // 这里的月份是从1开始的
      let initDate = e.target.dataset.value
      _this.setData({initDate})
      let val = {val: initDate}
      // myevent自定义名称事件，父组件中使用
      _this.triggerEvent('onConfirm', val)
       /*
        在父组件中写上bind:onConfirm="get_emit",在父组件中就需要调用get_emit事件
       */
    },
  },
  created:function(){
    // 组件生命周期函数，在组件实例进入页面节点树时执行，注意此时不能调用setData
    console.log('Component-1 >> created');
},
attached:function(){
    // 组件生命周期函数，在组件实例进入页面节点树时执行。
    console.log('Component-1 >> attached');
},
ready:function(){
    // 在组件布局完成后执行，此时可以获取节点信息
    //得到起始时间
    let endDate = new Date(this.properties.maxDate)
    //console.log(new Date(endDate))
    let startDate = new Date(this.properties.minDate)
    // 初始化默认时间
    this.setData({
      initDate:(new Date().getFullYear()+"-"+(new Date().getMonth()))
    })
    let years = new Array();
    if(endDate.getFullYear() === startDate.getFullYear()){
      // 两个时间没有跨年
      let months = new Array();
      for(var startMonth = startDate.getMonth();startMonth<=endDate.getMonth();startMonth++){
        months.push(startMonth);
      }
      years.push({year:startDate.getFullYear(),month:months})
    }else{
      // 跨年
      for(var start = startDate.getFullYear();start<=endDate.getFullYear();start++){
        let months = new Array();
        let startMonth = 0
        let endMonth = 11
        // 如果是第一年
        if( start === startDate.getFullYear()){
          // 开始构造到年底
          startMonth = startDate.getMonth()
          endMonth = 11
        }else if(start === endDate.getFullYear()){
          // 年初构造到结束
          startMonth = 0
          endMonth = endDate.getMonth()
        }else{
          // 构造一年
          startMonth = 0
          endMonth = 11
        }
        for(startMonth;startMonth<=endMonth;startMonth++){
          months.push(startMonth);
        }
        years.push({year:start,month:months})
      }
    }
    this.setData({years})
    console.log('Component-1 >> ready',years);
},
show:function(){
  console.log('Component-1 >> show');
},
moved:function(){
    // 在组件实例被移动到节点树另一个位置时执行
    console.log('Component-1 >> moved');
},
detached:function(){
    // 在组件实例被从页面节点树移除时执行
    console.log('Component-1 >> detached');
},
lifetimes:{
    // 组件生命周期声明对象，将组件的生命周期收归到该字段进行声明，原有声明方式仍旧有效，如同时存在两种声明方式，则lifetimes字段内声明方式优先级最高
    created:function(){
        console.log('Component-1 lifetimes >> created');
    },
    attached:function(){
        console.log('Component-1 lifetimes >> attached');
    },
    ready:function(){
        console.log('Component-1 lifetimes >> ready');
    },
    moved:function(){
        console.log('Component-1 lifetimes >> moved');
    },
    detached:function(){
        console.log('Component-1 lifetimes >> detached');
    }
},
pageLifetimes:{
    // 组件所在页面的生命周期声明对象，目前仅支持页面的show和hide两个生命周期
    show:function(){
        console.log('Component-1 pageLifetimes >> Show');
    },
    hide:function(){
        console.log('Component-1 pageLifetimes >> Hide');
    }
}
})
