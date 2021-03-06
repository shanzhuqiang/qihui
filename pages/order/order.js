// pages/order/order.js
const QRCode = require('../../utils/wxqrcode.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    codeShow: false,
    codeImage: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  // 再来一单
  comeAgain (e) {
    wx.showModal({
      title: '提示',
      content: '确认再来一单吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            mask: true,
            title: "加载中..."
          });
          let order_id = e.currentTarget.dataset.order_id
          let store_id = e.currentTarget.dataset.store_id
          let way = e.currentTarget.dataset.way
          wx.request({
            url: app.globalData.baseUrl + `/Goods/orderAgain.html`,
            header: {
              Authorization: app.globalData.auth_code
            },
            data: {
              order_id: order_id
            },
            method: 'POST',
            success: (res) => {
              wx.hideLoading();
              if (res.data.error_code === 0) {
                wx.navigateTo({
                  url: `../orderConfirm/orderConfirm?store_id=${store_id}&eatType=${way}`
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
  // 订单详情
  goOrderInfo (e) {
    wx.navigateTo({
      url: `../orderInfo/orderInfo?order_id=${e.currentTarget.dataset.id}`,
    })
  },
  // 取消订单
  cancalOrder(e) {
    wx.showModal({
      title: '提示',
      content: '确认取消订单吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            mask: true,
            title: "提交中..."
          });
          let data = {
            order_id: e.currentTarget.dataset.id,
            status: 6
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
                this.getOrder()
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
  // 获取订单列表
  getOrder() {
    wx.request({
      url: app.globalData.baseUrl + `/Order/orderList.html`,
      header: {
        Authorization: app.globalData.auth_code
      },
      method: 'POST',
      success: (res) => {
        wx.stopPullDownRefresh()
        if (res.data.error_code === 0) {
          this.setData({
            orderList: res.data.bizobj.data
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
  // 查看二维码
  showCode (e) {
    let id = e.currentTarget.dataset.id
    let wxSys = wx.getSystemInfoSync()
    let codeWidth = wxSys.screenWidth / 750 * 260
    this.setData({
      codeImage: QRCode.createQrCodeImg(String(id), codeWidth),
      codeShow: true
    })
  },
  // 关闭二维码
  closeCodeShow () {
    this.setData({
      codeShow: false
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
    this.getOrder()
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
    this.getOrder()
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