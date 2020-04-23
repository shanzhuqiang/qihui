// pages/chongzhi/chongzhi.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "",
    chargeList: []
  },
  // 选择金额
  chooseType(e) {
    this.setData({
      type: e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getChargeList()
  },
  // 确认充值
  confirm () {
    wx.showModal({
      title: '提示',
      content: '确认充值吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            mask: true,
            title: "加载中..."
          });
          wx.request({
            url: app.globalData.baseUrl + `/Cash/addCash.html`,
            header: {
              Authorization: app.globalData.auth_code
            },
            data: {
              charge_id: this.data.type
            },
            method: 'POST',
            success: (res) => {
              if (res.data.appId) {
                let data = res.data
                wx.hideLoading();
                wx.requestPayment({
                  timeStamp: data.timeStamp,
                  nonceStr: data.nonceStr,
                  package: data.package,
                  signType: 'MD5',
                  paySign: data.paySign,
                  success: (res) => {
                    wx.showToast({
                      title: '充值成功',
                      mask: true,
                      icon: 'success',
                      success() {
                        setTimeout(() => {
                          wx.switchTab({
                            url: '../my/my',
                          })
                        }, 1500)
                      }
                    })
                  },
                  fail(res) { }
                })
              } else {
                wx.hideLoading();
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
        }
      }
    })
  },
  // 获取充值列表
  getChargeList (){
    wx.request({
      url: app.globalData.baseUrl + `/Cash/chargeList.html`,
      header: {
        Authorization: app.globalData.auth_code
      },
      method: 'POST',
      success: (res) => {
        if (res.data.error_code === 0) {
          let chargeList = res.data.bizobj.charge_list
          this.setData({
            type: chargeList[0].id
          })
          let result = [];
          for (let i = 0; i < chargeList.length; i += 3) {
            result.push(chargeList.slice(i, i + 3));
          }
          this.setData({
            chargeList: result
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