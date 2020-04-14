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
          console.log(111, result)
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