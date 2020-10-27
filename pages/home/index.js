// pages/home.js
import{getBillByDay} from '../../utils/request/api'
// https://www.cnblogs.com/start2019/p/11854183.html
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否显示月份选择器
    showMonthPicker: false,
    // 用户查询的月份
    queryDate: null,
    // 是否显示摘要选择器
    showAmmountPicker: false,
    pagaData:[]
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
    const currentDate = new Date().getFullYear()+"-"+(new Date().getMonth()+1)
    this.setData({queryDate:currentDate})
    this.getBillByDayDate({tradeDate:currentDate})
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
  showMonthPickerPopup() {
    this.setData({ showMonthPicker: true });
  },

  closeMonthPickerPopup() {
    this.setData({ showMonthPicker: false });
  },

  getBillByDayDate: function(param){
    getBillByDay(param).then((res) => {
      wx.hideLoading()
      if (0 === res.code) {
        this.setData({pagaData:res.data})
      }else{
        wx.showToast({
          title: res.msg,
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
  },

  // 接受子组件的传值
  selectMonth: function (e) {
    // 这里的月份是从1开始的
    let selectDate = e.detail.val
    if(null !==  selectDate &&'' !== selectDate){
      this.setData({queryDate:selectDate},function(){
        const dates = selectDate.split("-")
        if (dates[1] < 10 && dates[1] > 0){
          this.getBillByDayDate({tradeDate:dates[0]+"-0"+dates[1]})
        }else{
          this.getBillByDayDate({tradeDate:dates[0]+"-"+dates[1]})
        }
      })
    }
    this.closeMonthPickerPopup()
  },
  showAmmountPickerPopup() {
    this.setData({ showAmmountPicker: true });
  },

  closeAmmountPickerPopup() {
    this.setData({ showAmmountPicker: false });
  },
  hrefAddPage(){
    // 跳转到申报页面
    wx.navigateTo({
      url:"/pages/add-trade/index"
   })
  },
  hrefToEditPage(e){
    // 跳转到编辑页面
    wx.navigateTo({
      url:"/pages/edit-trade/index?tradeId="+e.currentTarget.dataset.id
   })
  }
  
})