// pages/orderInfo/orderInfo.js
const app = getApp()
const QRCode = require('../../utils/wxqrcode.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id: "",
    orderInfo: {},
    codeImage: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order_id: options.order_id
    })
    this.getOrderInfo()
  },
  // 一键复制
  copy() {
    wx.setClipboardData({
      data: this.data.orderInfo.store_info.store_address,
      success(res) {
      }
    })
  },
  // 去掉订单/撤回
  changeStatus (e) {
    let id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: id == 6 ? '确认取消订单吗？' : '确认撤回吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            mask: true,
            title: "提交中..."
          });
          let data = {
            order_id: this.data.order_id,
            status: id
          }
          wx.request({
            url: app.globalData.baseUrl + `/Order/changeOrderStatus.html`,
            header: {
              Authorization: app.globalData.auth_code
            },
            data: data,
            method: 'POST',
            success: (res) => {
              wx.hideLoading();
              if (res.data.error_code === 0) {
                this.getOrderInfo()
                wx.showToast({
                  title: "申请成功",
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
        }
      }
    })
  },
  // 再来一单
  comeAgain() {
    wx.showModal({
      title: '提示',
      content: '确认再来一单吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            mask: true,
            title: "加载中..."
          });
          wx.request({
            url: app.globalData.baseUrl + `/Goods/orderAgain.html`,
            header: {
              Authorization: app.globalData.auth_code
            },
            data: {
              order_id: this.data.order_id
            },
            method: 'POST',
            success: (res) => {
              wx.hideLoading();
              if (res.data.error_code === 0) {
                wx.navigateTo({
                  url: `../orderConfirm/orderConfirm?store_id=${this.data.orderInfo.store_info.store_id}&eatType=${this.data.orderInfo.order_info.way}`
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
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 获取订单详情
  getOrderInfo () {
    wx.request({
      url: app.globalData.baseUrl + `/Order/orderDetail.html`,
      header: {
        Authorization: app.globalData.auth_code
      },
      data: {
        order_id: this.data.order_id
      },
      method: 'POST',
      success: (res) => {
        if (res.data.error_code === 0) {
          let data = res.data.bizobj.data
          let wxSys = wx.getSystemInfoSync()
          let codeWidth = wxSys.screenWidth / 750 * 260
          this.setData({
            orderInfo: data,
            codeImage: QRCode.createQrCodeImg(String(data.order_info.order_id), codeWidth)
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
  // 打电话
  call() {
    wx.makePhoneCall({
      phoneNumber: this.data.orderInfo.store_info.store_phone
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