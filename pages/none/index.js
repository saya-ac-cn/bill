// pages/none/index.js
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
    /**
     * 之所以写在onShow()函数中而不是onLoad()函数中，也是因为小程序左上角有个返回首页的按钮，
     * 当前none页面在app.json中配置在第一个，点击返回首页按钮，则又返回到了none页面，
     * 所以当每次显示none页面的时候 就判断一下权限，自动去跳转
     */
    wx.getSetting({
      success(res){
        if(res.authSetting["scope.userInfo"]){//已经授权
          console.log('已授权')
          wx.switchTab({
            url: '/pages/home/index',
          })
        }else{
          console.log('未授权')
          wx.redirectTo({
            url: '/pages/authen/index',
          })
        }
      }
    })
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

  }
})