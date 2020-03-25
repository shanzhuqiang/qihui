//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    address:'东海水晶城蓝钻东海水晶城蓝钻',
    bannerImg: ["../../images/banner.png", "../../images/banner.png"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log("onLoad")
  },
  goSearch () {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  goChooseCity () {
    wx.navigateTo({
      url: '../chooseCity/chooseCity',
    })
  },
  goMy () {
    if (this.data.userInfo) {
      wx.navigateTo({
        url: '../my/my',
      })
    } else {
      wx.navigateTo({
        url: '../auth/auth',
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
    console.log("onShow")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide")

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
