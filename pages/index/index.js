// pages/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getLocation: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getLocation({
      isHighAccuracy: true,
      success: (res) => {
        console.log(1, res)
        app.globalData.locationObj = res
        wx.switchTab({
          url: '../home/home',
        })
        // wx.switchTab({
        //   url: '../my/my',
        // })
        // wx.redirectTo({
        //   url: '../loginPhone/loginPhone',
        // })
      },
      fail: (res) => {
        console.log(2, res)
        this.setData({
          getLocation: false
        })
      }
    })
  },
  goSetting () {
    wx.openSetting()
  },
  // 经纬度获取位置信息
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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