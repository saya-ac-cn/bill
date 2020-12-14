// pages/none/index.js
import { getWxUserDetail } from "../../utils/request/api";
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
    this.getUserInfo()
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

  getUserInfo: function (){
    const _this = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var param = {"code":res.code}
        wx.showLoading({
          title: '应用加载中',
        })
        wx.removeStorageSync('user')
        getWxUserDetail(param).then((res) => {
          wx.hideLoading()
          wx.setStorageSync('user', res.data)
          _this.predictedPermission()
        }).catch((err) => {
          wx.hideLoading()
          wx.showToast({
            title: '网络异常，请退出重试',
            icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
            duration: 3000     
          })   
        });
      }
    })
  },

  predictedPermission: function(){
    wx.getSetting({
      success(res){
        if(res.authSetting["scope.userInfo"]){//已经授权
          const user = wx.getStorageSync('user')
          console.log("user",user)
          if(user && user.bind == 1){
            // 已授权认证
            wx.setStorage({
              key: 'sessionId',
              data: 'JSESSIONID='+user.sessionId,
              success: function (res) {
                console.log(res)
              }
            })            
            wx.switchTab({
              url: '/pages/home/index',
            })
          }else{
            // 已授权，但后台还未绑定
            wx.redirectTo({
              url: '/pages/authen/index',
            })
          }
        }else{
          // 用户未授权
          wx.redirectTo({
            url: '/pages/authen/index',
          })
        }
      }
    })
  }

})