// pages/add-trade/index.js
import {formatDateTime} from "../../utils/dateTools"
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
    showTradeAmmount: false,
    // 交易方式
    dealType:3,
    // 交易摘要
    dealAmount:1,
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
      tradeDate:formatDateTime(new Date(),'Y-M-D')
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
    list[index][type] = e.detail.value
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

})