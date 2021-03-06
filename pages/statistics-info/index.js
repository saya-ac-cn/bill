// pages/statistics-info/index.js
import {formatMonthStr} from '../../utils/dateTools'
import{getBillByAmount} from '../../utils/request/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ammount: -1,
    tradeDate: '2020-01',
    pagaData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ammount: options.ammount,
      tradeDate: options.tradeDate
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getBillByAmountData()
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
   * 查询指定月份中，某一摘要类型的收支数据
   */
  getBillByAmountData:function(){
    getBillByAmount({tradeDate:formatMonthStr(this.data.tradeDate),transactionAmount:this.data.ammount}).then((res) => {
      wx.hideLoading()
      if (0 === res.code) {
        var pagaData = res.data
        this.setData({pagaData})
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
  }
})