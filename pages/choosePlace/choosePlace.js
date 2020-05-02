// pages/choosePlace/choosePlace.js
const app = getApp()
let timer = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: "杭州",
    address:"",
    relative_pois: [],
    search_name: "",
    searchList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.locationObj)
    this.getAddress()
  },
  // 搜索输入
  search_nameChange (e) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      this.setData({
        search_name: e.detail.value
      })
      this.getSerachPlace()
    }, 300)
  },
  // 搜索地址
  getSerachPlace() {
    wx.request({
      url: app.globalData.baseUrl + `/Address/searchGdPosition.html`,
      header: {
        Authorization: app.globalData.auth_code
      },
      data: {
        lat: app.globalData.locationObj.latitude,
        lng: app.globalData.locationObj.longitude,
        search_name: this.data.search_name
      },
      method: 'POST',
      success: (res) => {
        if (res.data.error_code === 0) {
          let position = res.data.bizobj.data.position
          let positionArray = []
          for (let key in position) {
            positionArray.push(position[key])
          }
          this.setData({
            searchList: positionArray
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
  // 选择位置
  choosePlace(e) {
    let item = e.currentTarget.dataset.item
    app.globalData.locationObj.latitude = item.location.lat
    app.globalData.locationObj.longitude = item.location.lng
    app.globalData.city = item.title
    wx.navigateBack()
  },
  // 搜索后选择位置
  choosePlace2(e) {
    let item = e.currentTarget.dataset.item
    app.globalData.locationObj.latitude = item.latitude
    app.globalData.locationObj.longitude = item.longitude
    app.globalData.city = item.name
    wx.navigateBack()
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
            address: res.data.bizobj.data.my_village,
            relative_pois: res.data.bizobj.data.relative_pois
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