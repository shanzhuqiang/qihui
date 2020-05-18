// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    bind_mobile: "",
    rider_auth: "",
    user_money:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  // 获取余额
  getYuE () {
    wx.request({
      url: app.globalData.baseUrl + `/User/getUserInfo.html`,
      header: {
        Authorization: app.globalData.auth_code
      },
      method: 'POST',
      success: (res) => {
        wx.stopPullDownRefresh()
        if (res.data.error_code === 0) {
          this.setData({
            user_money: res.data.bizobj.data.user_money
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
  // 退出登录
  loginOut () {
    wx.showModal({
      title: '提示',
      content: '确认退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            mask: true,
            title: "加载中..."
          });
          wx.request({
            url: app.globalData.baseUrl + `/Login/loginOut.html`,
            header: {
              Authorization: app.globalData.auth_code
            },
            method: 'POST',
            success: (res) => {
              if (res.data.error_code === 0) {
                app.globalData.bind_mobile = 2
                this.setData({
                  bind_mobile: 2
                })
                wx.showToast({
                  title: "退出成功",
                  mask: true,
                  icon: "success"
                });
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
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 授权/认证手机
  goAuth () {
    if (!this.data.userInfo) {
      wx.navigateTo({
        url: '../auth/auth',
      })
    } else if (this.data.bind_mobile === 2) {
      wx.navigateTo({
        url: '../getPhone/getPhone',
      })
    }
  },
  // 骑手认证
  goRenzheng() {
    if (!this.data.userInfo) {
      wx.navigateTo({
        url: '../auth/auth',
      })
    } else if (this.data.bind_mobile === 2) {
      wx.navigateTo({
        url: '../getPhone/getPhone',
      })
    } else {
      wx.request({
        url: app.globalData.baseUrl + `/User/validRider.html`,
        header: {
          Authorization: app.globalData.auth_code
        },
        method: 'POST',
        success: (res) => {
          if (res.data.error_code === 0) {
            app.globalData.rider_auth = 1
            this.setData({
              rider_auth: 1
            })
            wx.showToast({
              title: "认证成功",
              mask: true,
              icon: "success"
            });
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
      //   url: '../renzheng/renzheng',
      // })
    }
  },
  // 立即充值
  goChongzhi() {
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
        url: '../chongzhi/chongzhi',
      })
    }
  },
  // 余额
  goYue() {
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
        url: '../yue/yue',
      })
    }
  },
  // 添加客服
  goAddKefu() {
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
        url: '../addKefu/addKefu',
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
    this.getYuE()
    this.setData({
      userInfo: app.globalData.userInfo,
      bind_mobile: app.globalData.bind_mobile,
      rider_auth: app.globalData.rider_auth
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
    this.getYuE()
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