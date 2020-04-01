// pages/my/my.js
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
  // 骑手认证
  goRenzheng() {
    wx.navigateTo({
      url: '../renzheng/renzheng',
    })
  },
  // 立即充值
  goChongzhi() {
    wx.navigateTo({
      url: '../chongzhi/chongzhi',
    })
  },
  // 余额
  goYue() {
    wx.navigateTo({
      url: '../yue/yue',
    })
  },
  // 添加客服
  goAddKefu() {
    wx.navigateTo({
      url: '../addKefu/addKefu',
    })
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