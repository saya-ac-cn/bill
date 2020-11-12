// pages/add-trade/index.js
import {saveTransaction} from "../../utils/request/api"
import {formatDateTime,formatFloatNum} from "../../utils/dateTools"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 可选日期的范围(当前日期至上一个月)
    minDate: null,
    maxDate:  null,
    // 默认选择当前日期,时间戳
    currentDate: null,
    list:[
      {flog:1,currencyNumber:0.00,currencyDetails:'123'}
    ],
    // 是否显示日期选择
    showCalendar: false,
    // 显示交易摘要选择
    showTradeAmmount: false,
    // 显示交易方式选择
    showDealType: false,
    // 交易方式
    dealType:null,
    // 交易摘要
    dealAmount:null,
    // 交易时间
    tradeDate:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 全部使用时间戳
    this.setData({
      minDate: (new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        new Date().getDate()
      )).getTime(),
      maxDate:  (new Date()).getTime(),
      currentDate: (new Date()).getTime(),
      tradeDate:formatDateTime(new Date(),'Y-M-D'),
      //dealAmount:{id:1,tag:'服饰美容'},
      //dealType:{id:3,tag:'支付宝'}
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 添加子账单
   */
  addInfo:function(){
    const _this = this
    var list = _this.data.list
    var item = {flog:1,currencyNumber:0.00,currencyDetails:''}
    list.unshift(item)
    _this.setData({list})
  },

  /**
   * 移除1条明细
   * @param {*} e 
   */
  remove:function(e){
    const index = e.target.dataset.index
    const _this = this
    var list = _this.data.list
    list.splice(index, 1)
    _this.setData({list})
  },

  /**
   * 动态绑定文本框
   * @param {*} e 
   */
  bindInput:function(e){
    const type = e.target.dataset.type
    const index = e.target.dataset.index
    const _this = this
    var list = _this.data.list
    if('currencyNumber' === type){
      list[index][type] = formatFloatNum(e.detail.value)
    }else{
      list[index][type] = e.detail.value
    }
    _this.setData({
      list
    })
  },

  /**
   * 交易类别单选改变事件
   * @param {*} e 
   */
  flogChange:function(e){
    const index = e.target.dataset.index
    const _this = this
    var list = _this.data.list
    list[index].flog = parseInt(e.detail.value)
    _this.setData({
      list
    })
  },

  displayCalendar:function() {
    this.setData({ showCalendar: true});
  },

  closeCalendar:function() {
    this.setData({ showCalendar: false});
  },

  confirmCalendar:function(event) {
    this.setData({
      tradeDate: formatDateTime(event.detail,'Y-M-D'),
    });
    this.closeCalendar()
  },

  closeTradeAmmountPopup:function() {
    this.setData({ showTradeAmmount: false });
  },

  showTradeAmmountPopup:function() {
    this.setData({ showTradeAmmount: true });
  },

  closeDealTypePopup:function() {
    this.setData({ showDealType: false });
  },

  showDealTypePopup:function() {
    this.setData({ showDealType: true });
  },
  
  // 接受子组件的传值
  selectAmmount: function (e) {
    this.setData({dealAmount:e.detail.val})
    this.closeTradeAmmountPopup()
  },
  selectMethod: function (e) {
    this.setData({dealType:e.detail.val})
    this.closeDealTypePopup()
  },
  // 提交到后台处理 
  saveHandle: function(){
    let {dealType,dealAmount,tradeDate,list} = this.data
    if(!dealType || !dealAmount){
      wx.showToast({
        title: '请选择交易方式和摘要',
        icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
        duration: 2000     
      }) 
      return
    }
    if(!tradeDate){
      wx.showToast({
        title: '请选择交易时间',
        icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
        duration: 2000     
      }) 
      return
    }
    if(!list || list.length < 1){
      wx.showToast({
        title: '请填写账单明细',
        icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
        duration: 2000     
      }) 
      return
    }
    for(var index = 0; index < list.length; index++){
      const item = list[index]
      if(!item.currencyNumber || !item.currencyDetails){
        wx.showToast({
          title: '第'+(list.length-index)+'项的交易金额和说明为空',
          icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
          duration: 2000     
        }) 
        return
      }
    }
    wx.showLoading({
      title: '正在提交...',
    })
    let param = {
        tradeType: dealType.id,
        tradeDate: tradeDate,
        transactionAmount: dealAmount.id,
        infoList: list
    }
    saveTransaction(param).then((res) => {
      wx.hideLoading()
      if (0 === res.code) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',    //如果要纯文本，不要icon，将值设为'none'
          duration: 2000     
        })   
      }else{
        wx.showToast({
          title: '错误提示：'+res.msg,
          icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
          duration: 2000     
        })   
      }
    }).catch((err) => {
      wx.hideLoading()
      wx.showToast({
        title: '网络异常，请稍后重试',
        icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
        duration: 2000     
      })   
    });
  }
  
})