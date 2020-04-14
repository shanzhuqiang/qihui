// pages/auth/auth.js
const app = getApp();
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
  // 使用手机号登陆
  goLoginPhone () {
    wx.navigateTo({
      url: '../loginPhone/loginPhone',
    })
  },
  // 获取手机号
  getPhoneNumber(e) {
    if (e.detail.errMsg === "getPhoneNumber:ok") {
      wx.showLoading({
        mask: true,
        title: "登录中..."
      });
      wx.request({
        url: app.globalData.baseUrl + `/Login/getUserMobile.html`,
        header: {
          Authorization: app.globalData.auth_code
        },
        data: {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        },
        method: 'POST',
        success: (res) => {
          if (res.data.error_code === 0) {
            this.login(res.data.bizobj.data)
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
    }
  },
  // 登录
  login(mobile) {
    wx.request({
      url: app.globalData.baseUrl + `/Login/mobileLogin.html`,
      header: {
        Authorization: app.globalData.auth_code
      },
      data: {
        mobile: mobile
      },
      method: 'POST',
      success: (res) => {
        wx.hideLoading();
        if (res.data.error_code === 0) {
          app.globalData.bind_mobile = 1
          wx.showToast({
            title: "登录成功",
            mask: true,
            icon: "success",
            success: () => {
              setTimeout(() => {
                wx.navigateBack()
              }, 1500);
            }
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