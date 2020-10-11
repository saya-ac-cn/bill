// pages/edit-trade/index.js
import {formatDateTime} from "../../utils/dateTools"
Page({

  /**https://detail.vip.com/detail-1710614926-6918168878902755534.html
   * https://detail.vip.com/detail-1710613157-6918398157033709893.html
   * 页面的初始数据
   */
  data: {
    // 可选日期的范围(当前日期至上一个月)
    minDate: null,
    maxDate:  null,
    // 是否显示编辑弹出层(父)
    showTradePicker: false,
    // 是否显示编辑弹出层(子)
    showTradeInfoPicker: false,
    trade:{
      tradeId:-1,
      // 交易方式
      dealType:null,
      // 交易摘要
      dealAmount:null,
      // 交易时间
      tradeDate:null
    },
    datas:[
      {id:1,name:'菜籽油',number:49.00},
      {id:2,name:'伊利鲜牛奶',number:38.00},
      {id:3,name:'保鲜碗',number:11.00}
    ],
    // 是否显示日期选择
    showCalendar: false,
    // 显示交易摘要选择
    showTradeAmmount: false,
    // 显示交易方式选择
    showDealType: false,
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
    this.setData({
      trade:{
        tradeId:-1,
        tradeDate:formatDateTime(new Date(),'Y-M-D'),
        dealAmount:{id:1,tag:'服饰美容'},
        dealType:{id:3,tag:'支付宝'}
      },
      minDate: (new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        new Date().getDate()
      )).getTime(),
      maxDate:  (new Date()).getTime(),
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

  showTradePickerPopup() {
    this.setData({ showTradePicker: true });
  },

  closeTradePickerPopup() {
    this.setData({ showTradePicker: false });
  },

  showTradeInfoPickerPopup() {
    this.setData({ showTradeInfoPicker: true });
  },

  closeTradeInfoPickerPopup() {
    this.setData({ showTradeInfoPicker: false });
  },

  displayCalendar:function() {
    this.setData({ showCalendar: true});
  },

  closeCalendar:function() {
    this.setData({ showCalendar: false});
  },

  confirmCalendar:function(event) {
    let _this = this
    let trade = _this.data.trade
    trade.tradeDate = formatDateTime(event.detail,'Y-M-D')
    this.setData({trade});
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
    let _this = this
    let trade = _this.data.trade
    trade.dealAmount = e.detail.val
    this.setData({trade});
    this.closeTradeAmmountPopup()
  },
  selectMethod: function (e) {
    let _this = this
    let trade = _this.data.trade
    trade.dealType = e.detail.val
    this.setData({trade});
    this.closeDealTypePopup()
  },

})