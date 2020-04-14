// pages/shoper/shoper.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopInfo: {},
    goodList: [],
    scrollTop: 0,
    store_id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      store_id: options.store_id
    })
    this.getShopInfo()
    this.getGoodList()
  },
  getShopInfo() {
    wx.request({
      url: app.globalData.baseUrl + `/Store/defaultStore.html`,
      header: {
        Authorization: app.globalData.auth_code
      },
      data: {
        lat: app.globalData.locationObj.latitude,
        lng: app.globalData.locationObj.longitude,
        store_id: this.data.store_id
      },
      method: 'POST',
      success: (res) => {
        if (res.data.error_code === 0) {
          this.setData({
            shopInfo: res.data.bizobj.data
          })
        } else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: res.data.msg
          })
        }
      },
      fail: (res) => {
        wx.showToast({
          icon: 'none',
          title: '网络请求失败',
        })
      }
    })
  },
  getGoodList() {
    wx.request({
      url: app.globalData.baseUrl + `/Goods/allGoodsList.html`,
      header: {
        Authorization: app.globalData.auth_code
      },
      data: {
        store_id: this.data.store_id
      },
      method: 'POST',
      success: (res) => {
        if (res.data.error_code === 0) {
          this.setData({
            goodList: res.data.bizobj.data
          })
        } else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: res.data.msg
          })
        }
      },
      fail: (res) => {
        wx.showToast({
          icon: 'none',
          title: '网络请求失败',
        })
      }
    })
  },
  clickScroll () {
    this.setData({
      scrollTop: "340rpx"
    })
    console.log(this.data.scrollTop)
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