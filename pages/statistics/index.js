// pages/statistics/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 日期选择后的值
    date: '',
    // 是否显示日期选择
    show: false,
    // 可选日期的范围(当前日期至上一个月)
    minDate: null,
    maxDate:  null,
    // 默认选择当前日期
    currentDate: null,
    // 由于canvas层级太高，弹窗都遮不住，用if控制显示
    showCanvas: false
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
      currentDate: (new Date()).getTime()
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
  onDisplay() {
    this.setData({ show: true,showCanvas:true });
  },
  onClose() {
    this.setData({ show: false,showCanvas:false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      date: this.formatDate(event.detail),
    });
    this.onClose()
  },

  hrefToInfoPage(e){
    // 跳转到详情页面
    wx.navigateTo({
      url:"/pages/statistics-info/index?id="+e.currentTarget.dataset.id
   })
  }
})