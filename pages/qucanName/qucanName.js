// pages/qucanName/qucanName.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    phone: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let qucanData = wx.getStorageSync("qucanData")
    console.log(1, qucanData)
    if (qucanData) {
      console.log(3, qucanData)
      this.setData({
        name: qucanData.name,
        phone: qucanData.phone
      })
    }
  },
  // 输入名字
  nameChange(e) {
    this.setData({
      name: e.detail.value
    })
  },
  // 输入电话
  phoneChange(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 保存
  saveForm () {
    if (!this.data.name) {
      wx.showModal({
        showCancel: false,
        title: "提示",
        content: "请输入正确的姓名"
      });
    } else if (!(/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.data.phone))) {
      wx.showModal({
        showCancel: false,
        title: "提示",
        content: "请输入正确的手机号"
      });
    } else {
      let data = {
        name: this.data.name,
        phone: this.data.phone
      }
      wx.setStorageSync("qucanData", data);
      wx.navigateBack()
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