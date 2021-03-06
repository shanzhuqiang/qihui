// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    codeNum: 60,
    codeBtn: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 获取输入的手机号码
  bindPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 点击获取验证码
  getCode() {
    if (/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.data.phone)) {
      if (this.data.codeBtn) {
        this.setData({
          codeBtn: false,
          codeNum: 60
        })
        this.getCodeRequest(this.data.phone)
        let timer = setInterval(() => {
          if (this.data.codeNum === 0) {
            clearInterval(timer)
            this.setData({
              codeBtn: true
            })
          } else {
            this.setData({
              codeNum: this.data.codeNum - 1
            })
          }
        }, 1000)
      }
    } else {
      wx.showModal({
        showCancel: false,
        title: "提示",
        content: "请输入正确的手机号"
      });
    }
  },
  // 获取验证码请求
  getCodeRequest(phone) {
    wx.request({
      url: app.globalData.baseUrl + `/Sms/sendProfileSms.html`,
      header: {
        Authorization: app.globalData.auth_code
      },
      data: {
        mobile: phone
      },
      method: 'POST',
      success: (res) => {
        if (res.data.error_code === 0) {
          wx.showToast({
            icon: "none",
            title: "验证码已发送"
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
  // 登录校验
  formLogin(e) {
    let data = e.detail.value;
    if (!(/^1[3|4|5|6|7|8|9]\d{9}$/.test(data.phone))) {
      wx.showModal({
        showCancel: false,
        title: "提示",
        content: "请输入正确的手机号"
      });
    } else if (data.code == "") {
      wx.showModal({
        showCancel: false,
        title: "提示",
        content: "请输入验证码"
      });
    } else {
      wx.showLoading({
        mask: true,
        title: "提交中..."
      });
      this.loginNow(data);
    }
  },
  // 登录
  loginNow(data) {
    wx.request({
      url: app.globalData.baseUrl + `/Login/mobileLogin.html`,
      header: {
        Authorization: app.globalData.auth_code
      },
      data: {
        mobile: data.phone,
        sms_code: data.code
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
                wx.switchTab({
                  url: '../home/home',
                })
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