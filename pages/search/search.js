// pages/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    listDataAll: [],
    sortType: "distance"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 输出框改变
  inputChange (e) {
    let listData = this.data.listDataAll.filter(el => {
      return el.name.indexOf(e.detail.value) !== -1
    })
    this.setData({
      listData: listData
    })
  },
  // 选择排序类型
  chooseType(e) {
    this.setData({
      sortType: e.currentTarget.dataset.type
    })
    this.getList()
  },
  // 进入商家详情
  goGoods(e) {
    if (!this.data.userInfo) {
      wx.navigateTo({
        url: '../auth/auth',
      })
    } else if (this.data.bind_mobile === 2) {
      wx.navigateTo({
        url: '../getPhone/getPhone',
      })
    } else {
      wx.navigateTo({
        url: `../goods/goods?store_id=${e.currentTarget.dataset.store_id}`,
      })
    }
  },
  // 获取首页商家
  getList() {
    // 筛选类型 ‘distance’.距离最近 ‘price’: 价格优先 ‘sale’: 销量最高
    wx.request({
      url: app.globalData.baseUrl + `/Store/storeList.html`,
      header: {
        Authorization: app.globalData.auth_code
      },
      data: {
        lat: app.globalData.locationObj.latitude,
        lng: app.globalData.locationObj.longitude,
        type: this.data.sortType
      },
      method: 'POST',
      success: (res) => {
        if (res.data.error_code === 0) {
          this.setData({
            listData: res.data.bizobj.data,
            listDataAll: res.data.bizobj.data
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getList()
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