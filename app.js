//app.js
import { getWxUserDetail } from "./utils/request/api";
App({
  onLaunch: function () {
    // 展示本地存储能力
    //var logs = wx.getStorageSync('logs') || []
    //logs.unshift(Date.now())

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
        }).catch((err) => {
          wx.hideLoading()
          wx.showToast({
            title: '网络异常，请稍后重试',
            icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
            duration: 3000     
          })   
        });
      }
    })
  },
  globalData: {
    header: { 'Cookie': 'JSESSION=***' }
  }
})