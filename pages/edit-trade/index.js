// pages/edit-trade/index.js
Page({

  /**https://detail.vip.com/detail-1710614926-6918168878902755534.html
   * https://detail.vip.com/detail-1710613157-6918398157033709893.html
   * 页面的初始数据
   */
  data: {
    // 是否显示编辑弹出层(父)
    showTradePicker: false,
    showTradeInfoPicker: false,
    datas:[
      {id:1,name:'菜籽油',number:49.00},
      {id:2,name:'伊利鲜牛奶',number:38.00},
      {id:3,name:'保鲜碗',number:11.00}
    ]
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

})