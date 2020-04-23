// pages/choosePlace/choosePlace.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: "杭州",
    address:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddress()
  },
  // 获取用户定位
  getAddress() {
    wx.request({
      url: app.globalData.baseUrl + `/Address/getUserPosition.html`,
      header: {
        Authorization: app.globalData.auth_code
      },
      data: {
        lat: app.globalData.locationObj.latitude,
        lng: app.globalData.locationObj.longitude
      },
      method: 'POST',
      success: (res) => {
        if (res.data.error_code === 0) {
          this.setData({
            address: res.data.bizobj.data.my_village
            // city: res.data.bizobj.data.location_district_name
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
  getAddressAgain () {
    wx.getLocation({
      isHighAccuracy: true,
      success: (res) => {
        app.globalData.locationObj = res
        this.getAddress()
      },
      fail: (res) => {
      }
    })
  },
  goChooseCity () {
    wx.request({
      url: app.globalData.baseUrl + `/Address/getUserPosition.html`,
      header: {
        Authorization: app.globalData.auth_code
      },
      data: {
        lat: 30.251863,
        lng: 120.216481
      },
      method: 'POST',
      success: (res) => {
        if (res.data.error_code === 0) {
          this.setData({
            address: res.data.bizobj.data.my_village
            // city: res.data.bizobj.data.location_district_name
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
    // wx.navigateTo({
    //   url: '../chooseCity/chooseCity',
    // })
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