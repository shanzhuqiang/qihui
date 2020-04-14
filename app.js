//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // 登录接口
        wx.request({
          url: this.globalData.baseUrl + `/Login/login.html`,
          data: {
            code: res.code
          },
          method: 'POST',
          success: (res) => {
            if (res.data.error_code === 0) {
              let data = res.data.bizobj.data
              this.globalData.auth_code = data.auth_code
              this.globalData.bind_mobile = data.bind_mobile
              // 1:绑定mobile 2:未绑定mobile
              this.globalData.rider_auth = data.rider_auth
              // 1: 骑手已认证 2: 未认证骑手
              console.log(res)
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
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log("userinfo", res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    auth_code: "",
    bind_mobile: "",
    rider_auth: "",
    baseUrl: "https://o2o.pinecc.cn/api",
    locationObj: null,
    userInfo: null,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  }
})