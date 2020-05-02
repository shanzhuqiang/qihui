//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bind_mobile: "",
    userInfo: null,
    listData: [],
    bannerData: [],
    sortType: "distance",
    address:'',
    swiperCurrent: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  },
  /**
   * 轮播自动滑动时，获取当前的轮播id
   */
  swiperChange(e) {
    const that = this;
    that.setData({
      swiperCurrent: e.detail.current
    })
  },

  /**
   * 图片手动滑动时，获取当前的轮播id
   */
  imageChange(e) {
    const that = this;
    that.setData({
      swiperCurrent: e.currentTarget.id
    })
  },
  // 获取首页banner
  getBanner () {
    wx.request({
      url: app.globalData.baseUrl + `/Website/banner.html`,
      header: {
        Authorization: app.globalData.auth_code
      },
      method: 'POST',
      success: (res) => {
        if (res.data.error_code === 0) {
          this.setData({
            bannerData: res.data.bizobj.data
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
        wx.stopPullDownRefresh()
        if (res.data.error_code === 0) {
          this.setData({
            listData: res.data.bizobj.data
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
  // 进入搜索
  goSearch() {
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
        url: '../search/search',
      })
    }
  },
  // 进入选择位置
  choosePlace () {
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
        url: '../choosePlace/choosePlace',
      })
    }
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
    if (app.globalData.auth_code) {
      this.init()
    } else {
      app.auth_codeCallBack = res => {
        this.init()
      }
    }
    if (!this.data.userInfo) {
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo
        })
      } else if (app.globalData.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res.userInfo
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo
            })
          }
        })
      }
    }
  },
  init() {
    this.getList()
    this.getBanner()
    if (app.globalData.city) {
      this.setData({
        address: app.globalData.city
      })
    } else {
      this.getAddress()
    }
    this.setData({
      bind_mobile: app.globalData.bind_mobile
    })
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
    this.getList()
    this.getBanner()
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
