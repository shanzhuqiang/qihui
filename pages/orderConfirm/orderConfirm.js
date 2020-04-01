// pages/orderConfirm/orderConfirm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    beizhuMaxk: false,
    zhifuMaxk: false,
    timeMaxk: false,
    payType: "wechat",
    arriveTime: 0
  },
  // 选择支付方式
  payTypeChoose (e) {
    this.setData({
      payType: e.currentTarget.dataset.id,
      zhifuMaxk: !this.data.zhifuMaxk
    })
  },
  // 支付方式
  zhifuTigger () {
    this.setData({
      zhifuMaxk: !this.data.zhifuMaxk
    })
  },
  // 备注
  beizhuTigger() {
    this.setData({
      beizhuMaxk: !this.data.beizhuMaxk
    })
  },
  // 到店时间
  timeTigger() {
    this.setData({
      timeMaxk: !this.data.timeMaxk
    })
  },
  // 选择到达时间
  chooseTime(e) {
    this.setData({
      arriveTime: e.currentTarget.dataset.id,
      timeMaxk: !this.data.timeMaxk
    })

  },
  // 取餐人信息
  goQucanName () {
    wx.navigateTo({
      url: '../qucanName/qucanName',
    })
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

  }
})