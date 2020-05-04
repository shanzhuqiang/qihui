// pages/goods/goods.js
const app = getApp()
Page({
  data: {
    store_id: "",
    scrollTop: 0,
    shopInfo: {},
    goods: [],
    toView: 'order0',
    totalPrice: 0,// 总价格
    totalCount: 0, // 总商品数
    carArray: [],
    shopcartListMask: false,
    ruleMask: false,
    curAddFood: null,
    priceList: {},
    ruleChoose: {},
    tabClass: "one",
    gonggaoMask: false,
    eatType: 1,
    menuActive: 0,
    refresherTriggered: false
  },
  onLoad: function (options) {
    this.setData({
      store_id: options.store_id
    })
    this.getShopInfo()
    this.getGoodList()
  },
  // 点击空白，收起购物车,点击有的地方阻止
  blockCloseShopMask () {
    return false
  },
  // 点击空白，收起购物车
  closeShopMask () {
    this.setData({
      shopcartListMask: false,
    })
  },
  // 获取商家详情
  getShopInfo() {
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
        if (res.data.error_code === 0) {
          let data = res.data.bizobj.data
          wx.setNavigationBarTitle({
            title: data.name
          })
          this.setData({
            shopInfo: data
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
  // 获取商品列表
  getGoodList() {
    wx.request({
      url: app.globalData.baseUrl + `/Goods/allGoodsList.html`,
      header: {
        Authorization: app.globalData.auth_code
      },
      data: {
        store_id: this.data.store_id
      },
      method: 'POST',
      success: (res) => {
        if (res.data.error_code === 0) {
          let data = []
          res.data.bizobj.data.forEach(el => {
            if (el.goods_list.length > 0) {
              el.goods_list.forEach(el2 => {
                el2["num"] = 0
              })
              data.push(el)
            }
          })
          this.getCartList(data)
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
  getCartList (data) {
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
          let cartData = res.data.bizobj.data.goodList
          data.forEach(el => {
            el.goods_list.forEach(el2 => {
              cartData.forEach(el3 =>{
                if (el3.goods_id === el2.id) {
                  el2["num"] += el3.num
                }
              })
            })
          })
          this.setData({
            carArray: cartData,
            goods: data
          })
          this.calTotalPrice()
          this.setData({
            refresherTriggered: false
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
  // 修改购物车数量后,获取购物车列表
  editGetCartList () {
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
          let cartData = res.data.bizobj.data.goodList
          this.setData({
            carArray: cartData
          })
          this.calTotalPrice()
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
  // 选择点餐/商家信息
  chooseTabClass(e) {
    this.setData({
      tabClass: e.currentTarget.dataset.id
    })
  },
  // 选择商品规格
  chooseRuleType(e) {
    let ruleId = e.currentTarget.dataset.ruleid;
    let typeId = e.currentTarget.dataset.typeid;
    let curAddFood = this.data.curAddFood
    curAddFood.specItemList.forEach(el => {
      if (el.id === ruleId) {
        el.itemList.forEach(el2 => {
          el2["chooseClass"] = false
          if (el2.id === typeId) {
            el2["chooseClass"] = true
          }
        })
      }
    })
    let priceListArray = []
    let priceListStr = ""
    let des = ""
    curAddFood.specItemList.forEach(el => {
      el.itemList.forEach(el2 => {
        if (el2["chooseClass"]) {
          priceListArray.push(el2.id)
          des += `${el2.name}/`
        }
      })
    })
    priceListArray.sort((a, b) => {
      return a - b
    })
    priceListArray.forEach(el => {
      priceListStr += `${el}_`
    })
    des = des.substr(0, des.length - 1);
    curAddFood["priceListStr"] = priceListStr.substr(0, priceListStr.length - 1);
    curAddFood["des"] = des
    this.setData({
      curAddFood: curAddFood
    })
  },
  // 商品规格选择好了
  chooseRuleOk(e) {
    let curAddFood = this.data.curAddFood
    let data = {
      num: 1,
      good_id: curAddFood.id,
      spec_key: curAddFood.priceListStr
    }
    this.addToCart(data)
  },
  // 打电话
  call () {
    wx.makePhoneCall({
      phoneNumber: this.data.shopInfo.mobile //仅为示例，并非真实的电话号码
    })
  },
  // 一键复制
  copy () {
    wx.setClipboardData({
      data: this.data.shopInfo.address,
      success(res) {
      }
    })
  },
  // 关闭选择规格
  closeRuleMask () {
    this.setData({
      ruleMask: false
    })
    setTimeout(() => {
      this.setData({
        priceList: {},
        curAddFood: null
      })
    }, 1000)
  },
  // 滑动固定tab
  clickScroll(e) {
    console.log(this.data.toView)
    if (this.data.scrollTop !== '340rpx') {
      this.setData({
        scrollTop: "340rpx"
      })
    }
  },
  // 选择菜单
  selectMenu: function (e) {
    let index = e.currentTarget.dataset.itemIndex;
    this.setData({
      toView: 'order' + index.toString(),
      menuActive: index
    })
  },
  //添加到购物车接口
  addToCart(data) {
    wx.showLoading({
      mask: true,
      title: "加载中..."
    });
    wx.request({
      url: app.globalData.baseUrl + `/Goods/addToCart.html`,
      header: {
        Authorization: app.globalData.auth_code
      },
      data: data,
      method: 'POST',
      success: (res) => {
        wx.hideLoading();
        if (res.data.error_code === 0) {
          this.data.goods.forEach(el =>{
            el.goods_list.forEach(el2 => {
              if (el2.id === data.good_id) {
                el2.num += 1
              }
            })
          })
          this.setData({
            goods: this.data.goods
          })
          this.editGetCartList()
          if (this.data.ruleMask) {
            this.closeRuleMask()
          }
          wx.showToast({
            title: "添加成功",
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
  },
  //添加到购物车
  addCart(e) {
    let food = e.currentTarget.dataset.food;
    // 1:有 2:无
    if (food.has_spec === 1) {
      wx.showLoading({
        mask: true,
        title: "加载中..."
      });
      wx.request({
        url: app.globalData.baseUrl + `/Goods/specItemPrice.html`,
        header: {
          Authorization: app.globalData.auth_code
        },
        data: {
          good_id: food.id
          // good_id: 3281
        },
        method: 'POST',
        success: (res) => {
          wx.hideLoading();
          if (res.data.error_code === 0) {
            let specItemList = res.data.bizobj.data.specItemList
            let priceList = {}
            res.data.bizobj.data.priceList.forEach(el =>{
              priceList[el.item_spec] = el.price
            })
            let priceListArray = []
            let des = ""
            specItemList.forEach(el => {
              el.itemList[0]["chooseClass"] = true
              priceListArray.push(el.itemList[0].id)
              des += `${el.itemList[0].name}/`
            })
            priceListArray.sort((a, b) => {
              return a - b
            })
            let priceListStr = ""
            priceListArray.forEach(el => {
              priceListStr += `${el}_`
            })
            des = des.substr(0, des.length - 1);
            food["priceListStr"] = priceListStr.substr(0, priceListStr.length - 1);
            food["specItemList"] = specItemList
            food["des"] = des
            this.setData({
              priceList: priceList,
              curAddFood: food,
              ruleMask: true
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
    } else {
      let data = {
        num: 1,
        good_id: food.id || food.goods_id
      }
      this.addToCart(data)
    }
  },
  //移除商品
  decreaseCart(e) {
    let food = e.currentTarget.dataset.food;
    let shopcart = e.currentTarget.dataset.shopcart;
    if (shopcart == 1) {
      wx.showToast({
        title: '多规格以及带属性商品只能去购物车删除哦',
        icon: 'none',
        duration: 2000
      })
    } else {
      let cart_id
      this.data.carArray.forEach(el => {
        if (el.goods_id === (food.id || food.goods_id)) {
          cart_id = el.cart_id
        }
      })
      let data = {
        cart_id: cart_id,
        num: food.num - 1
      }
      this.editCart(data, food.id || food.goods_id)
    }
  },
  // 修改购物车数量
  editCart(data, foodId) {
    wx.showLoading({
      mask: true,
      title: "加载中..."
    });
    wx.request({
      url: app.globalData.baseUrl + `/Goods/editCart.html`,
      header: {
        Authorization: app.globalData.auth_code
      },
      data: data,
      method: 'POST',
      success: (res) => {
        wx.hideLoading();
        if (res.data.error_code === 0) {
          this.data.goods.forEach(el => {
            el.goods_list.forEach(el2 => {
              if (el2.id === foodId) {
                el2.num -= 1
              }
            })
          })
          this.editGetCartList()
          this.setData({
            goods: this.data.goods
          })
          wx.showToast({
            title: "修改成功",
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
  },
  //计算总价
  calTotalPrice: function () {
    let carArray = this.data.carArray;
    let totalPrice = 0;
    let totalCount = 0;
    for (let i = 0; i < carArray.length; i++) {
      totalPrice += Number(carArray[i].price) * Number(carArray[i].num);
      totalCount += Number(carArray[i].num)
    }
    this.setData({
      totalPrice: totalPrice,
      totalCount: totalCount,
    });
    if (this.data.totalCount == 0) {
      this.setData({
        shopcartListMask: false,
      })
    }
  },
  // 清空购物车
  empty () {
    wx.showModal({
      title: '提示',
      content: '确认清空购物车吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            mask: true,
            title: "加载中..."
          });
          wx.request({
            url: app.globalData.baseUrl + `/Goods/emptyCart.html`,
            header: {
              Authorization: app.globalData.auth_code
            },
            data: {
              store_id: this.data.store_id
            },
            method: 'POST',
            success: (res) => {
              wx.hideLoading();
              if (res.data.error_code === 0) {
                this.data.goods.forEach((el) => {
                  el.goods_list.forEach((el2) => {
                    el2.num = 0
                  })
                })
                this.setData({
                  carArray: [],
                  goods: this.data.goods
                })
                this.toggleList()
                this.calTotalPrice()
                wx.showToast({
                  title: "清空成功",
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
  //結算
  pay() {
    if (this.data.totalCount) {
      wx.navigateTo({
        url: `../orderConfirm/orderConfirm?store_id=${this.data.store_id}&eatType=${this.data.eatType}`,
      })
    }
  },
  // 购物车显示/隐藏
  toggleList: function () {
    if (this.data.totalCount) {
      this.setData({
        shopcartListMask: !this.data.shopcartListMask,
      })
    }
  },
  // 堂食/外带
  eatTypeBtn() {
    if (this.data.eatType === 1) {
      this.setData({
        eatType: 2
      })
    } else if (this.data.eatType === 2) {
      this.setData({
        eatType: 1
      })
    }
  },
  // 营业执照
  goZhizhao () {
    let image_zhizhao = this.data.shopInfo.image_zhizhao
    if (image_zhizhao && image_zhizhao.length > 0) {
      wx.navigateTo({
        url: '../zhizhao/zhizhao?data=' + image_zhizhao.join(","),
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '未上传执照',
      })
    }
  },
  // 打开/关闭公告
  toggGonggaoMask() {
    this.setData({
      gonggaoMask: !this.data.gonggaoMask
    })
  },
  refresh() {
    this.getShopInfo()
    this.getGoodList()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },
  onReady: function () {
      // 页面渲染完成
  },
  onShow: function () {
      // 页面显示
  },
  onHide: function () {
      // 页面隐藏
  },
  onUnload: function () {
      // 页面关闭
  }
})
