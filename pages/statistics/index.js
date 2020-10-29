// pages/statistics/index.js
import {formatMonthStr} from '../../utils/dateTools'
import{totalBalance,totalBillByAmount,getBillBalanceRank} from '../../utils/request/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否显示月份选择器
    showMonthPicker: false,
    // 用户查询的月份
    queryDate: null,
    // 收支类型，1：收入，-1：支出
    flag: 1,
    // 收支数据
    balance:{
      income: 0.0,
      pay:0.0
    },
    // 收支排行
    rank:[]
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
    const queryDate = new Date().getFullYear()+"-"+(new Date().getMonth()+1)
    this.setData({queryDate},function () {
      this.getBalance(queryDate)
      this.billBalanceRank(queryDate,1)
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
   * 统计指定月份的总收入和支出
   */
  getBalance:function(date){
    totalBalance({tradeDate:formatMonthStr(date)}).then((res) => {
      wx.hideLoading()
      if (0 === res.code) {
        const pagaData = res.data
        var balance = {
          income: pagaData.deposited,
          pay:pagaData.expenditure
        }
        this.setData({balance})
      }else{
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000     
        })   
      }
    }).catch((err) => {
      wx.hideLoading()
      wx.showToast({
        title: '网络异常，请稍后重试',
        icon: 'none',
        duration: 2000     
      })   
    });
  },

  /**
   * 统计指定月份中各摘要的收支情况
   */
  getBillByAmount: function(date) {
    
  },

  /**
   * 查询指定月份中支出（flag=-1）或收入（flag=1）的排行
   */
  billBalanceRank:function(tradeDate,flag) {
    getBillBalanceRank({tradeDate:formatMonthStr(tradeDate),flag:flag}).then((res) => {
      wx.hideLoading()
      if (0 === res.code) {
        const rank = res.data
        this.setData({rank})
      }else{
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000     
        })   
      }
    }).catch((err) => {
      wx.hideLoading()
      wx.showToast({
        title: '网络异常，请稍后重试',
        icon: 'none',
        duration: 2000     
      })   
    });
  },

  hrefToEditPage(e){
    // 跳转到编辑页面
    wx.navigateTo({
      url:"/pages/edit-trade/index?tradeId="+e.currentTarget.dataset.id
   })
  },
  
  showMonthPickerPopup() {
    this.setData({ showMonthPicker: true });
  },

  closeMonthPickerPopup() {
    this.setData({ showMonthPicker: false });
  },

  // 接受子组件的传值
  selectMonth: function (e) {
    // 这里的月份是从1开始的
    let selectDate = e.detail.val
    if(null !==  selectDate &&'' !== selectDate){
      this.setData({queryDate:selectDate},function(){
        this.getBalance(selectDate)
        this.billBalanceRank(selectDate,1)
      })
    }
    this.closeMonthPickerPopup()
  },

  hrefToInfoPage(e){
    // 跳转到详情页面
    wx.navigateTo({
      url:"/pages/statistics-info/index?id="+e.currentTarget.dataset.id
   })
  }
})