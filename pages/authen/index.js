// pages/authen/index.js

//获取应用实例
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {

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
//登录授权
getUserInfo: function (e) {
  if (e.detail.userInfo) {
    //用户按了允许授权按钮
    console.log(e.detail.userInfo)
    //插入登录的用户的相关信息到数据库

    //授权成功后，跳转进入小程序首页
    app.userInfo = e.detail.userInfo//全局保存userInfo信息
    app.hasUserInfo = true
    wx.switchTab({//跳转到home页面
      url: '/pages/home/home',
    })
  } else {
    //用户按了拒绝按钮
    wx.showModal({
      title: '警告',
      content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
      showCancel: false,
      confirmText: '返回授权',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击了“返回授权”')
        }
      }
    })
  }
}

})