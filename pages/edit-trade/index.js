// pages/edit-trade/index.js
import {formatDateTime,formatFloatNum} from "../../utils/dateTools"
import{getBillDetail,editTransaction,addTransactioninfo,removeTransaction} from '../../utils/request/api'
Page({

  /**https://detail.vip.com/detail-1710614926-6918168878902755534.html
   * https://detail.vip.com/detail-1710613157-6918398157033709893.html
   * 页面的初始数据
   */
  data: {
    // 可选日期的范围(当前日期至上一个月)
    minDate: null,
    maxDate:  null,
    // 是否显示编辑弹出层(父)
    showTradePicker: false,
    // 是否显示编辑弹出层(子)
    showTradeInfoPicker: false,
    // 对应当前的财政记录编号
    tradeId:-1,
    trade:{
      deposited: 0,
      expenditure: 10,
      // 交易方式
      dealType:null,
      // 交易摘要
      dealAmount:null,
      // 交易时间
      tradeDate:null
    },
    // 财政明细列表
    datas:[],
    // 是否显示日期选择
    showCalendar: false,
    // 显示交易摘要选择
    showTradeAmmount: false,
    // 显示交易方式选择
    showDealType: false,
    // 页面原始数据
    pagaData:[],
    // 正在添加的表单详情
    addFromInfo:{flog:1,currencyNumber:0.00,currencyDetails:''}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const tradeId = options.tradeId
    this.setData({ tradeId },function(){
      this.getBillDetailDate({tradeId:tradeId})
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      minDate: (new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        new Date().getDate()
      )).getTime(),
      maxDate:  (new Date()).getTime(),
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

  getBillDetailDate: function(param){
    getBillDetail(param).then((res) => {
      wx.hideLoading()
      if (0 === res.code) {
        const pagaData = res.data
        var trade = {
          dealType: JSON.parse(JSON.stringify(pagaData.tradeTypeEntity)),
          dealAmount: JSON.parse(JSON.stringify(pagaData.tradeAmountEntity)),
          tradeDate: pagaData.tradeDate,
          deposited: pagaData.deposited,
          expenditure: pagaData.expenditure,
        }
        var datas = JSON.parse(JSON.stringify(pagaData.infoList))
        this.setData({trade,datas,pagaData})
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

  /**
   * 弹出编辑父账单
   */
  showTradePickerPopup() {
    const pagaData = this.data.pagaData
    var trade = {
      dealType: JSON.parse(JSON.stringify(pagaData.tradeTypeEntity)),
      dealAmount: JSON.parse(JSON.stringify(pagaData.tradeAmountEntity)),
      tradeDate: pagaData.tradeDate,
      deposited: pagaData.deposited,
      expenditure: pagaData.expenditure,
    }
    this.setData({ showTradePicker: true,trade });
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

  displayCalendar:function() {
    this.setData({ showCalendar: true});
  },

  closeCalendar:function() {
    this.setData({ showCalendar: false});
  },

  confirmCalendar:function(event) {
    let _this = this
    let trade = _this.data.trade
    trade.tradeDate = formatDateTime(event.detail,'Y-M-D')
    this.setData({trade});
    this.closeCalendar()
  },

  closeTradeAmmountPopup:function() {
    this.setData({ showTradeAmmount: false });
  },

  showTradeAmmountPopup:function() {
    this.setData({ showTradeAmmount: true });
  },

  closeDealTypePopup:function() {
    this.setData({ showDealType: false });
  },

  showDealTypePopup:function() {
    this.setData({ showDealType: true });
  },
  
  // 接受子组件的传值（选择了摘要）
  selectAmmount: function (e) {
    let _this = this
    let trade = _this.data.trade
    trade.dealAmount = e.detail.val
    this.setData({trade});
    this.closeTradeAmmountPopup()
  },
  // 接受子组件的传值（选择了交易方式）
  selectMethod: function (e) {
    let _this = this
    let trade = _this.data.trade
    var dealType = e.detail.val
    dealType.transactionType = dealType.tag
    trade.dealType = JSON.parse(JSON.stringify(dealType))
    this.setData({trade});
    this.closeDealTypePopup()
  },
  // 修改父账单
  submitEditTrade: function(){
    let _this = this
    let{tradeId,trade,pagaData} = _this.data
    let param = {
      tradeId: tradeId,
      tradeType: trade.dealType.id,
      tradeDate: trade.tradeDate,
      transactionAmount: trade.dealAmount.id
    }
    wx.showLoading({
      title: '正在提交...',
    })
    editTransaction(param).then((res) => {
      wx.hideLoading()
      if (0 === res.code) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',    //如果要纯文本，不要icon，将值设为'none'
          duration: 2000     
        })
        pagaData.tradeDate = trade.tradeDate
        pagaData.tradeTypeEntity = JSON.parse(JSON.stringify(trade.dealType))
        pagaData.tradeAmountEntity = JSON.parse(JSON.stringify(trade.dealAmount))
        this.setData({ showTradePicker: false,pagaData });
      }else{
        wx.showToast({
          title: '错误提示：'+res.msg,
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
  /**
   * 交易类别单选改变事件
   * @param {*} e 
   */
  flogChange:function(e){
    const _this = this
    var addFromInfo = _this.data.addFromInfo
    addFromInfo.flog = parseInt(e.detail.value)
    _this.setData({
      addFromInfo
    })
  },
  /**
   * 动态绑定文本框
   * @param {*} e 
   */
  bindInput:function(e){
    const type = e.target.dataset.type
    const _this = this
    var addFromInfo = _this.data.addFromInfo
    if('currencyNumber' === type){
      addFromInfo[type] = formatFloatNum(e.detail.value)
    }else{
      addFromInfo[type] = e.detail.value
    }
    _this.setData({
      addFromInfo
    })
  },
  submitAddTradeInfo:function(){
    const _this = this
    let{tradeId,addFromInfo} = _this.data
    addFromInfo.tradeId = tradeId
    if(!addFromInfo.currencyNumber){
      wx.showToast({
        title: '交易金额不能为空',
        icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
        duration: 2000     
      }) 
      return
    }
    if(!addFromInfo.currencyDetails){
      wx.showToast({
        title: '交易备注不能为空',
        icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
        duration: 2000     
      }) 
      return
    }
    wx.showLoading({
      title: '正在提交...',
    })
    addTransactioninfo(addFromInfo).then((res) => {
      wx.hideLoading()
      if (0 === res.code) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',    //如果要纯文本，不要icon，将值设为'none'
          duration: 2000     
        })   
        _this.getBillDetailDate({tradeId:tradeId})
        _this.closeTradeInfoPickerPopup()
      }else{
        wx.showToast({
          title: '错误提示：'+res.msg,
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
  deleteTransaction:function(){
    let _this = this
    wx.showModal({
      title: '提示',
      content: '您确定删除该账单么',
      success (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在提交...',
          })
          const params = {tradeId:parseInt(_this.data.tradeId)}
          removeTransaction(_this.data.tradeId).then((res) => {
            wx.hideLoading()
            if (0 === res.code) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',    //如果要纯文本，不要icon，将值设为'none'
                duration: 2000     
              })   
              var pages = getCurrentPages();
              if (pages.length > 1) {
                //上一个页面实例对象
                var prePage = pages[pages.length - 2];
                //关键在这里
                prePage.onReady()
              }
              wx.navigateBack()
            }else{
              wx.showToast({
                title: '错误提示：'+res.msg,
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
        }
      }
    })    
  }
})