// pages/orderConfirm/orderConfirm.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopInfo: {},
    goods: [],
    store_id: "",
    beizhuMaxk: false,
    zhifuMaxk: false,
    timeMaxk: false,
    payType: "wechat",
    arriveTime: 0,
    eatType: "",
    qucanData: null,
    tips: "",
    arriveTimeArrayShow: [],
    arriveTimeArrayToday: [],
    arriveTimeArrayTommorrow: [],
    weekShow: [],
    weekStr: 0,
    arriveShow: '立即到店',
    user_money: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.eatType)
    this.setData({
      store_id: options.store_id,
      eatType: Number(options.eatType)
    })
    this.getShopInfo()
    this.getCartList()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync("qucanData")) {
      this.setData({
        qucanData: wx.getStorageSync("qucanData")
      })
    }
  },
  // 获取商家详情
  getShopInfo() {
    wx.showLoading({
      mask: true,
      title: "加载中..."
    });
    wx.request({
      url: app.globalData.baseUrl + `/Store/storeInfo.html`,
      header: {
        Authorization: app.globalData.auth_code
      },
      data: {
        lat: app.globalData.locationObj.latitude,
        lng: app.globalData.locationObj.longitude,
        store_id: this.data.store_id
      },
      method: 'POST',
      success: (res) => {
        wx.hideLoading();
        if (res.data.error_code === 0) {
          this.setData({
            shopInfo: res.data.bizobj.data
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
  // 获取购物车列表
  getCartList(data) {
    wx.request({
      url: app.globalData.baseUrl + `/Goods/cartList.html`,
      header: {
        Authorization: app.globalData.auth_code
      },
      data: {
        store_id: this.data.store_id
      },
      method: 'POST',
      success: (res) => {
        if (res.data.error_code === 0) {
          this.setData({
            goods: res.data.bizobj.data
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
  // 付款
  pay(order_id) {
    // 微信支付
    console.log(this.data.payType)
    if (this.data.payType === 'wechat') {
      wx.request({
        url: app.globalData.baseUrl + `/Weixinpay/miniPay.html`,
        header: {
          Authorization: app.globalData.auth_code
        },
        data: {
          order_id: order_id
        },
        method: 'POST',
        success: (res) => {
          if (res.data.error_code === 0) {
            let data = res.data.bizobj.data.wxconfig
            wx.requestPayment({
              timeStamp: data.timeStamp,
              nonceStr: data.nonceStr,
              package: data.package,
              signType: 'MD5',
              paySign: data.paySign,
              success: (res) => {
                wx.hideLoading();
                wx.showToast({
                  title: '支付成功',
                  mask: true,
                  icon: 'success',
                  success() {
                    setTimeout(() => {
                      wx.switchTab({
                        url: '../order/order',
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
    } else if (this.data.payType === 'yue') {
      console.log(order_id)
      // 余额支付
      wx.request({
        url: app.globalData.baseUrl + `/Order/payWithMoney.html`,
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
            wx.showToast({
              title: "付款成功",
              mask: true,
              icon: "success",
              success: () => {
                setTimeout(() => {
                  wx.switchTab({
                    url: '../order/order',
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
    }
  },
  // 去支付(下单)
  goToPay() {
    if (!this.data.qucanData) {
      wx.showModal({
        showCancel: false,
        title: "提示",
        content: "请输入取餐人信息"
      });
    } else {
      let data = {
        type: this.data.eatType,
        store_id: this.data.store_id,
        member_name: this.data.qucanData.name,
        mobile: this.data.qucanData.mobile,
        tips: this.data.tips,
      }
      if (this.data.arriveShow === '立即到店') {
        data["way"] = 1
      } else {
        data["way"] = 2
        data["app_time"] = this.data.arriveShow
      }
      wx.showLoading({
        mask: true,
        title: "付款中..."
      });
      wx.request({
        url: app.globalData.baseUrl + `/Order/order.html`,
        header: {
          Authorization: app.globalData.auth_code
        },
        data: data,
        method: 'POST',
        success: (res) => {
          if (res.data.error_code === 0) {
            this.pay(res.data.bizobj.order_id)
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
    }
  },
  // 输入备注
  tipsChange (e) {
    this.setData({
      tips: e.detail.value
    })
  },
  // 选择支付方式
  payTypeChoose (e) {
    this.setData({
      payType: e.currentTarget.dataset.id,
      zhifuMaxk: !this.data.zhifuMaxk
    })
  },
  // 支付方式
  zhifuTigger () {
    if (!this.data.zhifuMaxk) {
      wx.request({
        url: app.globalData.baseUrl + `/User/getUserInfo.html`,
        header: {
          Authorization: app.globalData.auth_code
        },
        method: 'POST',
        success: (res) => {
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
    }
    this.setData({
      zhifuMaxk: !this.data.zhifuMaxk
    })
  },
  // 备注
  beizhuTigger() {
    this.setData({
      beizhuMaxk: !this.data.beizhuMaxk
    })
  },
  // 选择到达时间
  chooseTime(e) {
    console.log()
    let arriveTime = e.currentTarget.dataset.id
    let arriveShow = ""
    if (this.data.weekStr === 0 && arriveTime === 0) {
      arriveShow = '立即到店'
    } else if (this.data.weekStr === 0 && arriveTime !== 0) {
      arriveShow = this.data.weekShow[0] + ' ' + arriveTime
    } else if (this.data.weekStr === 1) {
      arriveShow = this.data.weekShow[1] + ' ' + arriveTime
    }
    this.setData({
      arriveTime: arriveTime,
      timeMaxk: !this.data.timeMaxk,
      arriveShow: arriveShow
    })
  },
  // 选择今天/明天
  chooseDay(e) {
    let weekStr = e.currentTarget.dataset.id
    if (weekStr === 0) {
      this.setData({
        arriveTimeArrayShow: this.data.arriveTimeArrayToday,
        arriveTime: 0,
        arriveShow: '立即到店',
        weekStr: weekStr
      })
    } else if (weekStr === 1) {
      this.setData({
        arriveTimeArrayShow: this.data.arriveTimeArrayTommorrow,
        arriveTime: this.data.arriveTimeArrayTommorrow[0],
        arriveShow: this.data.weekShow[1] + " " + this.data.arriveTimeArrayTommorrow[0],
        weekStr: weekStr
      })
    }
  },
  // 到店时间
  timeTigger() {
    if (!this.data.timeMaxk) {
      let date = new Date()
      let timeArray = [
        "00:00",
        "00:30",
        "01:00",
        "01:30",
        "02:00",
        "02:30",
        "03:00",
        "03:30",
        "04:00",
        "04:30",
        "05:00",
        "05:30",
        "06:00",
        "06:30",
        "07:00",
        "07:30",
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
        "21:30",
        "22:00",
        "22:30",
        "23:00",
        "23:30"
      ]
      let week = ["日", "一", "二", "三", "四", "五", "六"]
      let weekShow = [`今日（周${week[date.getDay()]})`, `明日（周${week[date.getDay() + 1]})`]
      this.setData({
        weekShow: weekShow
      })
      // let nowTime = [date.getHours(), date.getMinutes()]
      let nowTime = ["16", "24"]
      let startTime = this.data.shopInfo.store_time.split(":")
      let endTime = this.data.shopInfo.store_end_time.split(":")
      startTime.pop()
      endTime.pop()
      let realyTime = nowTime
      for (let i = 0; i < 2; i++) {
        if (nowTime[i] > startTime[i]) {
          realyTime = nowTime
          break
        } else if (nowTime[i] < startTime[i]) {
          realyTime = startTime
          break
        }
      }
      let arriveTimeArrayToday = []
      let arriveTimeArrayTommorrow = []
      timeArray.forEach(el => {
        let elArray = el.split(":")
        if (elArray[0] < endTime[0]) {
          if (realyTime[0] < elArray[0]) {
            arriveTimeArrayToday.push(el)
          } else if (realyTime[0] == elArray[0] && realyTime[1] <= elArray[1]) {
            arriveTimeArrayToday.push(el)
          }
        } else if (endTime[0] == elArray[0] && elArray[1] <= endTime[1]) {
          if (realyTime[0] < elArray[0]) {
            arriveTimeArrayToday.push(el)
          } else if (realyTime[0] == elArray[0] && realyTime[1] <= elArray[1]) {
            arriveTimeArrayToday.push(el)
          }
        }
      })
      timeArray.forEach(el => {
        let elArray = el.split(":")
        if (elArray[0] < endTime[0]) {
          if (startTime[0] < elArray[0]) {
            arriveTimeArrayTommorrow.push(el)
          } else if (startTime[0] == elArray[0] && startTime[1] <= elArray[1]) {
            arriveTimeArrayTommorrow.push(el)
          }
        } else if (endTime[0] == elArray[0] && elArray[1] <= endTime[1]) {
          if (startTime[0] < elArray[0]) {
            arriveTimeArrayTommorrow.push(el)
          } else if (startTime[0] == elArray[0] && startTime[1] <= elArray[1]) {
            arriveTimeArrayTommorrow.push(el)
          }
        }
      })
      this.setData({
        arriveTimeArrayTommorrow: arriveTimeArrayTommorrow,
        arriveTimeArrayToday: arriveTimeArrayToday,
        arriveTimeArrayShow: arriveTimeArrayToday
      })
    }
    this.setData({
      timeMaxk: !this.data.timeMaxk
    })
  },
  // 取餐人信息
  goQucanName () {
    wx.navigateTo({
      url: '../qucanName/qucanName',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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