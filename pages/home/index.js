// pages/home.js
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
    showAmmountPicker: false
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
    this.setData({queryDate:new Date().getFullYear()+"-"+(new Date().getMonth()+1)})
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

  // 接受子组件的传值
  selectMonth: function (e) {
    // 这里的月份是从1开始的
    let queryDate = new Date()
    console.log("====",e.detail.val)
    if(null !== e.detail.val &&'' !== e.detail.val){
      this.setData({queryDate:e.detail.val})
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